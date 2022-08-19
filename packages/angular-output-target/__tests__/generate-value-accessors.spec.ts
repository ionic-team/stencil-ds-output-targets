import { createValueAccessor, ValueAccessor } from '../src/generate-value-accessors';
import { EOL } from 'os';
import path from 'path';
import fs from 'fs';

describe('createValueAccessor', () => {
  it('should create a valid {type}-value-accessor.ts file when multiple value accessors of the same type are in the config', () => {
    const valueAccessor: ValueAccessor = {
      elementSelectors: ['my-input[type=text]', 'my-input[type=email]'],
      eventTargets: [
        ['myChange', 'value'],
        ['myEmailChange', 'value'],
      ],
    };

    const srcFilePath = path.join(__dirname, '../resources/control-value-accessors/text-value-accessor.ts');
    const srcFile = fs.readFileSync(srcFilePath, { encoding: 'utf-8' });
    const finalText = createValueAccessor(srcFile, valueAccessor);
    const exptectedOutput = `import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'my-input[type=text], my-input[type=email]',
  host: {
    '(myChange)': 'handleChangeEvent($event.target.value)',
    '(myEmailChange)': 'handleChangeEvent($event.target.value)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextValueAccessor,
      multi: true
    }
  ]
})
export class TextValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }
}`;
    expect(finalText.trim()).toEqual(exptectedOutput.trim().replace(/\n/g, EOL));
  });
});
