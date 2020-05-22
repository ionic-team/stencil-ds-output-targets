import React from 'react';
import { render } from '@testing-library/react';
import { MyComponent } from '../src';
import '@testing-library/jest-dom';

describe('MyComponent', () => {
  it('should be rendered by React', () => {
    const { container } = render(<MyComponent />);
    const component = container.getElementsByTagName('my-component')[0];
    expect(component).toBeInTheDocument();
  });

  it('should get strings as props', () => {
    const { container } = render(<MyComponent first="blue" />);
    const component = container.getElementsByTagName('my-component')[0];
    expect(component.first).toEqual('blue');
  });
});
