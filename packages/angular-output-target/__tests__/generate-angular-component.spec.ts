import { createComponentTypeDefinition, createAngularComponentDefinition } from '../src/generate-angular-component';

describe('createAngularComponentDefinition()', () => {
  describe('www output', () => {
    it('it should generate a component', () => {
      const component = createAngularComponentDefinition('my-component', [], [], [], false);

      expect(component).toEqual(`@ProxyCmp({
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`);
    });

    it('it should generate a component with inputs', () => {
      const component = createAngularComponentDefinition('my-component', ['my-input', 'my-other-input'], [], [], false);
      expect(component).toMatch(`@ProxyCmp({
  inputs: ['my-input', 'my-other-input']
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['my-input', 'my-other-input'],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`);
    });

    it('it should generate a component with outputs', () => {
      const component = createAngularComponentDefinition(
        'my-component',
        [],
        ['my-output', 'my-other-output'],
        [],
        false
      );

      expect(component).toMatch(`@ProxyCmp({
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['my-output', 'my-other-output']);
  }
}`);
    });

    it('it should generate a component with methods', () => {
      const component = createAngularComponentDefinition('my-component', [], [], ['myMethod', 'myOtherMethod'], false);

      expect(component).toMatch(`@ProxyCmp({
  methods: ['myMethod', 'myOtherMethod']
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`);
    });
  });

  describe('custom elements output', () => {
    it('it should generate a component', () => {
      const component = createAngularComponentDefinition('my-component', [], [], [], true);

      expect(component).toEqual(`@ProxyCmp({
  defineCustomElementFn: defineMyComponent
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`);
    });

    it('it should generate a component with inputs', () => {
      const component = createAngularComponentDefinition('my-component', ['my-input', 'my-other-input'], [], [], true);

      expect(component).toEqual(`@ProxyCmp({
  defineCustomElementFn: defineMyComponent,
  inputs: ['my-input', 'my-other-input']
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['my-input', 'my-other-input'],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`);
    });

    it('it should generate a component with outputs', () => {
      const component = createAngularComponentDefinition(
        'my-component',
        [],
        ['my-output', 'my-other-output'],
        [],
        true
      );
      expect(component).toMatch(`@ProxyCmp({
  defineCustomElementFn: defineMyComponent
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['my-output', 'my-other-output']);
  }
}`);
    });

    it('it should generate a component with methods', () => {
      const component = createAngularComponentDefinition('my-component', [], [], ['myMethod', 'myOtherMethod'], true);

      expect(component).toMatch(`@ProxyCmp({
  defineCustomElementFn: defineMyComponent,
  methods: ['myMethod', 'myOtherMethod']
})
@Component({
  selector: 'my-component',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`);
    });
  });
});

describe('createComponentTypeDefinition()', () => {
  let testEvents: any[] = [
    {
      name: 'myEvent',
      complexType: {
        references: {
          MyEvent: {
            location: 'import',
          },
        },
        original: 'MyEvent',
        resolved: 'MyEvent',
      },
      docs: {
        text: 'This is an example event.',
        tags: [
          {
            text: 'Bar',
            name: 'Foo',
          },
        ],
      },
    },
    {
      name: 'myOtherEvent',
      complexType: {
        references: {
          MyOtherEvent: {
            location: 'import',
          },
        },
        original: 'MyOtherEvent',
      },
      docs: {
        text: 'This is the other event.',
        tags: [],
      },
    },
    {
      name: 'myDoclessEvent',
      complexType: {
        references: {
          MyDoclessEvent: {
            location: 'import',
          },
        },
        original: 'MyDoclessEvent',
      },
      docs: {
        text: '',
        tags: [],
      },
    },
  ];

  describe('www build', () => {
    it('should create a type definition', () => {
      const definition = createComponentTypeDefinition('MyComponent', testEvents, '@ionic/core', false);

      expect(definition).toEqual(
        `import type { MyEvent as IMyComponentMyEvent } from '@ionic/core';
import type { MyOtherEvent as IMyComponentMyOtherEvent } from '@ionic/core';
import type { MyDoclessEvent as IMyComponentMyDoclessEvent } from '@ionic/core';

export interface MyComponent extends Components.MyComponent {
  /**
   * This is an example event. @Foo Bar
   */
  myEvent: EventEmitter<CustomEvent<IMyComponentMyEvent>>;
  /**
   * This is the other event.
   */
  myOtherEvent: EventEmitter<CustomEvent<IMyComponentMyOtherEvent>>;

  myDoclessEvent: EventEmitter<CustomEvent<IMyComponentMyDoclessEvent>>;
}`
      );
    });
  });

  describe('custom elements output', () => {
    describe('with a custom elements directory provided', () => {
      it('should create a type definition', () => {
        const definition = createComponentTypeDefinition(
          'MyComponent',
          testEvents,
          '@ionic/core',
          true,
          'custom-elements'
        );

        expect(definition).toEqual(
          `import type { MyEvent as IMyComponentMyEvent } from '@ionic/core/custom-elements';
import type { MyOtherEvent as IMyComponentMyOtherEvent } from '@ionic/core/custom-elements';
import type { MyDoclessEvent as IMyComponentMyDoclessEvent } from '@ionic/core/custom-elements';

export interface MyComponent extends Components.MyComponent {
  /**
   * This is an example event. @Foo Bar
   */
  myEvent: EventEmitter<CustomEvent<IMyComponentMyEvent>>;
  /**
   * This is the other event.
   */
  myOtherEvent: EventEmitter<CustomEvent<IMyComponentMyOtherEvent>>;

  myDoclessEvent: EventEmitter<CustomEvent<IMyComponentMyDoclessEvent>>;
}`
        );
      });
    });

    describe('without a custom elements directory provided', () => {
      it('should create a type definition', () => {
        const definition = createComponentTypeDefinition('MyComponent', testEvents, '@ionic/core', true);

        expect(definition).toEqual(
          `import type { MyEvent as IMyComponentMyEvent } from '@ionic/core/components';
import type { MyOtherEvent as IMyComponentMyOtherEvent } from '@ionic/core/components';
import type { MyDoclessEvent as IMyComponentMyDoclessEvent } from '@ionic/core/components';

export interface MyComponent extends Components.MyComponent {
  /**
   * This is an example event. @Foo Bar
   */
  myEvent: EventEmitter<CustomEvent<IMyComponentMyEvent>>;
  /**
   * This is the other event.
   */
  myOtherEvent: EventEmitter<CustomEvent<IMyComponentMyOtherEvent>>;

  myDoclessEvent: EventEmitter<CustomEvent<IMyComponentMyDoclessEvent>>;
}`
        );
      });
    });
  });
});
