import { createProxyCmpDecorator } from './create-proxy-cmp-decorator';

describe('createProxyCmpDecorator', () => {

  it('should work', () => {
    const res = createProxyCmpDecorator({
      inputs: ['color', 'type']
    }, { includeImportCustomElements: false });

    expect(res).toBe(
      `@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['color', 'type'],
})`
    );
  });

  it('should generate inputs from supplied inputs', () => {
    const res = createProxyCmpDecorator({
      inputs: ['color', 'type']
    }, { includeImportCustomElements: false });

    expect(res).toMatch(/inputs: \['color', 'type'],/g);
  });

  it('should generate inputs with []', () => {
    const res = createProxyCmpDecorator({
      inputs: []
    }, { includeImportCustomElements: false });

    expect(res).toMatch(/inputs: \[],/g);
  });

  describe('when includeImportCustomElements is `true`', () => {

    it('should generate with defineCustomElements', () => {
      const res = createProxyCmpDecorator({
        inputs: []
      }, {
        includeImportCustomElements: true,
        tagNamePascalCase: 'MyComponent'
      });
      expect(res).toBe(
        `@ProxyCmp({
  defineCustomElementFn: defineMyComponent,
  inputs: [],
})`
      );
    });

    it('should throw an error when tagNamePascalCase is unset', () => {
      expect(() => createProxyCmpDecorator({
        inputs: []
      }, {
        includeImportCustomElements: true
      })).toThrow(new Error('tagNamePascalCase is required when includeImportCustomElements is true'));
    });

  });

});
