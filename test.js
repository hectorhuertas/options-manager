var optionsManager = require('./optionsManager')

var makeRelationshipSet = optionsManager.makeRelationshipSet
var dependsOn           = optionsManager.dependsOn
var areExclusive        = optionsManager.areExclusive
var checkRelationships  = optionsManager.checkRelationships
var toggle              = optionsManager.toggle

var s, selected;

console.log('\n\n');
console.log('STARING TESTS\n');
console.log('TEST 1...');

s = makeRelationshipSet();
s = dependsOn('a', 'a', s);
console.assert(checkRelationships(s));

console.log('...... OK\n');
console.log('TEST 2...');

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'a', s);
console.assert(checkRelationships(s));

console.log('...... OK\n');
console.log('TEST 3...');

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = areExclusive('a', 'b', s);
console.assert(!checkRelationships(s));

console.log('...... OK\n');
console.log('TEST 4...');

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = areExclusive('a', 'c', s);
console.assert(!checkRelationships(s));

console.log('...... OK\n');
console.log('TEST 5...');

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = dependsOn('c', 'a', s);
s = dependsOn('d', 'e', s);
s = areExclusive('c', 'e', s);
console.assert(checkRelationships(s));

console.log('...... OK\n');
console.log('RULESET:');
console.log('Deps: ', s.dependencies);
console.log('Conf: ', s.conflicts);
// This function takes some arguments and returns a set of selected options.
// If needed, you should replace it with your own data structure.
function set() {
  var l = {};
  for (var i in arguments) {
    l[arguments[i]] = true;
  }
  return l;
}

// This function returns whether two sets of selected options have the same options selected.
// If needed, you should reimplement it for your own data structure.
function setsEqual(a, b) {
  var ka = Object.keys(a).sort();
  var kb = Object.keys(b).sort();
  if (ka.length != kb.length) {
    return false;
  }
  for (var i in ka) {
    if (kb[i] != ka[i]) {
      return false;
    }
  }
  return true;
}

selected = set();  // Or list, array, etc.
console.log('TEST 6...');
// console.log(s.dependenciesOf('a'));
// console.log(s.dependenciesOf('b'));
// console.log(s.dependenciesOf('c'));
console.log(selected);
selected = toggle(selected, 'a', s);
console.log(selected);
console.assert(setsEqual(selected, set('a', 'c', 'b')));

console.log('...... OK\n');
console.log('TEST 7...');

s = dependsOn('f', 'f', s);
selected = toggle(selected, 'f', s);
console.assert(setsEqual(selected, set('a', 'c', 'b', 'f')));

console.log('...... OK\n');
console.log('TEST 8...');

selected = toggle(selected, 'e', s);
console.assert(setsEqual(selected, set('e', 'f')));

console.log('...... OK\n');
console.log('TEST 9...');

selected = toggle(selected, 'b', s);
console.assert(setsEqual(selected, set('a', 'c', 'b', 'f')));

console.log('...... OK\n');
console.log('TEST 10...');


s = dependsOn('b', 'g', s);
console.log('RULESET:');
console.log('Deps: ', s.dependencies);
console.log('Conf: ', s.conflicts);
selected = toggle(selected, 'g', s);
selected = toggle(selected, 'b', s);
console.assert(setsEqual(selected, set('g', 'f')));

console.log('...... OK\n');
console.log('TEST 11...');

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
selected = set();
selected = toggle(selected, 'c', s);
console.assert(setsEqual(selected, set('c')));

console.log('...... OK\n');
console.log('TEST 12...');

// Deep dependencies
s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = dependsOn('c', 'd', s);
s = dependsOn('d', 'e', s);
s = dependsOn('a', 'f', s);
s = areExclusive('e', 'f', s);
console.assert(checkRelationships(s));

console.log('...... OK\n');
console.log('TEST 12...');
// Multiple dependencies and exclusions.

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('a', 'c', s);
s = areExclusive('b', 'd', s);
s = areExclusive('b', 'e', s);
console.assert(checkRelationships(s));
selected = set();
selected = toggle(selected, 'd', s);
selected = toggle(selected, 'e', s);
selected = toggle(selected, 'a', s);
console.assert(setsEqual(selected, set('a', 'c', 'b')));
console.log('...... OK\n');
