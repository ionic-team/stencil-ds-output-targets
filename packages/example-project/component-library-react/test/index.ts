import React from 'react';
import * as components from '../src';

describe('Label', () => {
  test('renders', () => {
    const json = renderJSON(<Label />);
    expect(json).toMatchSnapshot();
  });
  test('passes ref', () => {
    const ref = React.createRef(null);
    render(<Label ref={ref} />);
    expect(ref.current.tagName).toBe('LABEL');
  });
});
