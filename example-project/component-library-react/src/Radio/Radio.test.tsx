import { expect, $ } from '@wdio/globals';
import { render } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Radio from './Radio';

describe('Radio', () => {
  it('should define the web component', async () => {
    const { container } = render(<Radio />);

    const radio = container.querySelector('my-radio')!;

    await expect(radio.shadowRoot).toBeDefined();
  });

  it('should reflect aria-disabled state', async () => {
    render(<Radio />);

    await expect($('my-radio')).toHaveAttr('aria-disabled', 'true');
  });

  it('should reflect disabled css class', async () => {
    render(<Radio />);

    await expect($('my-radio')).toHaveElementClass('radio-disabled');
  });
});
