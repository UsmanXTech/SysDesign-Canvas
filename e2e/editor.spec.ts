import {test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
});

const addComponent=async(page:any,label:string)=>{
  await page.locator('.component').filter({hasText:label}).click();
  await expect(page.locator('.react-flow__node').filter({hasText:label})).toHaveCount(1);
};

test('adds a component and restores it after refresh',async({page})=>{
  await addComponent(page,'Web Client');
  await page.waitForTimeout(650);
  await page.reload();
  await expect(page.locator('.react-flow__node').filter({hasText:'Web Client'})).toHaveCount(1);
});

test('undo removes a newly added component',async({page})=>{
  await addComponent(page,'Web Client');
  await page.keyboard.press('Control+z');
  await expect(page.locator('.react-flow__node')).toHaveCount(0);
});

test('duplicates a selected component with the keyboard',async({page})=>{
  await addComponent(page,'Web Client');
  await page.keyboard.press('Control+c');
  await page.keyboard.press('Control+v');
  await expect(page.locator('.react-flow__node').filter({hasText:'Web Client'})).toHaveCount(2);
});

test('connects two components using their React Flow handles',async({page})=>{
  await addComponent(page,'Web Client');
  await addComponent(page,'Load Balancer');
  await page.evaluate(async()=>{
    const {useStore}=await import('/src/store.ts');
    const state=useStore.getState();
    useStore.setState({nodes:state.nodes.map((node,index)=>({...node,position:{x:index===0?100:520,y:180}}))});
  });
  const source=page.locator('.react-flow__node').filter({hasText:'Web Client'}).locator('.react-flow__handle-right');
  const target=page.locator('.react-flow__node').filter({hasText:'Load Balancer'}).locator('.react-flow__handle-left');
  const from=await source.boundingBox();
  const to=await target.boundingBox();
  expect(from).not.toBeNull();
  expect(to).not.toBeNull();
  await page.mouse.move(from!.x+from!.width/2,from!.y+from!.height/2);
  await page.mouse.down();
  await page.mouse.move(to!.x+to!.width/2,to!.y+to!.height/2,{steps:12});
  await page.mouse.up();
  await expect(page.locator('.react-flow__edge')).toHaveCount(1);
});

test('exports PNG and SVG from the browser',async({page})=>{
  await addComponent(page,'Web Client');
  await page.locator('.export-wrap > button').click();
  const pngPromise=page.waitForEvent('download');
  await page.locator('.export-menu button').filter({hasText:'PNG'}).click();
  const png=await pngPromise;
  expect(png.suggestedFilename()).toMatch(/\\.png$/i);

  await page.locator('.export-wrap > button').click();
  const svgPromise=page.waitForEvent('download');
  await page.locator('.export-menu button').filter({hasText:'SVG'}).click();
  const svg=await svgPromise;
  expect(svg.suggestedFilename()).toMatch(/\\.svg$/i);
});

test('switches to read-only mode on a narrow viewport',async({page})=>{
  await page.setViewportSize({width:800,height:700});
  await expect(page.locator('.read-only-banner')).toBeVisible();
  await expect(page.locator('.palette')).toBeHidden();
  await expect(page.locator('.inspector')).toBeHidden();
});
