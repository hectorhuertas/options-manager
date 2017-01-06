var RuleSetPrototype = {
  AddDep: function (depends, on) {
    this.dependencies[depends] = on
  },

  AddConflict: function (opA, opB) {
    this.conflicts.push({opA: opA, opB: opB})
  },

  IsCoherent: function () {
    return !this.conflicts.some( (conflict) => {
      return this._IsADependency(conflict.opA, conflict.opB, [])
    })
  },

  _IsADependency: function (opA, opB, checked) {
    var dependency = this.dependencies[opA]

    if (dependency === undefined) return false
    if (dependency === opB) return true
    if (checked.indexOf(dependency) !== -1) return false

    checked.push(dependency)
    return this._IsADependency(dependency, opB, checked)
  }
}

function newRuleSet() {
  return Object.assign(Object.create(RuleSetPrototype), {
    dependencies: {},
    conflicts: []
  })
}
module.exports = { new: newRuleSet }
