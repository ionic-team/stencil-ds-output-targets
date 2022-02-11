import { mapEventTypes } from "./map-event-types";

describe('mapEventTypes', () => {

  it('should work', () => {
    const outputs: any[] = [
      {
        name: 'myComponentChange',
        complexType: {
          references: {
            'MyComponentChangeEvent': {
              location: 'import'
            }
          }
        }
      }
    ];

    const res = mapEventTypes({
      componentClassName: 'MyComponent',
      includeImportCustomElements: false,
      customElementsDir: undefined,
      componentCorePackage: '@ionic/core'
    }, outputs, {});

    expect(res[0]).toEqual(
      `myComponentChange: EventEmitter<CustomEvent<IMyComponentChangeEvent>>;`
    );
  });

  // https://github.com/ionic-team/stencil-ds-output-targets/issues/212
  it('should escape event names with dashes', () => {
    const outputs: any[] = [
      {
        name: 'my-component-change',
        complexType: {
          references: {
            'MyComponentChangeEvent': {
              location: 'import'
            }
          }
        }
      }
    ];

    const res = mapEventTypes({
      componentClassName: 'MyComponent',
      includeImportCustomElements: false,
      customElementsDir: undefined,
      componentCorePackage: '@ionic/core'
    }, outputs, {});

    expect(res[0]).toEqual(
      `'my-component-change': EventEmitter<CustomEvent<IMyComponentChangeEvent>>;`
    );
  });

  it('should skip output references that are global', () => {
    const outputs: any[] = [
      {
        name: 'my-component-change',
        complexType: {
          references: {
            'MyComponentChangeEvent': {
              location: 'global'
            }
          }
        }
      }
    ];

    const res = mapEventTypes({
      componentClassName: 'MyComponent',
      includeImportCustomElements: false,
      customElementsDir: undefined,
      componentCorePackage: '@ionic/core'
    }, outputs, {});

    expect(res).toEqual([]);
  });

  it('should generate code documentation on the event types', () => {
    const outputs: any[] = [
      {
        name: 'myComponentChange',
        docs: {
          text: 'This is a description of the event',
          tags: []
        },
        complexType: {
          references: {
            'MyComponentChangeEvent': {
              location: 'import'
            }
          }
        }
      }
    ];

    const res = mapEventTypes({
      componentClassName: 'MyComponent',
      includeImportCustomElements: false,
      customElementsDir: undefined,
      componentCorePackage: '@ionic/core'
    }, outputs, {});

    expect(res[0]).toEqual(
      `/**
      * This is a description of the event
      */
myComponentChange: EventEmitter<CustomEvent<IMyComponentChangeEvent>>;`
    );
  });

  it('should generate code documentation with tags', () => {
    const outputs: any[] = [
      {
        name: 'myComponentChange',
        docs: {
          text: 'This is a description of the event',
          tags: [{
            name: 'test',
            text: 'This is a tag'
          }]
        },
        complexType: {
          references: {
            'MyComponentChangeEvent': {
              location: 'import'
            }
          }
        }
      }
    ];

    const res = mapEventTypes({
      componentClassName: 'MyComponent',
      includeImportCustomElements: false,
      customElementsDir: undefined,
      componentCorePackage: '@ionic/core'
    }, outputs, {});

    expect(res[0]).toEqual(
      `/**
      * This is a description of the event @test This is a tag
      */
myComponentChange: EventEmitter<CustomEvent<IMyComponentChangeEvent>>;`
    );

  });

});
