import { transformOptions } from './transformOptions';

describe('transformOptions', () => {
  test('[]', () => {
    expect(transformOptions([])).toEqual([]);
  });
  test('with data-1', () => {
    expect(transformOptions(['aaa', 'aAa', 'bbb'])).toEqual(['AAA', 'AAA', 'BBB']);
  });
  test('with data-2', () => {
    expect(transformOptions(['aaa', 'aAa', ''])).toEqual(['AAA', 'AAA']);
  });
  test('with data-3', () => {
    expect(transformOptions(['', '', ''])).toEqual([]);
  });
  // нет смысла тестировать что то не валидное ибо ts спасает.  
  // test('with data-3', () => {
  //   expect(
  //     transformOptions([
  //       undefined,
  //       1,
  //       function () {
  //         () => console.log();
  //       }
  //     ])
  //   ).toEqual(['AAA', 'AAA']);
  // });
});
