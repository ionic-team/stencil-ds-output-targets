import { createComponentDecorator } from './create-component-decorator';

describe('createComponentDecorator', () => {

  it('should work', () => {
    const res = createComponentDecorator({
      selector: 'my-component',
      template: '<ng-content></ng-content>',
      changeDetection: 'ChangeDetectionStrategy.OnPush',
      inputs: ['color', 'type'],
    });

    expect(res).toEqual(
      `@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'type']
})`
    );
  });

  it('should generate without inputs when inputs are empty', () => {
    const res = createComponentDecorator({
      selector: 'my-component',
      template: '<ng-content></ng-content>',
      changeDetection: 'ChangeDetectionStrategy.OnPush',
      inputs: [],
    });

    expect(res).toEqual(
      `@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})`
    );
  });

});
