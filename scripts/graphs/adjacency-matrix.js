const saveVertex = Symbol('save vertex');

class Graph {
  constructor () {
    this.storage = []; // array representing the values stored in each vertex
    this.matrix = []; // matrix representing the connections between vertices
    this.count = 0;
  }

  [saveVertex] (key, val) {
    this.storage[this.count] = { [key]: val };
    this.count++;
  }

  addVertex (key, val) {
    //if there are no rows, add the first row
    if (!this.matrix.length) {
      this.matrix[this.count] = [0];
      this[saveVertex](key, val);
    } else {
      this.matrix.forEach(row => row.push(0)); //expand pre-exising rows by one col
      this.matrix.push(Array(this.count + 1).fill(0)); //add a row to the matrix
      this[saveVertex](key, val);
    }
  }

  addEdge (v1, v2) {
    this.matrix[v1][v2] = 1;
    this.matrix[v2][v1] = 1;
  }

  findConnections (key) {
    //look into storage and find the index of the object whoes key === key
    const index = this.storage.reduce((accum, curr, idx) => {
      return Object.keys(curr)[0] === key ? idx : accum;
    }, 0);

    //grab all the connections on that row of the matrix
    return this.matrix[index].reduce((accum, curr, idx) => {
      return curr ? accum.concat(idx) : accum;
    }, []);
  }
}

module.exports = Graph;
