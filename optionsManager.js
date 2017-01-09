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

function _modify(selected, toModify, isSelecting, ruleset, checked = []) {
  if (checked.indexOf(toModify) !== -1) return
  if (isSelecting) {
    selected[toModify] = true
  } else {
    delete selected[toModify]
  }
  checked.push(toModify)

  var dependencies = ruleset.dependencies[toModify]
  if (dependencies) dependencies.forEach((dep) => { _modify(selected, dep, isSelecting, ruleset, checked) })

  var conflicts = ruleset.conflicts.filter((conflict)=>{ return conflict.opA === toModify })
  if (conflicts) conflicts.forEach((conf) => { _modify(selected, conf.opB, !isSelecting, ruleset, checked) })

}

function toggle(selected, toToggle, ruleset) {
  var isSelecting = !selected[toToggle]

  _modify(selected, toToggle, isSelecting, ruleset)

  return selected
}

module.exports = {
  makeRelationshipSet: makeRelationshipSet,
  dependsOn: dependsOn,
  areExclusive: areExclusive,
  checkRelationships: checkRelationships,
  toggle: toggle,
}
