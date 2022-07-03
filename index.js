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

async function create() {
  for(let i=0;i<m;i++) {
    for(let j=0;j<n;j++) {
      let newDiv = document.createElement("div");
      newDiv.className = "normal";
      newDiv.setAttribute("id", "b" + i + j);

      if(maze[i][j] == 1) newDiv.classList.add("obstacle");
      else if((i === m - 1 && j === n - 1) || (i === 0 && j === 0)) newDiv.classList.add("last");

      mazeBody.appendChild(newDiv);

      vis[i][j] = 0;
    }
  }
}

create();

async function original() {
  for(let i=0;i<m;i++) {
    for(let j=0;j<n;j++) {
      let newDiv = document.getElementById("b" + i + j);
      newDiv.className = "normal";

      if(maze[i][j] == 1) newDiv.classList.add("obstacle");
      else if((i === m - 1 && j === n - 1) || (i === 0 && j === 0)) newDiv.classList.add("last");

      vis[i][j] = 0;
    }
  }
}

let dfs_butn = document.getElementById("dfs");
let bfs_butn = document.getElementById("bfs");
let dij_butn = document.getElementById("dij");

async function bfs() {
  dfs_butn.disabled = true;

  await BFS(0, 0);

  dfs_butn.disabled = false;
}

let dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]];

async function ColorBFSPath(pars) {
  let x = pars[m - 1][n - 1][0], y = pars[m - 1][n - 1][1];
  while(true) {
    let cell = document.getElementById("b" + x + y);
    cell.classList.add("final-path");
    await delay(100);
    let tempx = pars[x][y][0], tempy = pars[x][y][1];
    x = tempx;
    y = tempy;
    if(x === 0 && y === 0) break;
  }
}
async function BFS(r, c) {
  let newVis = document.getElementById("b" + r + c);
  newVis.classList.add("visited");
  await delay(3);

  let queue = [];
  queue.push([r, c]);
  vis[r][c] = 1;

  let pars = [];
  for(let i=0;i<m;i++) {
    let temp = [];
    for(let j=0;j<n;j++) {
      temp.push([-1, -1]);
    }
    pars.push(temp);
  }

  while(queue.length) {
    let curr = queue.shift();

    if(curr[0] == m - 1 && curr[1] === n - 1) {
      let newVis = document.getElementById("b" + curr[0] + curr[1]);
      newVis.classList.add("found-last");

      await ColorBFSPath(pars);

      newVis = document.getElementById("b00");
      newVis.classList.add("found-last");

      break;
    }

    for(let i=0;i<4;i++) {
      let nx = curr[0] + dirs[i][0];
      let ny = curr[1] + dirs[i][1];

      if(nx >= 0 && nx < m && ny >= 0 && ny < n && vis[nx][ny] === 0 && maze[nx][ny] != 1) {
        vis[nx][ny] = 1;
        queue.push([nx, ny]);
        pars[nx][ny] = [curr[0], curr[1]];
        let newVis = document.getElementById("b" + nx + ny);
        newVis.classList.add("visited");
        await delay(100);
      }
    }
  }
}

async function dfs() {
  bfs_butn.disabled = true;

  await DFS(0, 0, "");

  bfs_butn.disabled = false;
}

async function ColorDFSPath(ans) {
  let sz = ans.length;
  let x = m - 1, y = n - 1;

  for(let i=sz-1;i>=0;i--) {
    if(i != sz - 1) {
      let cell = document.getElementById("b" + x + y);
      cell.classList.add("final-path");
    }
    await delay(100);

    if(ans[i] === 'R') y--;
    else if(ans[i] === 'L') y++;
    else if(ans[i] == 'U') x++;
    else x--;
  }
}
async function DFS(r, c, ans) {
  if(r >= m || c >= n || r < 0 || c < 0 || vis[r][c] === 1 || maze[r][c] === 1) {
    return;
  }

  if(r === m - 1 && c === n - 1) {
    let newVis = document.getElementById("b" + r + c);
    newVis.classList.add("found-last");

    await ColorDFSPath(ans);

    newVis = document.getElementById("b00");
    newVis.classList.add("found-last");

    return true;
  }
  let newVis = document.getElementById("b" + r + c);

  newVis.classList.add("visited");
  await delay(100);
  vis[r][c] = 1;

  let result = await DFS(r + 1, c, ans + "D");
  if(result) return true;

  result = await DFS(r - 1, c, ans + "U");
  if(result) return true;

  result = await DFS(r, c + 1, ans + "R");
  if(result) return true;

  result = await DFS(r, c - 1, ans + "L");
  if(result) return true;
}

const delay = ms => new Promise(res => setTimeout(res, ms));
