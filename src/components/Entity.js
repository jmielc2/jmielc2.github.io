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

    reset() {
        return;
    }

    update() {
        return;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }
}