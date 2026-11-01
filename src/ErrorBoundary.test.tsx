import {describe,it,expect} from 'vitest';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary',()=>{
  it('derives a recoverable error state with the error message',()=>{
    expect(ErrorBoundary.getDerivedStateFromError(new Error('render failed'))).toEqual({
      hasError:true,
      message:'render failed'
    });
  });

  it('renders an accessible fallback with a reload action',()=>{
    const boundary=new ErrorBoundary({children:null});
    boundary.state=ErrorBoundary.getDerivedStateFromError(new Error('render failed'));
    const fallback=boundary.render() as any;
    const children=fallback.props.children.props.children;
    expect(fallback.props.role).toBe('alert');
    expect(children[1].props.children).toBe('The editor encountered an error');
    expect(children[2].props.children).toBe('render failed');
    expect(children[3].props.children).toBe('Reload editor');
  });
});
