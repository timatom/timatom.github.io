/**
 * Just a very basic vector
 */
function Vector(x, y) {
  this.x = x ? x : 0;
  this.y = y ? y : 0;

  this.add = function(x, y) {
    if (x instanceof Vector) {
      this.x += x.x;
      this.y += x.y;

      return this;
    }

    this.x += x;
    this.y += y;

    return this;
  }

  this.subtract = function(x, y) {
    if (x instanceof Vector) {
      this.x -= x.x;
      this.y -= x.y;

      return this;
    }

    this.x -= x;
    this.y -= y;

    return this;
  }

  this.multiply = function(x, y) {
    if (x instanceof Vector) {
      this.x *= x.x;
      this.y *= x.y;

      return this;
    }

    this.x *= x;
    this.y *= y;

    return this;
  }

  this.divide = function(x, y) {
    if (x instanceof Vector) {
      this.x /= x.x;
      this.y /= x.y;

      return this;
    }

    this.x /= x;
    this.y /= y;

    return this;
  }

  this.normalize = function() {
    return this.magnitude() === 0 ? this : this.divide(this.magnitude(), this.magnitude());
  }

  this.magnitude = function() {
    return Math.sqrt(this.magnitudeSquared());
  }

  this.setMagnitude = function(val) {
    return this.normalize().multiply(val, val);
  }

  this.magnitudeSquared = function() {
    var x = this.x, y = this.y;

    return (x * x + y * y);
  }
}

function Attractor(x, y) {
  this.position = new Vector(x, y);
  this.G = 10;
}

function Particle(x, y) {
  this.position = new Vector(x, y);
  this.velocity = new Vector(randMinus(0.2), randMinus(0.2));
  this.acceleration = new Vector();
  this.size = 1;

  this.attract = function(attractor) {
    var force = new Vector(attractor.position.x, attractor.position.y);
    force = force.subtract(this.position);

    var dsquared = force.magnitudeSquared();
    dsquared = Math.max(Math.min(dsquared, 500), 25);

    var strength = attractor.G / dsquared;
    force.setMagnitude(strength);

    this.acceleration = force;
  }

  this.update = function() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }

  this.draw = function(context) {
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}

function randMinus(num) {
  if (Math.random() > 0.5) {
    return -num;
  }

  return num;
}

(function(){
  var canvas = document.getElementById('c'),
      ctx = canvas.getContext('2d'),
      w = canvas.width = 400;//window.innerWidth,
      h = canvas.height = 800;//window.innerHeight,
      density = 1,
      attractors = [],
      particles = [];

  function setup()
  {
    window.addEventListener('resize', resize);

    density = window.devicePixelRatio != undefined ? window.devicePixelRatio : 1.0;

    canvas.width = w * density;
		canvas.height = h * density;

		ctx.scale(density,density);

    var size = Math.min(w, h) / 5;

    for (var i = 0; i < 750; i++) {
      var x = Math.sin(i) * size;
      var y = Math.cos(i) * size;

      particles.push(new Particle((w / 3) + x, (h/2) + y));
    }

    var middle = new Attractor(w/2, h/2);
    middle.G = 5;

    //var left = new Attractor(w/3, h/2);
    //left.G = 5;

    //var right = new Attractor((w/3)*2, h/2);
    //right.G = 10;

    attractors.push(middle);

    //attractors.push(right);
    //attractors.push(left);

    draw();
  }

  function draw()
  {
    ctx.fillStyle = 'rgba(12, 50, 80, 0.05)';

    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];

      for (var n = 0; n < attractors.length; n++) {
        particle.attract(attractors[n]);
      }

      particle.update();
      particle.draw(ctx);
    }

    window.requestAnimationFrame(draw);
  }

  function resize()
  {
    w = canvas.width = 400;//window.innerWidth;
    h = canvas.height = 800;//window.innerHeight;

    canvas.width = w * density;
		canvas.height = h * density;

    ctx.scale(density, density);
  }

  setup();
})();
