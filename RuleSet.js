var RuleSetPrototype = {
  AddDep(depends, on) {
    return this
      ._addToCollection(on, 'dependencies', depends)
      ._addToCollection(depends, 'depending', on)
  },

  AddConflict(el1, el2) {
    return this
      ._addToCollection(el1, 'conflicts', el2)
      ._addToCollection(el2, 'conflicts', el1)
  },

  IsCoherent() {
    var conflicts = Object.keys(this.conflicts)
    return !conflicts.some( (el1) => {
      var currentConflicts = this.conflictsOf(el1)
      return currentConflicts.some( (el2) => {
        return this._IsADependency(el1, el2)
      })
    })
  },

  _addToCollection(element, collection, key) {
    this[collection][key] = this[collection][key] || []
    if (this[collection][key].indexOf(element) === -1 ) {
      this[collection][key].push(element)
    }
    return this
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
