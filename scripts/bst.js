class BST {
  constructor (value, parent = null) {
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert (value) {
    if (value < this.value) {
      if (this.left) return this.left.insert(value);
      this.left = new BST(value, this);
    }
    if (value >= this.value) {
      if (this.right) return this.right.insert(value);
      this.right = new BST(value, this);
    }
    return true;
  }

  contains (value) {
    if (this.value === value) return true;
    if (value < this.value && this.left) return this.left.contains(value);
    if (value > this.value && this.right) return this.right.contains(value);
    return false;
  }

  remove (value) { // replace with the next largest - look right once, and then keep looking left
    if (!this.contains(value)) return false;
    if (value < this.value) this.left.remove(value);
    if (value > this.value) this.right.remove(value);
    if (value === this.value) {
      if (this.left && this.right) { // node has two children
        const successor = this.right.findMin(); // successor is next closely largest node
        this.remove(successor);
        this.value = successor;
      }
      else if (this.left) this.replace(this.left); // node has only one child
      else if (this.right) this.replace(this.right);
      else this.replace(null); // node has no children
    }
    return true;
  }

  replace (node) {
    if (this.parent.left === this) this.parent.left = node;
    else this.parent.right = node;
    if (node) node.parent = this.parent;
  }

  findMin () {
    if (!this.left) return this.value;
    return this.left.findMin();
  }
}

module.exports = BST;
