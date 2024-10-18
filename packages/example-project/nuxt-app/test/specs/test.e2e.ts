import { expect, $, browser } from '@wdio/globals';

describe('Stencil NextJS Integration', () => {
  it('should have hydrated the page', async () => {
    await browser.url('/');
    const input = await $('input[name="my-input-0"]');
    await input.setValue('test');
    await expect($('.inputResult').getText()).toMatchInlineSnapshot(`
      "Input Event: test
      Change Event: test"
    `)
  });
});
