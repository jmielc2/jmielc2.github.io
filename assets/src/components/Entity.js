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
        NONE : {
            id : null,
        }
    }

    constructor(pos, type) {
        this.pos = Object.assign({}, pos);
        this.setType(type);
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