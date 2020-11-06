let maze = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
];
let vis = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let mazeBody = document.getElementById("maze");
mazeBody.style.width = 10 * 50 + 40 + "px";
let m = maze.length;
let n = maze[0].length;
for(let i=0;i<m;i++) {
  for(let j=0;j<n;j++) {
    let newDiv = document.createElement("div");
    newDiv.className = "normal";
    if(maze[i][j] == 1) newDiv.classList.add("obstacle");
    else if((i === m - 1 && j === n - 1) || (i === 0 && j === 0)) newDiv.classList.add("last");
    mazeBody.appendChild(newDiv);
  }
}
let butn = document.getElementById("starting");
async function start() {
  console.log(butn);
  butn.innerHTML = "Running";
  butn.disabled = true;
  for(let i=0;i<m;i++) {
    for(let j=0;j<n;j++) {
      vis[i][j] = 0;
    }
  }
  //call backtracking function
  // setTimeout(function() {

  // }, 3000);
  butn.innerHTML = "Start Algorithm";
  butn.disabled = false;
}