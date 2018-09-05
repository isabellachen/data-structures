// Queue

function Queue() {
  this.storage = {};
  this.start = 0;
  this.end = 0;
}

Queue.prototype.enqueue = function(value) {
  this.storage[this.start++] = value;
  return true;
};

Queue.prototype.dequeue = function() {
  const el = this.storage[this.end];
  const value = el ? el : null;
  if (value) delete this.storage[this.end++];
  return value;
};

Queue.prototype.size = function() {
  return this.start - this.end;
};
