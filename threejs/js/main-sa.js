const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

canvas.width = 400;
canvas.height = 700;

const resizeCanvas = (canvas) =>
{
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  if (canvas.width != w || canvas.height != h) {
    canvas.width = w
    canvas.height = h
  }
}
resizeCanvas(canvas)

ctx.translate(canvas.width / 2.0, canvas.height/8);
ctx.globalCompositeOperation = 'lighter'
ctx.lineWidth = 1

function Particle(x, y, z)
{
  this.x = x ? x : 0;
  this.y = y ? y : 0;
  this.z = z ? z : 0;

  this.update = function()
  {
    var lorenz = new Lorenz(this.x, this.y, this.z);

    this.x += lorenz.dx;
    this.y += lorenz.dy;
    this.z += lorenz.dz;
  }
}

particles = [];

for(var i = 0; i < 10; i++)
{
  particles.push(new Particle(Math.random()*10, Math.random()*10, Math.random()*10));
}

let scale = 10

function Lorenz(x, y, z)
{
  const dt = 0.006;
  const a = 20
  const b = 8/3
  const c = 28

  this.dx = (a * (y - x)) * dt;
  this.dy = (x * (c - z) - y) * dt;
  this.dz = (x * y - b * z) * dt;
}

const iterate = (time) =>
{
  for(var i = 0; i < particles.length; i++)
  {
    ctx.strokeStyle = 'rgba(48, 48, 54, 0.05)';
    ctx.beginPath();
    ctx.moveTo(particles[i].x*scale, particles[i].z*scale);
    particles[i].update();
    ctx.lineTo(particles[i].x*scale, particles[i].z*scale);
    ctx.stroke();
  }
  requestAnimationFrame(iterate);
}
iterate()
