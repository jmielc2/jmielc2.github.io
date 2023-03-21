import Node from "../Node.js"
import { Directions, BOUNDARY_POINTS } from "../Game.js"

class Entry {
    constructor(x, y, dir, check) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.check = check;
    }
}

function isValidPos(x, y, graph) {
    return !(x < 0 || y < 0 || y >= graph.length || x >= graph[0].length);
}

function canClearWall(cur, graph) {
    let count = 0;
    for (let i = 0; i < Directions.NUM; i++) {
        let copy = Object.assign({}, cur);
        copy.x += Directions.Dirs[i].x;
        copy.y += Directions.Dirs[i].y;
        count += (!isValidPos(copy.x, copy.y, graph) || graph[copy.y][copy.x].getType() == Node.Type.WALL)? 1 : 0;
    }
    return (count < 3);
}

export function generateMaze(game, difficulty) {
    // Choose Start & End Points 
    let index = Math.round(Math.random() * 10) % 4;
    let addend = (Math.round(Math.random() * 10) % 3) + 1;
    if (!(addend & 1)) {
        addend += (Math.random() > 0.5)? 1 : -1;
    }
    const start = BOUNDARY_POINTS[index];
    const end = BOUNDARY_POINTS[(index + addend) % 4];
    game.setPlayerPos(start.x, start.y);
    game.setExitPos(end.x, end.y);

    // Partition Grid
    let graph = game.grid.slice(1, game.grid.length - 1);
    graph.forEach(function(row, i){
        this[i] = row.slice(1, row.length - 1);
    }, graph);

    // Generate Maze
    let stack = [];
    let x, y;
    const explored = Array(graph.length).fill(0).map((x) => Array(graph[0].length).fill(false));
    let dir = Math.round((Math.random() * 10)) % Directions.NUM;
    stack.push(new Entry(0, 0, dir, true));
    while (stack.length) {
        let cur = stack.pop();
        if (explored[cur.y][cur.x] || canClearWall(cur, graph)) {
            continue;
        }
        graph[cur.y][cur.x].setType(Node.Type.PATH);
        explored[cur.y][cur.x] = true;

        if (cur.check) {
            if (Math.round(Math.random() * 100) < difficulty) {
                cur.dir = (Math.round(Math.random() * 10) % Directions.NUM);
            }
            for (let i = 0; i < Directions.NUM; i++) {
                if (i == cur.dir) {
                    continue;
                }
                x = cur.x + Directions.Dirs[i].x;
                y = cur.y + Directions.Dirs[i].y;
                if (isValidPos(x, y, graph)) {
                    stack.push(new Entry(x, y, i, !cur.check));
                }
            }
        }
        x = cur.x + Directions.Dirs[cur.dir].x;
        y = cur.y + Directions.Dirs[cur.dir].y;
        if (isValidPos(x, y, graph)) {
            stack.push(new Entry(x, y, cur.dir, !cur.check));
        }
    }
}