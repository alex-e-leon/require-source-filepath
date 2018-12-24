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

    let foundMatch = false;

    imports.forEach((importValue, index) => {
      // if one of the exports matches the original module exports, update the path
      // since this is a recursive breadth first search the last time we find the export should be the original
      // definition
      const match = Object.entries(module.exports).findIndex(([key, value]) => importValue === value);
      if (match !== -1) {
        exportPaths[index] = module.filename;
        foundMatch = true;
      }
    });

    // prune the search if any modules don't include any of the exports we are looking for
    // or recursively check module children if there was at least one match
    if (foundMatch) {
      module.children.forEach(child => {
        checkModuleChildren(child);
      });
    }

    // pop the path from the stack to continue backtracking
    checkedModules.pop();
  };

  entry.children.forEach(child => {
    checkModuleChildren(child);
  });

  return exportPaths;
};

module.exports = getSourcePath;
