var RuleSetPrototype = {
  AddDep: function (depends, on) {
    this.dependencies[depends] = this.dependencies[depends] || []
    if (this.dependencies[depends].indexOf(on) === -1 ) {
      this.dependencies[depends].push(on)
    }
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
    var dependenies = this.dependencies[opA]

    if (dependenies === undefined) return false
    if (dependenies.indexOf(opB) !== -1) return true
    if (checked.indexOf(dependenies) !== -1) return false

    checked.push(opA)
    return this._IsADependency(dependenies, opB, checked)
  },

  dependenciesOf: function (option) {
    var dependency = this.dependencies[option]

    if (dependency === undefined) return []

  }
}

function newRuleSet() {
  return Object.assign(Object.create(RuleSetPrototype), {
    dependencies: {},
    conflicts: []
  })
}
module.exports = { new: newRuleSet }
