export class Ball {
  constructor({ x, y, dx, dy, maxEnergy, radius, canvas, fillStyle }) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.energy = maxEnergy;
    this.radius = radius;
    this.canvas = canvas;
    this.fillStyle = fillStyle;
  }

  outOfBounds = false;

  updateMovement(ball) {
    const { canvas, radius } = ball;
    if (ball.energy > 0) {
      ball.energy -= 0.01;
    }
    ball.x += ball.dx * ball.energy;
    ball.y += ball.dy * ball.energy;
    const outCanvasWidth = ball.x <= 0 + radius || ball.x >= canvas.width - radius;
    const outCanvasHeight = ball.y <= 0 + radius || ball.y >= canvas.height - radius;
    // flip direction if ball reaches edge of canvas
    if (outCanvasWidth && !ball.outOfBounds) {
      ball.dx = -ball.dx;
    }
    if (outCanvasHeight && !ball.outOfBounds) {
      ball.dy = -ball.dy;
    }

    const isOutOfBounds = (outCanvasWidth || outCanvasHeight) && !ball.outOfBounds;
    if (isOutOfBounds) {
      ball.outOfBounds = true;
    } else {
      ball.outOfBounds = false;
    }
    
  }

  draw() {
    const { canvas, radius, fillStyle, x, y, updateMovement } = this;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.globalAlpha = 1;
    ctx.fillStyle = fillStyle;
    ctx.fill(); // fill the circle with the current fill color
    ctx.closePath();
    updateMovement(this);
  }
}
