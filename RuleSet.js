var RuleSetPrototype = {
  AddDep: function (depends, on) {
    this.dependencies[depends] = this.dependencies[depends] || []
    if (this.dependencies[depends].indexOf(on) === -1 ) {
      this.dependencies[depends].push(on)
    }
    this.depending[on] = this.depending[on] || []
    if (this.depending[on].indexOf(depends) === -1 ) {
      this.depending[on].push(depends)
    }
  },

  AddConflict: function (opA, opB) {

    this.conflicts.push({opA: opA, opB: opB})
    this.conflicts.push({opA: opB, opB: opA})
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
  dependenciesOf(key) {
    return this.dependencies[key] || []
  },
  dependingOn(key) {
    return this.depending[key] || []
  }
}

function newRuleSet() {
  return Object.assign(Object.create(RuleSetPrototype), {
    dependencies: {},
    depending: {},
    conflicts: []
  })
}
module.exports = { new: newRuleSet }
