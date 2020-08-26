import { render } from '@testing-library/svelte';
import { MyCheckbox } from '../src';

describe('MyCheckbox', () => {
  it('should update binding when myChange event is fired', () => {
    const { container, component } = render(MyCheckbox as any);
    const myCheckboxEl = container.querySelector('my-checkbox');
    myCheckboxEl.dispatchEvent(new CustomEvent('myChange', { detail: true }));
    expect(component.checked).toEqual(true);
  });
});
