const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')


//canvas.width = screen.width*0.26;//360;
//canvas.height = screen.height*1.21;
canvas.width = canvas.clientWidth;//screen.width*0.2;//360;
canvas.height = canvas.clientHeight;//screen.height*1.7;

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

var scale = 0;
var trans_x = 0;
var trans_y = 0;
var color = '';

if (screen.width <= 2560 && screen.width > 1440) {
  scale = 14;
  trans_x = 1.5;
  trans_y = 50;
  var color = 'rgba(103, 189, 224, 0.1)';//'rgba(48, 48, 54, 0.05)';
}
if (screen.width <= 1440 && screen.width > 800) {
  scale = 10;
  trans_x = 1.5;
  trans_y = 5.5;
  var color = 'rgba(103, 189, 224, 0.1)';//'rgba(48, 48, 54, 0.05)';
}
else if (screen.width <= 800 && screen.width > 620) {
  scale = 10;
  trans_x = 2;
  trans_y = 8;
  color = 'rgba(103, 189, 224, 0.05)';
}
else if (screen.width <= 620 && screen.width > 374) {
  scale = 10;
  trans_x = 2;
  trans_y = 8;
  color = 'rgba(103, 189, 224, 0.05)';
}
else if (screen.width <= 374) {
  scale = 10;
  trans_x = 2;
  trans_y = 8;
  color = 'rgba(103, 189, 224, 0.025)';
}
ctx.translate(canvas.width/trans_x, canvas.height/trans_y);

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
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(particles[i].x*scale, particles[i].z*scale);
    particles[i].update();
    ctx.lineTo(particles[i].x*scale, particles[i].z*scale);
    ctx.stroke();
  }
  requestAnimationFrame(iterate);
}
iterate()
