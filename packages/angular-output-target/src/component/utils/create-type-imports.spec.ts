import { createTypeImports } from './create-type-imports';

describe('createTypeImports', () => {

  it('should work', () => {
    const res = createTypeImports({
      '@ionic/core': [
        'CheckboxChangeEventDetail as IonCheckboxChangeEventDetail',
        'CheckboxClickEventDetail as IonCheckboxClickEventDetail',
      ],
    });
    expect(res).toBe(
      `import type {
  CheckboxChangeEventDetail as IonCheckboxChangeEventDetail,
  CheckboxClickEventDetail as IonCheckboxClickEventDetail
} from '@ionic/core';`
    );
  });

  it('should sort imports alphabetically', () => {
    const res = createTypeImports({
      '@ionic/core': [
        'CheckboxFocusEventDetail as IonCheckboxFocusEventDetail',
        'CheckboxChangeEventDetail as IonCheckboxChangeEventDetail',
        'CheckboxClickEventDetail as IonCheckboxClickEventDetail',
      ],
    });
    expect(res).toBe(
      `import type {
  CheckboxChangeEventDetail as IonCheckboxChangeEventDetail,
  CheckboxClickEventDetail as IonCheckboxClickEventDetail,
  CheckboxFocusEventDetail as IonCheckboxFocusEventDetail
} from '@ionic/core';`
    );
  });

});
