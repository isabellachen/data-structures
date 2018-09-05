'use strict';

var should = require('chai').should();

const Set = require('../scripts/set.js');
const Tree = require('../scripts/tree.js');
const HashTable = require('../scripts/hash-table.js');
const BST = require('../scripts/bst.js');
const Graph = require('../scripts/graphs/adjacency-matrix.js');

describe('Set', function () {

  let set;

  beforeEach(function () {
    set = new Set();
  });

  it('the class should provide an "add()" method', function () {
    set.should.not.have.ownProperty('add');
    set.add.should.be.a('function');
  });

  it('the class should provide a "contains()" method', function () {
    set.should.not.have.ownProperty('contains');
    set.contains.should.be.a('function');
  });

  it('the class should provide a "remove()" method', function () {
    set.should.not.have.ownProperty('remove');
    set.remove.should.be.a('function');
  });

  it('should add values, and check that the set contains them', function () {
    set.contains('hello').should.be.false;
    set.add('hello').should.be.true;
    set.contains('hello').should.be.true;
    set.add('world').should.be.true;
    set.contains('hello').should.be.true;
    set.contains('world').should.be.true;
  });

  it('should remove values, and check that the set does not contain them', function () {
    set.add('hello');
    set.add('world');
    set.contains('hello').should.be.true;
    set.contains('world').should.be.true;
    set.remove('hello');
    set.contains('hello').should.be.false;
    set.contains('world').should.be.true;
  });

});

describe('Tree', function () {
  let tree;

  beforeEach(function () {
    tree = new Tree();
  });

  it('the class should provide an "addChild()" method', function () {
    tree.should.not.have.ownProperty('addChild');
    tree.addChild.should.be.a('function');
  });

  it('the class should provide a "contains()" method', function () {
    tree.should.not.have.ownProperty('contains');
    tree.contains.should.be.a('function');
  });

  it('should add values, and check that the tree contains them', function () {
    tree = new Tree('hello');
    tree.contains('hello').should.be.true;
    tree.contains('world').should.be.false;
    const subTree = new Tree('world');
    tree.addChild(subTree).should.be.true;
    tree.contains('world').should.be.true;

    const subTree2 = new Tree('foo');
    tree.addChild(subTree2).should.be.true;
    tree.contains('foo').should.be.true;

    const subSubTree = new Tree('today');
    subTree.addChild(subSubTree).should.be.true;
    tree.contains('today').should.be.true;
  });
});

describe('Hash table', function () {
  let hashTable;

  beforeEach(function () {
    hashTable = new HashTable(2);
  });

  it('each instance should have a "size" property', function () {
    hashTable.size.should.equal(2);
  });

  it('the class should provide an "insert()" method', function () {
    hashTable.should.not.have.ownProperty('insert');
    hashTable.insert.should.be.a('function');
  });

  it('the class should provide a "retrieve()" method', function () {
    hashTable.should.not.have.ownProperty('retrieve');
    hashTable.retrieve.should.be.a('function');
  });

  it('the class should provide a "remove()" method', function () {
    hashTable.should.not.have.ownProperty('remove');
    hashTable.remove.should.be.a('function');
  });

  it('should insert key / value pairs, and be able to retrieve them', function () {
    should.equal(hashTable.retrieve('hello'), undefined);
    hashTable.insert('hello', '2').should.be.true;
    hashTable.retrieve('hello').should.equal('2');
    hashTable.insert('hello', '1').should.be.true;
    should.equal(hashTable.retrieve('world'), undefined);
    hashTable.insert('world', '2');
    hashTable.insert('today', '3');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.retrieve('world').should.equal('2');
    hashTable.retrieve('today').should.equal('3');
  });

  it('should delete keys, and make sure that they return "undefined"', function () {
    hashTable.remove('hello').should.be.false;
    hashTable.insert('hello', '1');
    hashTable.insert('world', '2');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
    hashTable.remove('hello').should.be.false;
    hashTable.remove('world').should.be.true;
    should.equal(hashTable.retrieve('world'), undefined);
  });

  it('should be able to insert and delete the same key / value pair several times ', function () {
    hashTable.insert('hello', '1');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.remove('hello').should.be.true;
    hashTable.insert('hello', '1');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
  });

});

describe('BST', function () {
  let bst;

  beforeEach(function () {
    bst = new BST();
  });

  it('the class should provide an "insert()" method', function () {
    bst.should.not.have.ownProperty('insert');
    bst.insert.should.be.a('function');
  });

  it('the class should provide a "contains()" method', function () {
    bst.should.not.have.ownProperty('contains');
    bst.contains.should.be.a('function');
  });

  it('should be able to insert new values into bst', function () {
    bst = new BST(5);
    bst.insert(4).should.be.true;
    bst.left.value.should.equal(4);
    bst.insert(4).should.be.true;
    bst.left.right.value.should.equal(4);
    bst.insert(3).should.be.true;
    bst.left.left.value.should.equal(3);
    bst.insert(7).should.be.true;
    bst.right.value.should.equal(7);
  });

  it('should be able to check if value is contained in bst', function () {
    bst = new BST(5);
    bst.insert(4).should.be.true;
    bst.insert(6).should.be.true;
    bst.insert(5).should.be.true;
    bst.insert(9).should.be.true;
    bst.insert(1).should.be.true;
    bst.insert(0).should.be.true;
    bst.insert(0).should.be.true;
    bst.contains(4).should.be.true;
    bst.contains(6).should.be.true;
    bst.contains(5).should.be.true;
    bst.contains(9).should.be.true;
    bst.contains(1).should.be.true;
    bst.contains(0).should.be.true;
    bst.contains(12).should.be.false;
  });

  it('should be able to remove a value if found and reorganize the branch', function () {
    bst = new BST(5);
    bst.insert(8).should.be.true;
    bst.insert(4).should.be.true;
    bst.insert(6).should.be.true;
    bst.insert(7).should.be.true;
    bst.insert(9).should.be.true;
    bst.insert(4).should.be.true;
    bst.insert(2).should.be.true;
    bst.insert(1).should.be.true;
    bst.remove(5).should.be.true;
    bst.value.should.equal(6);
    bst.right.left.value.should.equal(7);
    bst.remove(9).should.be.true;
    should.equal(bst.right.right, null);
    bst.remove(2).should.be.true;
    bst.left.left.value.should.equal(1);
  });
});

describe('Graphs - matrix', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  it('should add row and col for every new vertex', () => {
    graph.addVertex('isa', 'girl');
    graph.addVertex('jon', 'boy');
    graph.matrix.length.should.equal(2);
    graph.matrix[0].length.should.equal(2);
  });

  it('should record edges in the matrix', () => {
    graph.addVertex('isa', 'girl');
    graph.addVertex('jon', 'boy');
    graph.addVertex('ben', 'boy');
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.matrix.should.eql([[0, 1, 1], [1, 0, 0], [1, 0, 0]]);
  });

  it('should return all connections for a given key', () => {
    graph.addVertex('isa', 'girl');
    graph.addVertex('jon', 'boy');
    graph.addVertex('ben', 'boy');
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.findConnections('isa').should.eql([1, 2]);
  });
});
