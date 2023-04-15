import { getDistance } from "./utils/GameUtils.js"

export default class Entity {
    static Types = {
        ENEMY : {
            id : 0,
        },
        PLAYER : {
            id : 1,
        },
        EXIT : {
            id : 2,
        },
        THREAD  : {
            id : 3,
        },
        ROPE : {
            id : 4,
        },
        NONE : {
            id : null,
        }
    }

    constructor(type) {
        this.pos = null;
        this.setType(type);
    }

    setPos(pos) {
        this.pos = Object.assign({}, pos);
    }

    move(dir) {
        this.pos.x += dir.x;
        this.pos.y += dir.y;
    }

    calcMove(dir) {
        return {x:this.pos.x + dir.x, y:this.pos.y + dir.y};
    }

    draw() {
        return;
    }

    drawSpotlight(grid, radius, brightness) {
        const startX = this.pos.x - radius;
        const startY = this.pos.y - radius;
        const cur = {x:startX, y:startY};
        for (cur.y = startY; cur.y <= startY + radius * 2; cur.y++) {
            for (cur.x = startX; cur.x <= startX + radius * 2; cur.x++) {
                if (grid.isValid(cur)) {
                    let diff = getDistance(cur, this.pos);
                    if (diff <= radius) {
                        const intensity = Math.max(0, radius + 0.1 - diff) * brightness;
                        const curIntensity = grid.grid[cur.y][cur.x].getIntensity();
                        grid.grid[cur.y][cur.x].setIntensity(Math.min(1, intensity + curIntensity));
                    }
                }
            }
        }
    }

    reset() {
        return;
    }

    update(deltaTime) {
        return;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }
}