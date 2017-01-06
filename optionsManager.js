var RuleSet = require('./RuleSet')

function makeRelationshipSet() {
  return RuleSet.new()
}

function dependsOn(depends, on, ruleset) {
  ruleset.AddDep(depends, on)
}

function areExclusive(opA, opB, ruleset) {
  ruleset.AddConflict(opA, opB)
}

function checkRelationships() {

}

module.exports = {
  makeRelationshipSet: makeRelationshipSet,
  dependsOn: dependsOn,
  areExclusive: areExclusive,
  checkRelationships: checkRelationships,
}
