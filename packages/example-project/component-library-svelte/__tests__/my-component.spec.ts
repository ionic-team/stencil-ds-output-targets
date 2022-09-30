import { render } from '@testing-library/svelte';
import { MyComponent } from '../src';

describe('MyComponent', () => {
  const getWebComponent = (container: HTMLElement) => container.querySelector('my-component') as HTMLMyComponentElement;

  it('should be rendered', async () => {
    const { container } = render(MyComponent as any, {
      first: 'John',
      middle: 'Jane',
      last: 'Doe',
    });

    expect(container.querySelector('my-component[first="John"][middle="Jane"][last="Doe"]')).toBeDefined();
  });

  it('should pass arrays as props', () => {
    const arr = ['john', 'jane'];

    const { container, component } = render(MyComponent as any, {
      kidsNames: arr,
    });

    expect(component.kidsNames).toEqual(arr);
    expect(getWebComponent(container).kidsNames).toEqual(arr);
  });
});
