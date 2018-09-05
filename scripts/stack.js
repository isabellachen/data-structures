'use strict';

// Stack

function Stack() {
  this.storage = {};
  this.length = 0;
}

Stack.prototype.push = function(value) {
  this.storage[this.length++] = value;
  return true;
};

Stack.prototype.pop = function() {
  const el = this.storage[--this.length];
  delete this.storage[this.length];
  const value = el ? el : null;
  return value;
};

Stack.prototype.size = function() {
  return this.length;
};

module.exports = {
  Stack
};
