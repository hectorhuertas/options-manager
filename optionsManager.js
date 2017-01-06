var RuleSet = require('./RuleSet')

function makeRelationshipSet() {
  // console.log(RuleSet.new().__proto__);
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

module.exports = {
  makeRelationshipSet: makeRelationshipSet,
  dependsOn: dependsOn,
  areExclusive: areExclusive,
  checkRelationships: checkRelationships,
}
