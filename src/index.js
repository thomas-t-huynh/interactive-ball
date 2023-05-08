// TODO - Refactor. Create classes for each drawn object.
import { Ball } from './Object/Ball';
import { ClickBubble } from './Object/ClickBubble';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball({
  x: canvas.width / 2,
  y: canvas.width / 2,
  dx: 0,
  dy: 0,
  maxEnergy: 1,
  radius: 12,
  fillStyle: 'red',
  canvas,
});

const clickBubble = new ClickBubble({
  canvas,
  energy: 6,
  fadeOutRate: 0.03,
  fillStyle: 'lightgreen',
  radius: 6,
});

canvas.addEventListener('click', (e) => {
  clickBubble.draw(e);
  clickBubble.clickBall(ball);
});

function animate() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw();
  clickBubble.draw();

  requestAnimationFrame(animate);
}

animate();
