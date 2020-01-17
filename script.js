let size = 20;
let height = 700;
let width = 700;

let row = Math.floor(height / size);
let col = Math.floor(width / size);
let grid = [];
let openSet = [];
let path = [];
let current;
let cameFrom = [];
let closedSet = [];
let totg;
let canvas = document.querySelector("#canvas");
let can = document.querySelector("#can");
let context = canvas.getContext("2d");
// initiliazation code
function noSolution() {
  window.alert("We found no path for the situation please refresh!");
}
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = Infinity;
    this.g = Infinity;
    this.h = 0;
    this.neighbours = [];
    this.prev = undefined;
    this.w = false;
    // if (Math.random() < 0.4) {
    //   this.w = true;
    // }
  }
  show(context, color) {
    context.fillStyle = color;
    if (this.w) {
      context.fillStyle = "#000000";
    }
    context.fillRect(this.x * size, this.y * size, size - 1, size - 1);
  }
  addNeighbours(grid) {
    if (this.x > 0) {
      this.neighbours.push(grid[this.x - 1][this.y]);
    }
    if (this.y > 0) {
      this.neighbours.push(grid[this.x][this.y - 1]);
    }
    if (this.x > 0 && this.y > 0) {
      this.neighbours.push(grid[this.x - 1][this.y - 1]);
    }
    if (this.y < row - 1) {
      this.neighbours.push(grid[this.x][this.y + 1]);
    }
    if (this.x < col - 1) {
      this.neighbours.push(grid[this.x + 1][this.y]);
    }
    if (this.y < row - 1 && this.x > 0) {
      this.neighbours.push(grid[this.x - 1][this.y + 1]);
    }

    if (this.x < col - 1 && this.y > 0) {
      this.neighbours.push(grid[this.x + 1][this.y - 1]);
    }

    if (this.x < col - 1 && this.y < row - 1) {
      this.neighbours.push(grid[this.x + 1][this.y + 1]);
    }
  }
}

// heuristic function

function heuristic(spo, en) {
  let heur = (spo.x - en.x) * (spo.x - en.x) + (spo.y - en.y) * (spo.y - en.y);
  //   let heur = en.x - spo.x + en.y - spo.y;
  return heur;
}
function removeFromset(set, elem) {
  for (let i = set.length; i >= 0; i--) {
    if (set[i] == elem) {
      set.splice(i, 1);
    }
  }
}

// create a grid

for (let i = 0; i < row; i++) {
  let gridRow = [];
  for (let j = 0; j < col; j++) {
    gridRow[j] = new Cell(i, j);
    gridRow[j].show(context, "#00ff00");
  }
  grid[i] = gridRow;
}

//add neighbours
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    grid[i][j].addNeighbours(grid);
  }
}

//reconstruct path

function recons(camefrom, current) {
  pathSet = [];

  //laterr
}

// A star function
//initilization
let end = grid[row - 1][col - 1];
end.w = false;
let start = grid[0][0];
start.g = 0;
start.w = false;

start.h = heuristic(start, end);
start.f = start.h;
openSet.push(start);

// animation loop
function animate() {
  if (openSet.length > 0) {
    //select current with lowest f score
    let winner = 0; //start from zero

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    let current = openSet[winner];
    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.prev) {
        path.push(temp.prev);
        temp = temp.prev;
      }
      for (let i = 0; i < path.length; i++) {
        path[i].show(context, "#fffc00");
      }
      return;
    }
    // for each neighbour if current
    //openSet.remove()
    removeFromset(openSet, current);

    closedSet.push(current);

    let neighbours = current.neighbours;

    for (let i = 0; i < neighbours.length; i++) {
      if (!closedSet.includes(neighbours[i]) && !neighbours[i].w) {
        let tempG = current.g + 1;
        if (openSet.includes(neighbours[i])) {
          if (tempG < neighbours[i].g) {
            neighbours[i].g = tempG;
          }
        } else {
          neighbours[i].g = tempG;
          openSet.push(neighbours[i]);
        }
        neighbours[i].h = heuristic(neighbours[i], end);
        neighbours[i].f = neighbours[i].g + neighbours[i].h;
        neighbours[i].prev = current;
      }
    }

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j].show(context, "#00ff00");
      }
    }
    for (let i = 0; i < openSet.length; i++) {
      openSet[i].show(context, "#ff0000");
    }
    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].show(context, "#00ffff");
    }
  } else {
    console.log("no solution");
    noSolution();
    clearInterval(interval);
    return;
  }
}
// addEventListener("select")
canvas.addEventListener("mousemove", e => {
  if (e.ctrlKey) {
    let x = Math.floor(e.clientX / size);
    let y = Math.floor(e.clientY / size);
    // console.log(e, x, y);
    grid[x][y].w = true;
    grid[x][y].show(context, "#000000");
  }
});
let interval;
function findPath() {
  interval = setInterval(animate, 1);
}
