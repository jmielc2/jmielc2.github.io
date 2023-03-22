export default class Entity {
    constructor(pos) {
        this.pos = Object.assign(pos);
    }

    move(dir) {
        this.pos.x += dir.x;
        this.pos.y += dir.y;

    }

    calcMove(dir) {
        return {x:this.pos.x + dir.x, y:this.pos.y + dir.y};
    }
}