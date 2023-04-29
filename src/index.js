// TODO - Refactor. Create classes for each drawn object.

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

ctx.beginPath(); // start a new path
const ballRadius = 12;
const clickBubbleRadius = 6;
// set ball in middle;
let x = canvas.width / 2;
let y = canvas.height / 2;

let clickX = -50;
let clickY = -50;
let clickAlpha = 1;
const fadeOutRate = 0.03;

// initial velocity
let dx = 0;
let dy = 0;
const clickEnergy = 6;
let energy = 1;

let isOutOfBounds = false;

function drawClickBubble(e) {
  if (e) {
    clickX = e.offsetX;
    clickY = e.offsetY;
    clickAlpha = 1;
  }
  ctx.beginPath();
  ctx.arc(clickX, clickY, clickBubbleRadius, 0, 2 * Math.PI);
  clickAlpha -= fadeOutRate;
  ctx.globalAlpha = clickAlpha >= 0 ? clickAlpha : 0;
  ctx.fillStyle = 'lightgreen';
  ctx.fill(); // fill the circle with the current fill color
  ctx.closePath();
}

canvas.addEventListener('click', (e) => {
  drawClickBubble(e);
  clickBall();
});

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI); // draw a circle with center at (25, 25) and radius of 25 pixels
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'red';
  ctx.fill(); // fill the circle with the current fill color
  ctx.closePath();
}

function calculateMovement() {
  if (energy > 0) {
    energy -= 0.01;
  }
  x += dx * energy;
  y += dy * energy;
  const outHorizontal = x <= 0 + ballRadius || x >= canvas.width - ballRadius;
  const outVertical = y <= 0 + ballRadius || y >= canvas.height - ballRadius;
  // flip direction if ball reaches edge of canvas
  if (outHorizontal && !isOutOfBounds) {
    dx = -dx;
  }
  if (outVertical && !isOutOfBounds) {
    dy = -dy;
  }
  if ((outHorizontal || outVertical) && !isOutOfBounds) {
    isOutOfBounds = true;
  } else {
    isOutOfBounds = false;
  }
}

function clickBall() {
  let clickToCircleX =
    clickX + clickBubbleRadius > x
      ? clickX - x
      : clickX + clickBubbleRadius - x;
  let clickToCircleY =
    clickY + clickBubbleRadius > y
      ? clickY - y
      : clickY + clickBubbleRadius - y;
  const distance = Math.sqrt(
    clickToCircleX * clickToCircleX + clickToCircleY * clickToCircleY
  ); 
  // sqrt(x1 * x2 + y1 * y2) - distance formula
  // console.log({
  //   clickToCircleX, clickToCircleY, distance
  // })
  if (distance > ballRadius) {
    return;
  }

  // - angle is north hemi, + angle is south hemi.
  let angle = Math.atan2(clickToCircleY, clickToCircleX);
  const half = Math.PI / 2;
  if (angle < 0) {
    angle = Math.abs(angle);
    if (angle < half) {
      const percent = angle / half;
      dx = -(clickEnergy * (1 - percent));
      dy = clickEnergy * percent;
    } else {
      const percent = (angle - half) / half;
      dx = clickEnergy * percent;
      dy = clickEnergy * (1 - percent);
    }
  } else {
    if (angle < half) {
      const percent = angle / half;
      dx = -(clickEnergy * (1 - percent));
      dy = -(clickEnergy * percent);
    } else {
      const percent = (angle - half) / half;
      dx = clickEnergy * percent;
      dy = -(clickEnergy * (1 - percent));
    }
  }
  energy = 1;
}

function animate() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawClickBubble();
  calculateMovement();

  requestAnimationFrame(animate);
}

animate();
