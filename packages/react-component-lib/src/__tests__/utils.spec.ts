import * as utils from '../utils';

describe('generateUniqueId', () => {
  const uniqueRegexMatch = /^(\w){8}-(\w){4}-(\w){4}-(\w){4}-(\w){12}$/;

  it('should generate a global unique id', () => {
    const first = utils.generateUniqueId();
    const second = utils.generateUniqueId();

    expect(first).toMatch(uniqueRegexMatch);
    expect(second).not.toEqual(first);
    expect(second).toMatch(uniqueRegexMatch);
  });
});

describe('dashToPascalCase', () => {
  it('should cover the base usecase', () => {
    expect(utils.dashToPascalCase('blue')).toMatch('Blue');
    expect(utils.dashToPascalCase('blue-green')).toMatch('BlueGreen');
    expect(utils.dashToPascalCase('blue-green-red')).toMatch('BlueGreenRed');
  });
});
