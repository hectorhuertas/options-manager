var RuleSet = require('./RuleSet')

function makeRelationshipSet() {
  return RuleSet.new()
}

function dependsOn(depends, on, ruleset) {
  return ruleset.AddDep(depends, on)
}

function areExclusive(opA, opB, ruleset) {
  return ruleset.AddConflict(opA, opB)
}

function checkRelationships(ruleset) {
  return ruleset.IsCoherent()
}

function _modify(selected, toModify, isSelecting, ruleset, checked = []) {
  if (checked.indexOf(toModify) !== -1) return
  checked.push(toModify)
  if (isSelecting) {
    selected[toModify] = true
    ruleset.dependenciesOf(toModify).forEach((dep)=>{ _modify(selected, dep, true, ruleset, checked)})
    ruleset.conflictsOf(toModify).forEach((dep)=>{ _modify(selected, dep, false, ruleset, checked)})
  } else {
    delete selected[toModify]
    ruleset.dependingOn(toModify).forEach((dep)=>{_modify(selected, dep, false, ruleset, checked)})
  }
  return selected
}

function toggle(selected, toToggle, ruleset) {
  var isSelecting = !selected[toToggle]

  return _modify(selected, toToggle, isSelecting, ruleset)
}

function stringSlice(selected) {
  return 'Selected options: ' + Object.keys(selected)
}

module.exports = {
  makeRelationshipSet: makeRelationshipSet,
  dependsOn: dependsOn,
  areExclusive: areExclusive,
  checkRelationships: checkRelationships,
  toggle: toggle,
  stringSlice: stringSlice
}
