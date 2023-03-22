export function isValidPos(x, y, graph) {
    return !(x < 0 || y < 0 || y >= graph.length || x >= graph[0].length);
}

export function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow((pos2.x - pos1.x), 2) + Math.pow((pos2.y - pos1.y), 2));
}