var RuleSet = require('./RuleSet')

function makeRelationshipSet() {
  return RuleSet.new()
}

function dependsOn(depends, on, ruleset) {
  ruleset.AddDep(depends, on)
  return ruleset
}

function areExclusive(opA, opB, ruleset) {
  ruleset.AddConflict(opA, opB)
  return ruleset
}

function checkRelationships(ruleset) {
  return ruleset.IsCoherent()
}

function toggle(selected, toToggle, ruleset) {
  var isSelecting = !selected[toToggle]
  selected[toToggle] = !selected[toToggle]

  if (isSelecting) selectDependencies(selected, toToggle, ruleset)

  // var conflicting = ruleset.conflicts.filter((conf)=>{conf.opA === toToggle})
}

module.exports = {
  makeRelationshipSet: makeRelationshipSet,
  dependsOn: dependsOn,
  areExclusive: areExclusive,
  checkRelationships: checkRelationships,
  toggle: toggle,
}
