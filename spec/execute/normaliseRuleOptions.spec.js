'use strict';

const execute = require('../../lib/execute');
const assert = require('assert');

describe('normaliseRuleOptions', () => {
  it('should convert number to object', () => {
    assert.deepStrictEqual(execute.normaliseRuleOptions(2), {mode: 2});
  });

  it('should convert array to object', () => {
    assert.deepStrictEqual(
      execute.normaliseRuleOptions([2, 'strict', {enforce: 'always'}]),
      { mode: 2, strict: true, enforce: 'always'}
    );
  });
});
