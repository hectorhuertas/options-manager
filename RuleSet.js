var RuleSetPrototype = {
  AddDep: function (depends, on) {
    this.dependencies[depends] = on
  }
}

function newRuleSet() {
  return Object.assign(Object.create(RuleSetPrototype), {
    dependencies: {},
    conflicts: {}
  })
}
module.exports = { new: newRuleSet }
