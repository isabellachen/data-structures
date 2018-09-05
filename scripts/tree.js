class Tree {
  constructor (value) {
    this.value = value;
    this.children = [];
  }

  addChild (tree) {
    this.children.push(tree);
    return true;
  }

  // contains (value) {
  //   if (this.value === value) return true;
  //   if (this.children.length) {
  //     for (let tree of this.children) {
  //       if (tree.contains(value)) return true;
  //     }
  //   }
  //   return false;
  // }

  contains (value) {
    return this.value === value
      ? true
      : this.children.some(child => child.contains(value));
  }

  // return this.value === value || this.children.reduce(
  //   (accumulator, currentNode) =>
  //     accumulator || currentNode.contains(value), false);
}

module.exports = Tree;
