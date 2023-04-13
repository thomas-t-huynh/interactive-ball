const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

ctx.beginPath(); // start a new path
const ballRadius = 12;
const clickBubbleRadius = 4;
// set ball in middle;
let x = canvas.width / 2;
let y = canvas.height / 2;

let clickX = 0;
let clickY = 0;

// initial velocity
let dx = 2;
let dy = -2;
let energy = 1;

function drawClickBubble(e) {
  if (e) {
    clickX = e.offsetX;
    clickY = e.offsetY;
  }
  ctx.beginPath();
  ctx.arc(clickX, clickY, clickBubbleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "pink";
  ctx.fill(); // fill the circle with the current fill color
  ctx.closePath();
}

canvas.addEventListener("click", drawClickBubble);

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI); // draw a circle with center at (25, 25) and radius of 25 pixels
  ctx.fillStyle = "red";
  ctx.fill(); // fill the circle with the current fill color
  ctx.closePath();
}

function calculateMovement() {
  // flip direction if ball reaches edge of canvas
  if (energy > 0) {
    energy -= 0.01;
  }
  x += dx * energy;
  y += dy * energy;
  if (x < 0 + ballRadius || x > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y < 0 + ballRadius || y > canvas.height - ballRadius) {
    dy = -dy;
  }
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
