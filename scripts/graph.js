class Graph {
  constructor () {
    this.stack = [];
    this.vertices = {};
    this.edges = [];
  }

  createVertex (value) {
    const vertex = new Vertex(value);
    this.vertices[value];
  }

  createEdge (start, end) {
    // look into vertices and check if start and end are valid
    const edge = new Edge(start, end);
    this.edges.push(edge);
  }
}

class Vertex {
  constructor (value) {
    this.id = value;
    this.value = value;
  }
}

class Edge {
  constructor (start, end) {
    this.start = start;
    this.end = end;
  }
}