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

function selectWithDependecies(selected, toSelect, ruleset, checked = []) {
  if (checked.indexOf(toSelect) !== -1) return
  selected[toSelect] = true
  checked.push(toSelect)
  var dependencies = ruleset.dependencies[toSelect]
  if (!dependencies) return
  dependencies.forEach((dep) => { selectWithDependecies(selected, dep, ruleset, checked) })
}

function toggle(selected, toToggle, ruleset) {
  var isSelecting = !selected[toToggle]
  // selected[toToggle] = !selected[toToggle]

  if (isSelecting) selectWithDependecies(selected, toToggle, ruleset)

  // if (isSelecting) selectDependencies(selected, toToggle, ruleset)

  // var conflicting = ruleset.conflicts.filter((conf)=>{conf.opA === toToggle})
  return selected
}

module.exports = {
  makeRelationshipSet: makeRelationshipSet,
  dependsOn: dependsOn,
  areExclusive: areExclusive,
  checkRelationships: checkRelationships,
  toggle: toggle,
}
