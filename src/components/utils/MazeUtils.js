import Node from "../Node.js"
import { Directions, NUM_DIRS, BOUNDARY_POINTS } from "../../pages/Game.js"
import { isValidPos } from "./GameUtils.js"

class Entry {
    constructor(x, y, dir, check, dist=0) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.check = check;
        this.dist = dist;
    }
}

function canClearWall(cur, graph) {
    let count = 0;
    for (let i = 0; i < NUM_DIRS; i++) {
        let copy = Object.assign({}, cur);
        copy.x += Directions[i].x;
        copy.y += Directions[i].y;
        count += (!isValidPos(copy, graph) || graph[copy.y][copy.x].getType() == Node.Types.WALL)? 1 : 0;
    }
    return (count < 3);
}

function generateMaze_h(graph, difficulty) {
    let stack = [];
    let x, y;
    const explored = Array(graph.length).fill(null).map((x) => Array(graph[0].length).fill(false));
    let dir = Math.floor((Math.random() * 10)) % NUM_DIRS;
    let furthest = new Entry(0, 0, dir, true);
    stack.push(furthest);
    while (stack.length) {
        let cur = stack.pop();
        if (explored[cur.y][cur.x] || canClearWall(cur, graph)) {
            continue;
        }
        graph[cur.y][cur.x].setType(Node.Types.PATH);
        explored[cur.y][cur.x] = true;

        if (cur.check) {
            if (cur.dist > furthest.dist) {
                furthest = cur;
            }
            if (Math.floor(Math.random() * 100) < difficulty) {
                let temp;
                do {
                    temp = (Math.floor(Math.random() * NUM_DIRS))
                } while (temp == cur.dir);
                cur.dir = temp;
            }
            for (let i = 0; i < NUM_DIRS; i++) {
                if (i == cur.dir) {
                    continue;
                }
                x = cur.x + Directions[i].x,
                y = cur.y + Directions[i].y
                if (isValidPos({x:x, y:y}, graph)) {
                    stack.push(new Entry(x, y, i, !cur.check, cur.dist + 1));
                }
            }
        }
        x = cur.x + Directions[cur.dir].x,
        y = cur.y + Directions[cur.dir].y
        if (isValidPos({x:x, y:y}, graph)) {
            stack.push(new Entry(x, y, cur.dir, !cur.check, cur.dist + 1));
        }
    }
    furthest.x += 1;
    furthest.y += 1;
    return furthest;
}

export function generateMaze(grid, difficulty) {
    // Choose Start & End Points 
    let index = Math.floor(Math.random() * 10) % 4;
    const start = Object.assign({}, BOUNDARY_POINTS[index]);
    const end = Object.assign({}, BOUNDARY_POINTS[(index + 2) % 4]);

    // Partition Grid
    let graph = grid.slice(1, grid.length - 1);
    graph.forEach(function(row, i){
        this[i] = row.slice(1, row.length - 1);
    }, graph);

    // Generate Maze
    return {
        start : start,
        end : end,
        furthest : generateMaze_h(graph, difficulty)
    };
}