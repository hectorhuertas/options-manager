var RuleSetPrototype = {
  AddDep: function (depends, on) {
    this.dependencies[depends] = on
  },
  AddConflict: function (opA, opB) {
    this.conflicts.push({opA: opA, opB: opB})
  },
  IsCoherent: function () {
    return !this.conflicts.some( (conflict) => {
      console.log('conflict:',conflict);
      return this.IsADependency(conflict.opA, conflict.opB)
    })
  },
  IsADependency: function (opA, opB) {
    console.log('\n');
    console.log('checking', opA, 'and', opB);
    var dependency = this.dependencies[opA]
    console.log(opA, 'dependency is ',dependency);
    if (dependency === undefined) return false
    if (dependency === opB) return true
    return this.IsADependency(dependency, opB)
  }
}

function newRuleSet() {
  return Object.assign(Object.create(RuleSetPrototype), {
    dependencies: {},
    conflicts: []
  })
}
module.exports = { new: newRuleSet }
