let cols = 50;
let rows = 50;
let grid = new Array(cols);
let openSet =[];
let closeSet = [];
let start, end;
var w, h;
let path = [];

function her(a, b){
  return dist(a.i, a.j, b.i, b.j);
}

function removeEle(arr, ele){
  for(let i = arr.length; i >= 0; --i){
    if(arr[i] == ele){      
      arr.splice(i, 1);
    }
  }
}

function Spot(i, j){
  this.i = i;
  this.j = j;
  this.g = 0;
  this.h = 0;
  this.f = 0;
  this.neighbour = [];
  this.prev = undefined;
  this.wall = false;

  if(random(1) < 0.1){
    this.wall = true;
  }
  
  this.show = function(color){
  //fill(color);
  if(this.wall) {
    fill(0)
    stroke(0);
  ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2)
  }
  
  //rect(this.i * w, this.j * h, w - 1, h - 1);
  }
  
  this.addNeighbours = function(grid){
    if(i < cols - 1) { this.neighbour.push(grid[i + 1][j]); }
    if(i > 0) { this.neighbour.push(grid[i - 1][j]); }
    if(j < rows - 1) { this.neighbour.push(grid[i][j + 1]); }
    if(j > 0) { this.neighbour.push(grid[i][j - 1]); }
    
  }
}

function setup(){
  createCanvas(400, 400);
  for(let i = 0; i < cols; ++i){
    grid[i] = new Array(rows);
  }
  w  = width / cols;
  h = height / rows;
  for(let i = 0; i < cols; ++i){
    for(let j = 0; j < rows; ++j){
      grid[i][j] = new Spot(i, j);
    }
  }
  
  for(let i = 0; i < cols; ++i){
    for(let j = 0; j < rows; ++j){
      grid[i][j].addNeighbours(grid);
    }
  }


    start = grid[0][0];
    end = grid[rows - 1][cols - 1];
    start.wall = false;
    end.wall = false;
    openSet.push(start);
}

function draw() {
  if(openSet.length != 0){
    let lowest = 0;
    for(let i = 0; i < openSet.length; ++i){
      if(openSet[i].f < openSet[lowest].f){
        lowest = i;
      }
  }
    var current = openSet[lowest];
    if(current === end) {

      noLoop();
      console.log("Done");
      
    }
    closeSet.push(current);
    removeEle(openSet, current);
        let neighbours = current.neighbour;
    for(let i = 0; i < neighbours.length; ++i){
      let neighbour = neighbours[i];
      if(!closeSet.includes(neighbour) && !neighbour.wall){
        let tentG = current.g + 1;
        if(openSet.includes(neighbour)){
          if(tentG < neighbour.g){
            neighbour.g = tentG;
          }
        }else{
          neighbour.g = tentG;
          openSet.push(neighbour);
        }
        neighbour.h = her(neighbour, end);
      neighbour.f = neighbour.g + neighbour.h;
      neighbour.prev = current;
      }
      
      
    }

    
     
  }else{
    //console.log("No solution");
    alert("No solution")
    noLoop();
    return;
  }
  background(255);
  for(let i = 0; i < cols; ++i){
    for(let j = 0; j < rows; ++j){
      grid[i][j].show(color(255));
    }
  }
  
  for(let i = 0; i < closeSet.length; ++i){
    closeSet[i].show(color(255, 0, 0))
  }
  
   for(let i = 0; i < openSet.length; ++i){
    openSet[i].show(color(0, 255, 0));
  }
  
  // for(let i = 0; i < path.length; ++i){
  //   path[i].show(color(0, 0, 255))
  // }
  
  path = [];
      let temp = current;
      path.push(temp);
      while(temp.prev){
        path.push(temp.prev)
        temp = temp.prev;
      }
  


  noFill()
  stroke(255, 45, 79)
  strokeWeight(w / 2);
  beginShape()
  for(let i = 0; i < path.length; ++i){
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape()
}

//credit:- The coding train:- https://www.youtube.com/user/shiffman