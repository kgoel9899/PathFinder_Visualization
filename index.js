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
    newDiv.setAttribute("id", "b" + i + j);
    if(maze[i][j] == 1) newDiv.classList.add("obstacle");
    else if((i === m - 1 && j === n - 1) || (i === 0 && j === 0)) newDiv.classList.add("last");
    mazeBody.appendChild(newDiv);
  }
}
let butn = document.getElementById("starting");
async function start() {
  butn.innerHTML = "Running";
  butn.disabled = true;
  for(let i=0;i<m;i++) {
    for(let j=0;j<n;j++) {
      vis[i][j] = 0;
    }
  }
  await path(0, 0, "", -1);
  butn.innerHTML = "Start Algorithm";
  butn.disabled = false;
}
let allPaths = document.getElementById("paths");
async function path(r, c, ans, call) {
  if(r >= m || c >= n || r < 0 || c < 0 || vis[r][c] === 1 || maze[r][c] === 1) {
    return;
  }
  if(r === m - 1 && c === n - 1) {
    console.log(ans);
    let newPara = document.createElement("p");
    newPara.innerText = ans;
    newPara.style.fontSize = "20px";
    allPaths.appendChild(newPara);
    let newVis = document.getElementById("b" + r + c);
    newVis.classList.add("found-last");
    await delay(500);
    newVis.classList.remove("found-last");
    return;
  }
  let newVis = document.getElementById("b" + r + c);
  newVis.classList.add("visited");
  await delay(3);
  vis[r][c] = 1;
  await path(r + 1, c, ans + "D", 1);
  await path(r - 1, c, ans + "U", 2);
  await path(r, c + 1, ans + "R", 3);
  await path(r, c - 1, ans + "L", 4);
  vis[r][c] = 0;
  newVis.classList.remove("visited");
  await delay(3);
}
const delay = ms => new Promise(res => setTimeout(res, ms));
