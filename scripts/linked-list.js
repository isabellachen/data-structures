function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value) {
  this.value = value;
  this.next = null;
  this.prev = null;
}

LinkedList.prototype.addToHead = function(value) {
  const node = new Node(value);
  if (!this.head) this.head = this.tail = node;
  else {
    const origHead = this.head;
    node.next = origHead;
    this.head = node;
  }
  return true;
};

LinkedList.prototype.addToTail = function(value) {
  const node = new Node(value);
  if (!this.head) this.head = this.tail = node;
  else {
    const origTail = this.tail;
    origTail.next = node;
    this.tail = node;
  }
  return true;
};

LinkedList.prototype.removeHead = function() {
  let value;
  if (!this.head) return null;
  if (this.head.next === null) {
    value = this.head.value;
    this.head = this.tail = null;
  } else {
    value = this.head.value;
    this.head = this.head.next;
  }
  return value;
};

LinkedList.prototype.contains = function(value) {
  let curr = this.head;
  while (curr) {
    if (curr.value === value) return true;
    curr = curr.next;
  }
  return false;
};

class DoubleLinkedList extends LinkedList {
  addToHead(value) {
    const prevHead = this.head;
    super.addToHead(value);
    if (prevHead) prevHead.prev = this.head;
    return true;
  }

  addToTail(value) {
    const prevTail = this.tail;
    super.addToTail(value);
    if (prevTail) this.tail.prev = prevTail;
    return true;
  }

  removeHead() {
    const res = super.removeHead();
    if (this.head && this.head.prev) this.head.prev = null;
    return res;
  }

  removeTail() {
    if (this.tail) {
      const prevTail = this.tail;
      if (prevTail.prev) {
        this.tail = prevTail.prev;
        this.tail.next = null;
      } else {
        this.tail = this.head = null;
      }
      return prevTail.value;
    }
    return null;
  }
}

module.exports = {
  LinkedList,
  DoubleLinkedList
};
