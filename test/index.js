const test = require('ava');
const requireSourcepath = require('../index.js');

const { object, newObject, string, newString, number, newNumber, bool, newBool }  = require('./fixtures/types/index.js');
const { a, a1, a2 } = require('./fixtures/a-multiple-exports/index.js');
const { b, bLeft, bRight } = require('./fixtures/b-multiple-paths/index.js');
const { c } = require('./fixtures/c-rename/index.js');
const { d, dCircular } = require('./fixtures/d-circular-dependencies/index.js');

// test('correctly compares object definitions', t => {
  // const types = requireSourcepath([
    // object,
    // newObject,
  // ]);

  // t.deepEqual(types, [
    // '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/object.js',
    // '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/index.js',
  // ]);
// });

// test('correctly compares boolean definitions', t => {
  // const types = requireSourcepath([
    // bool,
    // newBool,
  // ]);

  // t.deepEqual(types, [
    // '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/boolean.js',
    // '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/index.js',
  // ]);
// });

// test('correctly compares number definitions', t => {
  // const types = requireSourcepath([
    // number,
    // newNumber,
  // ]);

  // t.deepEqual(types, [
    // '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/number.js',
    // '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/index.js',
  // ]);
// });

test('correctly compares string definitions', t => {
  const types = requireSourcepath([
    string,
    newString
  ]);

  t.deepEqual(types, [
    '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/string.js',
    '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/index.js',
  ]);
});

// test('bar', async t => {
  // const bar = Promise.resolve('bar');
  // t.is(await bar, 'bar');
// });

// module.exports = {
  // a,
  // a1,
  // a2,
  // b,
  // bLeft,
  // bRight,
  // c,
  // d,
  // dCircular,
  // object,
  // newObject,
  // string,
  // newString,
  // number,
  // newNumber,
  // bool,
  // newBool,
// };
