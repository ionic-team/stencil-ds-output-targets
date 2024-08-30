/// <reference types="@wdio/mocha-framework" />
/// <reference types="webdriverio" />
import { expect, $, browser } from '@wdio/globals';

describe('Stencil NextJS Integration', () => {
  before(() => browser.url('/'));

  /**
   * ToDo(Christian): enhance the test by fetching the body response instead of the page source
   *                  which doesn't contain the template contents. This feature is currently not
   *                  available in WebDriver.
   */
  it('should have hydrated the page', async () => {
    const source = await browser.getPageSource();
    // serializes component children
    expect(source).toContain('<input name="myRadioGroup" type="radio" value="one">');
    expect(source).toContain('<input name="myRadioGroup" type="radio" value="two">');
    expect(source).toContain('<input name="myRadioGroup" type="radio" value="three">');
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

  it('should transform react properties into html attributes', async () => {
    await expect($('my-component.my-8')).toBePresent();
  });

  it('should transform camelCase into kebab-case', async () => {
    await expect($('my-component[favorite-kid-name="foobar"]')).toBePresent();
  });
});
