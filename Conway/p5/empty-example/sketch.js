//create 2-d plane
function cartesianPlane(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let columns;
let rows;
//allows for scaling
let resolution = 20;

//defines setup
function setup() {
  createCanvas(1200, 900);
  columns = width / resolution;
  rows = height / resolution;
  grid = cartesianPlane(columns, rows);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

//implementation
function draw() {
  background(0);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  let next = cartesianPlane(columns, rows);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);
      if (state === 0 && neighbors === 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

//
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let column = (x + i + columns) % columns;
      let row = (y + j + rows) % rows;
      sum += grid[column][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
