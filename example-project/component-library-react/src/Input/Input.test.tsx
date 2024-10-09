import { expect, $ } from '@wdio/globals';
import { render, screen } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Input from './Input';

describe('Input', () => {
  it('should define the web component', async () => {
    const { container } = render(<Input />);

    const input = container.querySelector('my-input')!;

    await expect(input.shadowRoot).toBeDefined();
  });

  it('should handle the myInput event', async () => {
    render(<Input />);

    const inputEvent = screen.getByText(/Input Event:/i);

    await $('my-input').click();
    await browser.keys('hello world');

    await expect(inputEvent).toHaveText('Input Event: hello world');
  });
});
