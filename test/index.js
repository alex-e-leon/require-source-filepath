const test = require('ava');
const requireSourcepath = require('../index.js');
const path = require('path');

const { object, newObject, string, newString, number, newNumber, bool, newBool }  = require('./fixtures/types/index.js');
const { a, a1, a2 } = require('./fixtures/a-multiple-exports/index.js');
const { b, bLeft, bRight } = require('./fixtures/b-multiple-paths/index.js');
const { c } = require('./fixtures/c-rename/index.js');
const { d, dCircular } = require('./fixtures/d-circular-dependencies/index.js');

test('correctly compares object definitions', t => {
  const filepaths = requireSourcepath([
    object,
    newObject,
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/types/object.js'),
    path.join(__dirname, 'fixtures/types/index.js'),
  ]);
});

test('correctly compares boolean definitions', t => {
  const filepaths = requireSourcepath([
    bool,
    newBool,
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/types/boolean.js'),
    path.join(__dirname, 'fixtures/types/boolean.js'),
  ]);
});

test('correctly compares number definitions', t => {
  const filepaths = requireSourcepath([
    number,
    newNumber,
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/types/number.js'),
    path.join(__dirname, 'fixtures/types/number.js'),
  ]);
});

test('correctly compares string definitions', t => {
  const filepaths = requireSourcepath([
    string,
    newString
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/types/string.js'),
    path.join(__dirname, 'fixtures/types/string.js'),
  ]);
});

test('correctly handles normal exports trees', t => {
  const filepaths = requireSourcepath([
    a,
    a1,
    a2,
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/a-multiple-exports/a.js'),
    path.join(__dirname, 'fixtures/a-multiple-exports/a1.js'),
    path.join(__dirname, 'fixtures/a-multiple-exports/index.js'),
  ]);
});

test('correctly handles dependencies with multiple paths that include the same base export', t => {
  const filepaths = requireSourcepath([
    b,
    bLeft,
    bRight,
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/b-multiple-paths/b.js'),
    path.join(__dirname, 'fixtures/b-multiple-paths/long-path-left2.js'),
    path.join(__dirname, 'fixtures/b-multiple-paths/long-path-right2.js'),
  ]);
});

test('correctly handles renaming dependencies', t => {
  const filepaths = requireSourcepath([
    c,
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/c-rename/c.js'),
  ]);
});

test('correctly handles circular dependencies', t => {
  const filepaths = requireSourcepath([
    d,
    dCircular,
  ]);

  t.deepEqual(filepaths, [
    path.join(__dirname, 'fixtures/d-circular-dependencies/d.js'),
    path.join(__dirname, 'fixtures/d-circular-dependencies/circular.js'),
  ]);
});
