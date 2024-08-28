/// <reference types="@wdio/mocha-framework" />
import { expect, $, browser } from '@wdio/globals';

describe('Stencil NextJS Integration', () => {
  before(() => browser.url('/'));

  it('should have hydrated the page', async () => {
    expect(await browser.getPageSource()).toContain(
      "<my-input class=\"sc-my-input-h sc-my-input-s\"><input class=\"native-input sc-my-input\" aria-labelledby=\"my-input-1-lbl\" autocapitalize=\"off\" autocomplete=\"off\" autocorrect=\"off\" name=\"my-input-1\" placeholder=\"\" type=\"text\"></my-input><div class=\"inputResult\"><p>Input Event: </p><p>Change Event: </p></div><hr><my-button class=\"button button-solid my-activatable my-focusable\">Click me</my-button>"
    )
  });

  it('should allow to interact with input element', async () => {
    await $('my-input').$('input').setValue('Hello World');
    await expect($('.inputResult')).toHaveText('Input Event: Hello World\nChange Event: Hello World');
  });

  it('should allow to interact with button element', async () => {
    await $('my-button').click();
    await $('my-button').click();
    await expect($('.buttonResult')).toHaveText('Input Event: 2');
  });
});
