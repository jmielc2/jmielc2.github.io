const dim = 35;
const MAX_DIM_X = 33;
const MAX_DIM_Y = 23;
let WIDTH = 0;
let HEIGHT = 0;

function getDimensions() {
  let x = Math.min(
    Math.round((window.innerWidth - dim) / dim),
    MAX_DIM_X
  );
  x -= ((x - 3) % 2);
  let y = Math.min(
    Math.round((window.innerHeight - dim) / dim),
    MAX_DIM_Y
  );
  y -= ((y - 3) % 2);
  return {X : x, Y : y};
}

function setup() {
  let dimensions = getDimensions();
  WIDTH = dimensions.X * dim;
  HEIGHT = dimensions.Y * dim;
  var cnv = createCanvas(
    WIDTH,
    HEIGHT,
    P2D
  );
  
}

function draw() {
  for (let i = 0; i < WIDTH; i += dim) {
    for (let j = 0; j < HEIGHT; j += dim) {
      if (!(i % 2) && !(j % 2)) {
        fill(0);
      } else {
        fill(255);
      }
      square(i, j, dim);
    }
  }
}