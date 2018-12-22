const { object, newObject, string, newString, number, newNumber, bool, newBool }  = require('./types/index.js');
const { a, a1, a2 } = require('./a-multiple-exports/index.js');
const { b, bLeft, bRight } = require('./b-multiple-paths/index.js');
const { c } = require('./c-rename/index.js');
const { d, dCircular } = require('./d-circular-dependencies/index.js');

module.exports = {
  a,
  a1,
  a2,
  b,
  bLeft,
  bRight,
  c,
  d,
  dCircular,
  object,
  newObject,
  string,
  newString,
  number,
  newNumber,
  bool,
  newBool,
};
