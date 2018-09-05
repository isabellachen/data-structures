'use strict';

const helpers = require('./hash-table-helpers');

// These are your helpers, they're used to generate
// the storage and get the hash respectively. For more
// information check the "hash-table-helpers.js" file.
const Storage = helpers.Storage;
const hash = helpers.hash;

function HashTable (size) {
  this.size = size;
  this.storage = Storage(size);
  this.used = 0;
}

HashTable.prototype.print = function () {
  this.storage.print();
};

HashTable.prototype._resize = function (key) {
  let newSize;
  if (this.used / this.size <= 0.25) {
    newSize = Math.floor(this.size / 2);
  } else if (this.used / this.size >= 0.75) {
    newSize = Math.floor(this.size * 2);
  } else if (!newSize) return;

  const newHashTable = new HashTable(newSize);
  newHashTable.resizing = true;

  for (let hash = 0; hash < this.size; hash++) {
    let node = this.storage.get(hash);
    while (node) {
      newHashTable.insert(node.key, node.val);
      node = node.next; // distribute the nodes of any possible linked lists
    }
  }

  Object.assign(this, newHashTable, { resizing: false }); // (this, newHashTable, {resizing: false})
  return true;
};

HashTable.prototype.insert = function (key, val) {
  const index = hash(key, this.size);
  let node = this.storage.get(index);
  const newNode = { key, val, next: null };
  if (!node) {
    this.storage.set(index, newNode);
    this.used++;
  } else {
    while (node) {
      if (node.key === key) {
        node.val = val;
        this.used++;
        return true;
      }
      if (node.next === null) {
        node.next = newNode;
        this.used++;
        return true;
      }
      node = node.next;
    }
  }
  // so we know whether insert is called during a normal insert process or a resizing process
  // we don't want to call _.resize during the resizing process
  if (!this.resizing) this._resize(key);
  return true;
};

HashTable.prototype.retrieve = function (key) {
  const index = hash(key, this.size);
  let node = this.storage.get(index);
  while (node) {
    if (node.key === key) {
      return node.val;
    }
    node = node.next;
  }
  return undefined;
};

HashTable.prototype.remove = function (key) {
  const index = hash(key, this.size);
  let node = this.storage.get(index);
  if (node) {
    if (node.key === key && node.next === null) {
      // if there is only one node
      this.storage.set(index, undefined);
      this.used--;
      return true;
    }
    if (node.key === key) {
      // remove head of a linkedList
      this.storage.set(index, node.next);
      this.used--;
      return true;
    }
    while (node.next) {
      // remove node in middle of linkedList
      if (node.next.key === key) {
        node.next = node.next.next;
      }
      node = node.next;
    }
  }
  return false;
};

module.exports = HashTable;
