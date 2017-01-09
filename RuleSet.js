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

  AddConflict: function (el1, el2) {
    this.conflicts[el1] = this.conflicts[el1] || []
    this.conflicts[el2] = this.conflicts[el2] || []
    if (this.conflicts[el1].indexOf(el2) === -1 ) {
      this.conflicts[el1].push(el2)
    }
    if (this.conflicts[el2].indexOf(el1) === -1 ) {
      this.conflicts[el2].push(el1)
    }
    // this.conflicts.push({opA: opA, opB: opB})
    // this.conflicts.push({opA: opB, opB: opA})
  },

  IsCoherent: function () {
    var conflicts = Object.keys(this.conflicts)
    return !conflicts.some( (el1) => {
      var currentConflicts = this.conflictsOf(el1)
      return currentConflicts.some( (el2) => {
        return this._IsADependency(el1, el2)
      })
    })
  },

  _IsADependency: function (opA, opB, checked = []) {
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
  },
  conflictsOf(key) {
    return this.conflicts[key] || []
  }
}

function newRuleSet() {
  return Object.assign(Object.create(RuleSetPrototype), {
    dependencies: {},
    depending: {},
    conflicts: {}
  })
}
module.exports = { new: newRuleSet }
