'use strict';

class Set {
  contains (value) {
    return Object.keys(this).includes(value);
    // master solution
    // return !!this[value];
  }

  add (value) {
    if (!this.contains(value)) return this[value] = true;
    // master solution
    // return this[value] = true;
  }

  remove (value) {
    if (this.contains(value)) delete this[value];
    // master solution
    // delete this[value];
  }
}

module.exports = Set;
