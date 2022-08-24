const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const cell_size = 20;
canvas.width = 800;
canvas.height = 800;

const columns = canvas.width / cell_size;
const rows = canvas.height / cell_size;

function cartesianPlane() {
  return new Array(columns).fill(null)
    .map(() => new Array(rows).fill(null)
      .map(() => Math.floor(Math.random()*2)));
}

let grid = cartesianPlane();

requestAnimationFrame(update);

function update() {
  grid = getNextGeneration(grid);
  render(grid);
  requestAnimationFrame(update);
}

function getNextGeneration(grid) {
  const nextGen = grid.map(arr => [...arr]);
  for (let column = 0; column < grid.length; column++) {
    for (let row = 0; row < grid[column].length; row++) {
      const cell = grid[column][row];
      let numNeighbors = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_coordinate = column + i;
          const y_coordinate = row + j;

          if (x_coordinate >= 0 && y_coordinate >= 0 && x_coordinate < columns && y_coordinate < rows) {
            const currentNeighbor = grid[column + i][row + j];
            numNeighbors += currentNeighbor;
          }
        }
      }
      if (cell === 1 && (numNeighbors < 2 || numNeighbors > 3)) {
        nextGen[column][row] = 0;
      } else if (cell === 0 && numNeighbors === 3) {
        nextGen[column][row] = 1;
      }
    }
  }
  return nextGen;
}

function render(grid) {
  for (let column = 0; column < grid.length; column++) {
    for (let row = 0; row < grid[column].length; row++) {
      const cell = grid[column][row];

      ctx.beginPath();
      ctx.rect(column * cell_size, row * cell_size, cell_size, cell_size);
      ctx.fillStyle = cell ? 'green' : 'orange';
      ctx.fill();
      ctx.stroke();
    }
  }
}

function grid(columns,rows){
    let arr = new Array(columns);
    for(let i=0; i<arr.length;i++){
        arr[i] = new Array(rows)
    }
    return arr
}