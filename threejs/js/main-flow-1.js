// This script simulates incompressible fluid flow across a cylinder.
(function(w) {

    var canvas, ctx;

    /*
    These are the variable definitions for the values that will be used
    throughout the rest of the script.
    */
    var canvas_width = 400; //Needs to be a multiple of the resolution value below.
    var canvas_height = 800; //This too.

    var part_num = 10;

    var vec_cells = []; //The array that will contain the grid cells
    var particles = []; //The array that will contain the particles
    var cylinder = {
          radius: 60,
          x: canvas_width/2,
          y: canvas_height/2
        };

    //////////////////////////////////////////////////////////////////////////
    // This section of code is for coordinate translations and conversions. //
    //////////////////////////////////////////////////////////////////////////
    // This function translates the cartesian coordinate system based on    //
    // a screens pixels to one centered at the cylinder's center.           //
    // Note: This function rotates the cartesian clockwise by 90 degrees.   //
    //////////////////////////////////////////////////////////////////////////
    function cartesian_translation_cyl(x, y)
    {
      return [y - cylinder.y, x - cylinder.x];
    }

    ///////////////////////////////////////////////////////////////////////////
    // This section involves calculating the velocity of every particle     //
    // based on its location within the canvas.                             //
    //////////////////////////////////////////////////////////////////////////
    function calc_vel(par)
    {
      var u = part_num*0.6; // Uniform flow.

      // calculating cartesian coordinate velocity of the particle.
      var xv_c = u*(1 - Math.pow(cylinder.radius,2)*((Math.pow(par.x_c,2)-Math.pow(par.y_c,2))/(Math.pow(Math.pow(par.x_c,2)+Math.pow(par.y_c,2),2))));
      var yv_c = -u*(Math.pow(cylinder.radius,2)*2*((par.x_c*par.y_c)/(Math.pow(Math.pow(par.x_c,2)+Math.pow(par.y_c,2),2))));

      return [xv_c, yv_c];
    }

    //This function is used to create a particle object.
    function particle(x, y)
    {
        // Note: (x, y) is the new coordinate and (px,py) is the previous coordinate.
        this.x = this.px = x;
        this.y = this.py = y;

        // translate and rotate coordinates.
        cyl_coor = cartesian_translation_cyl(x, y);
        this.x_c = cyl_coor[0];
        this.y_c = cyl_coor[1];

        // Setting the default horizontal and vertical velocities.
        this.xv = 0;
        this.yv = 0;
    }

    function gen_rand_particles()
    {
      /*
      This loop begins at zero and counts up to the defined number of particles,
      less one, because array elements are numbered beginning at zero.
      */
      for (i = 0; i < part_num; i++) {
          /*
          This calls the function particle() with random X and Y values. It then
          takes the returned object and pushes it into the particles array at the
          end.
          */
          particles.push(new particle(Math.random()*2 + (canvas_width*0.95), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.9), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.85), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.8), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.75), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.7), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.65), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.6), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.55), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.4975), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.45), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.4), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.35), Math.random()*10));
          particles.push(new particle(Math.random()*2 +  (canvas_width*0.3), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.25), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.2), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.15), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.1), Math.random()*10));
          particles.push(new particle(Math.random()*2 + (canvas_width*0.05), Math.random()*10));
        }
    }


    /*
    This is the main function. It is triggered to start the process of constructing the
    the grid and creating the particles, attaching event handlers, and starting the
    animation loop.
    */
    function init() {

        //These lines get the canvas DOM element and canvas context, respectively.
        canvas = document.getElementById("c-1");
        ctx = canvas.getContext("2d");

        //These two set the width and height of the canvas to the defined values.
        canvas.width = canvas_width;
        canvas.height = canvas_height;

        gen_rand_particles();

        //When the page is finished loading, run the draw() function.
        w.onload = draw;

    }


    /*
    This function updates the position of the particles according to the velocity
    of the cells underneath, and also draws them to the canvas.
    */
    function update_particle() {

        //Loops through all of the particles in the array
        for (i = 0; i < particles.length; i++)
        {

            //Sets this variable to the current particle so we can refer to the particle easier.
            var p = particles[i];

            //If the particle's X and Y coordinates are within the bounds of the canvas...
            if (p.x >= 0 && p.y >= 0 && p.y < canvas_height) {

                // Calculating the cartesian coordinate velocity of the particle.
                vels = calc_vel(p);
                p.xv = vels[1]; // Velocity of translated y is x.
                p.yv = vels[0]; // Velocity of translated x is y.

                //This adds the calculated velocity to the position coordinates of the particle.
                p.x += p.xv;
                p.y += p.yv;

                // translate and rotate coordinates.
                cyl_coor = cartesian_translation_cyl(p.x, p.y);
                p.x_c = cyl_coor[0];
                p.y_c = cyl_coor[1];

                //This line generates a random value between 0 and 0.5
                var limit = Math.random() * 0.5;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);

                /*
                Describe a line from the particle's current coordinates to those same coordinates
                plus the random value. This is what creates the shimmering effect while the particles
                aren't moving.
                */
                ctx.lineTo(p.x + limit, p.y + limit);
                ctx.stroke();

                //This updates the previous X and Y coordinates of the particle to the new ones for the next loop.
                p.px = p.x;
                p.py = p.y;
            }
            //else {
                //If the particle's Y coordinates are outside the bounds of the canvas...

            //    p.y = p.py = Math.random()*3;// + canvas_height*0.995;

                //Reset the particle's velocities.
            //    p.xv = 0;
            //    p.yv = 0;
            //}
        }
        gen_rand_particles();
    }

    /*
    The following helps handle the css color defined in a .css file
    This will help with handling such things as dynamic changes in
    color.
    */

    function colorFromCSSClass(className)
    {
      var tmp = document.createElement("div"), color;
      tmp.style.cssText = "position:fixed;left:-100px;top:-100px;width:1px;height:1px";
      tmp.className = className;
      document.body.appendChild(tmp);  // required in some browsers
      color = getComputedStyle(tmp).getPropertyValue("color");
      document.body.removeChild(tmp);
      return color
    }


    /*
    This is the main animation loop. It is run once from the init() function when the page is fully loaded and
    uses RequestAnimationFrame to run itself again and again.
    */
    function draw() {

        /*
        This line clears the canvas. It needs to be cleared every time a new frame is drawn
        so the particles move. Otherwise, the particles would just look like long curvy lines.
        */
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //This sets the color to draw with.
        ctx.strokeStyle = colorFromCSSClass("strokeStyle");//'rgba(255, 255, 255, 0.8)';//"#ffffff";
        ctx.lineWidth = 1;

        //This calls the function to update the particle positions.
        update_particle();

        //This requests the next animation frame which runs the draw() function again.
        requestAnimationFrame(draw);

    }

    /*
    And this line attaches an object called "Fluid" to the global scope. "window" was passed into
    the self-invoking function as "w", so setting "w.Fluid" adds it to "window".
    */
    w.Fluid = {
        initialize: init
    }

}(window)); //Passes "window" into the self-invoking function.


/*
Request animation frame polyfill. This enables you to use "requestAnimationFrame"
regardless of the browser the script is running in.
*/
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;


//And this line calls the init() function defined above to start the script.
Fluid.initialize();
