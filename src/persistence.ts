export type SyncStorage={getItem:(name:string)=>string|null;setItem:(name:string,value:string)=>void;removeItem:(name:string)=>void};
export function createDebouncedStorage(base:SyncStorage,delay=500,onError:()=>void=()=>{}){let pending:{name:string;value:string}|null=null;let timer:ReturnType<typeof setTimeout>|undefined;const flush=()=>{if(timer!==undefined){clearTimeout(timer);timer=undefined}if(!pending)return;const write=pending;try{base.setItem(write.name,write.value);pending=null}catch{pending=write;onError()}};const storage:SyncStorage={getItem(name){try{return base.getItem(name)}catch{onError();return null}},setItem(name,value){pending={name,value};if(timer!==undefined)clearTimeout(timer);timer=setTimeout(flush,delay)},removeItem(name){flush();try{base.removeItem(name)}catch{onError()}}};return{storage,flush,hasPending:()=>pending!==null}}
const browserStorage:SyncStorage={getItem:name=>localStorage.getItem(name),setItem:(name,value)=>localStorage.setItem(name,value),removeItem:name=>localStorage.removeItem(name)};
let storageErrorOccurred=false;const notifyStorageError=()=>{storageErrorOccurred=true;if(typeof window!=='undefined')window.dispatchEvent(new Event('sysdesign:storage-error'))};
const adapter=createDebouncedStorage(browserStorage,500,notifyStorageError);
export const debouncedStorage=adapter.storage;
export const flushPendingStorage=adapter.flush;
export const hasStorageError=()=>storageErrorOccurred;
