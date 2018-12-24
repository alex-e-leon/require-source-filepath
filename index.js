// require('@babel/register');
// require('ignore-styles');

const getSourcePath = imports => {
  const checkedModules = [];
  const entry = module.parent;
  const exportPaths = Array(imports.length).fill(entry.filename);

  // Uses backtracking DFS to traverse dependency tree (an acyclic directional graph)
  const checkModuleChildren = module => {
    // early exit if we have already checked this module - avoid's hanging on circular dependencies
    if (checkedModules.find(checkedModule => checkedModule === module.filename) !== undefined) {
      return;
    }

    checkedModules.push(module.filename);

    imports.forEach((importValue, index) => {
      // if one of the exports matches the original module exports, update the path
      // since this is a recursive breadth first search the last time we find the export should be the original
      // definition
      const match = Object.entries(module.exports).findIndex(([key, value]) => importValue === value);
      // if (module.filename === '/Users/alex.leon/programming/oss/require-sourcepath/test/fixtures/types/index.js') {
        // console.log(index, module.filename, Object.entries(module.exports).find(([key, value]) => importValue === value), match );
      // }
      if (match !== -1) {
        exportPaths[index] = module.filename;
      }
    });

    // recursively check module children
    module.children.forEach(child => {
      checkModuleChildren(child);
    });

    // pop the path from the stack to continue backtracking
    checkedModules.pop();
  };

  entry.children.forEach(child => {
    checkModuleChildren(child);
  });

  return exportPaths;
};

module.exports = getSourcePath;
