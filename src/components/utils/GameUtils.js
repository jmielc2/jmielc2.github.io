export function isValidPos(pos, grid) {
    return !(pos.x < 0 || pos.y < 0 || pos.y >= grid.length || pos.x >= grid[0].length);
}

export function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow((pos2.x - pos1.x), 2) + Math.pow((pos2.y - pos1.y), 2));
}