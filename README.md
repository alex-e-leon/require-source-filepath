# require-source-filepath [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status]

Finds the absolute filepath to the original sourcecode that defines a value in node.

## Usage

```js
$ npm install require-source-filepath 

const findSourcepath = require('require-source-filepath');
const { value1, value2 } = require('./values');
const { value3 } = require('values');
const value4 = {};

const paths = findSourcepath([value1, value2, value3, value4]);

// paths = [
//   'path/to/original/sourcefile/of/value1',
//   'path/to/original/sourcefile/of/value2',
//   'path/to/original/sourcefile/of/value3',
//   'path/to/this/file',
// ]
```

## How it works

`require-source-filepath` traverses node's global [module](https://nodejs.org/api/modules.html#modules_the_module_object)
variable recursively comparing exports from each export against the arguments. When it finds the deepest leaf node it
returns the path of that file. It handles circular dependencies by traversing with a backtracking DFS.

## Value types and Reference types 

Due to its implementation and the data-structure of `module `,
`require-source-filepath` may not always return the correct source file for any value types
(number, string, bool etc.) and is not reccomended for their use.

If more than 2 files in the dependency tree export the same value type,
`require-source-filepath` will return whichever file comes last in the dependency
tree, regardless of whether it was the actual imported value or not.

`require-source-filepath` always returns the correct source file for all reference types (array's, function's, objects, classes, etc)


<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/alex-e-leon/require-source-filepath.svg

[build-status]: https://travis-ci.org/alex-e-leon/require-source-filepath

[coverage-badge]: https://img.shields.io/codecov/c/github/alex-e-leon/require-source-filepath.svg

[coverage-status]: https://codecov.io/github/alex-e-leon/require-source-filepath
