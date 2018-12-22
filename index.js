// require('@babel/register');
// require('ignore-styles');

// Search through module.children recursively + reference check function/object definitions
const mapImports = entry => {
  const exportPaths = {};
  const exportValues = {};
  const checkedModules = [];
  let entryModulePoint;

  require(entry);

  // get the module we just required out of the module object
  module.children.forEach(child => {
    if (child.filename === require.resolve(entry)) {
      entryModulePoint = child;
    }
  });

  // get all exported values from the required module and setup variables
  Object.entries(entryModulePoint.exports).forEach(([key, value]) => {
    exportValues[key] = value;
    exportPaths[key] = entryModulePoint.filename;
  });

  const checkModuleChildren = module => {
    // early exit if we have already checked this module - avoid's hanging on circular dependencies
    if (checkedModules.find(checkedModule => checkedModule === module.filename) !== undefined) {
      return;
    }

    checkedModules.push(module.filename);

    Object.entries(module.exports).forEach(([key, value]) => {
      // if one of the exports matches the original module exports, update the path
      // since this is a recursive breadth first search the last time we find the export should be the original
      // definition
      const match = Object.entries(exportValues).find(([, exportValue]) => exportValue === value);
      if (match !== undefined) {
        exportPaths[match[0]] = module.filename;
      }
    });

    // recursively check module children
    module.children.forEach(child => {
      checkModuleChildren(child);
    });

    // pop the path from the stack
    checkedModules.pop();
  };

  entryModulePoint.children.forEach(child => {
    checkModuleChildren(child);
  });

  return exportPaths;
};

const importPaths = mapImports('./test/index.js');

console.log(importPaths);
