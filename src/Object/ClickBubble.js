export class ClickBubble {
  constructor({ x = -50, y = -50, fadeOutRate, radius, canvas, fillStyle, energy }) {
    this.x = x;
    this.y = y;
    this.fadeOutRate = fadeOutRate;
    this.radius = radius;
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.energy = energy;
  }
  alpha = 1;

  draw(mouseOnClickEvent) {
    const { fillStyle, alpha, fadeOutRate, radius, y, x, canvas } = this;
    if (mouseOnClickEvent) {
      const { offsetX, offsetY } = mouseOnClickEvent;
      this.x = offsetX;
      this.y = offsetY;
      this.alpha = 1;
    }
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.alpha -= fadeOutRate;
    ctx.globalAlpha = alpha >= 0 ? alpha : 0;
    ctx.fillStyle = fillStyle;
    ctx.fill(); // fill the circle with the current fill color
    ctx.closePath();
  }

  clickBall(ball) {
    const { x, y, radius, energy } = this;
    const clickXFromBall =
      x + radius > ball.x ? x - ball.x : x + radius - ball.x;
    const clickYFromBall =
      y + radius > ball.y ? y - ball.y : y + radius - ball.y;
    const distance = Math.sqrt(
      clickXFromBall * clickXFromBall + clickYFromBall * clickYFromBall
    );
    if (distance > ball.radius) {
      return;
    }
    let angle = Math.atan2(clickYFromBall, clickXFromBall);
    // - angle is north hemi, + angle is south hemi.
    const half = Math.PI / 2;
    if (angle < 0) {
      angle = Math.abs(angle);
      if (angle < half) {
        const percent = angle / half;
        ball.dx = -(energy * (1 - percent));
        ball.dy = energy * percent;
      } else {
        const percent = (angle - half) / half;
        ball.dx = energy * percent;
        ball.dy = energy * (1 - percent);
      }
    } else {
      if (angle < half) {
        const percent = angle / half;
        ball.dx = -(energy * (1 - percent));
        ball.dy = -(energy * percent);
      } else {
        const percent = (angle - half) / half;
        ball.dx = energy * percent;
        ball.dy = -(energy * (1 - percent));
      }
    }
    ball.energy = 1;
  }
}
