var RuleSetPrototype = {
  AddDep: function (depends, on) {
    this.dependencies[depends] = on
  },
  AddConflict: function (opA, opB) {
    this.conflicts[opA] = opB
  }
}

function newRuleSet() {
  return Object.assign(Object.create(RuleSetPrototype), {
    dependencies: {},
    conflicts: {}
  })
}
module.exports = { new: newRuleSet }
