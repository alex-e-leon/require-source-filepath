const { string } = require('./string.js');
const { number } = require('./number.js');
const { bool } = require('./boolean.js');
const { object } = require('./object.js');

module.exports = {
  string,
  number,
  bool,
  object,
  newString: '',
  newNumber: 0,
  newBool: true,
  newObject: {},
};
