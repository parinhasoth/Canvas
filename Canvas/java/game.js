var canvas=document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

document.body.appendChild(canvas);
canvas.width=510;
canvas.height=400;
var sideLenght=50;


// Load the background image
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
  // show the background image
  backgroundReady = true;
};
backgroundImage.src = "../assets/images/background.png"
var airplaneReady = false;
var airplaneImage = new Image();
airplaneImage.onload = function () {
  // show the here image
  airplaneReady = true;
};
airplaneImage.src = "../assets/images/airplane.jpg"
// Load the bird image
var birdReady = false;
var birdImage = new Image();
birdImage.onload = function () {
  // show the bird image
  birdReady = true;
};
birdImage.src = "../assets/images/bird.jpg"
// Create the game objects
var airplane = {
  speed: 230 // movement speed of airplane in pixels per second
};
var bird = {};
var birdKill = 0;


// Handle keyboard controls
var keysDown = {};

// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);

// Reset the player and bird positions when player catches a bird
var reset = function () {
  // Reset player's position to centre of canvas
  airplane.x = canvas.width / 3;
  airplane.y = canvas.height / 3;

  // Place the bird somewhere on the canvas randomly
  bird.x = 32 + (Math.random() * (canvas.width - 64));
  bird.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects - change player position based on key pressed
var update = function (modifier) {
  if (38 in keysDown) { // Player is holding up key
    airplane.y -= airplane.speed * modifier;
   
  }
  if (40 in keysDown) { // Player is holding down key
    airplane.y += airplane.speed * modifier;
 
  }
  if (37 in keysDown) { // Player is holding left key
    airplane.x -= airplane.speed * modifier;
    
  }
  if (39 in keysDown) { // Player is holding right key
    airplane.x += airplane.speed * modifier;
   
  }


   // keep the square within the border
   if(airplane.y + sideLenght > canvas.height) {
    airplane.y = canvas.height - sideLenght;
  }
    if(airplane.x + sideLenght > canvas.width) {
    airplane.x = canvas.width - sideLenght;
  }
  if(airplane.y + sideLenght > canvas.height) {
    airplane.y = canvas.height - sideLenght;
  }
  if(airplane.x + sideLenght > canvas.width) {
    airplane.x = canvas.width - sideLenght;
  }

  if (airplane.y < 0) {
    airplane.y = 0;
  }
  if(airplane.x < 0) {
    airplane.x = 0;
  }

  // Check if player and bird collider
  if (
    airplane.x <= (bird.x + 64)
    && bird.x <= (airplane.x + 64)
    && airplane.y <= (bird.y + 64)
    && bird.y <= (airplane.y + 64)
  ) {
    ++birdKill;
    reset();
  }


  /*// keep the square within the border
  if(airplane.y + sideLenght > canvas.height) {
    airplane.y = canvas.height - sideLenght;
  }
  if(airplane.x + sideLenght > canvas.width) {
    airplane.x = canvas.width - sideLenght;
  }
  if (airplane.y < 0) {
    airplane.y = 0;
  }
  if(airplane.x < 0) {
    airplane.x = 0;
  }*/

};
// Draw everything on the canvas
var render = function () {

    
  
  if (backgroundReady) {
    ctx.drawImage(backgroundImage, 0,0);

  }
  if (airplaneReady) {
    ctx.drawImage(airplaneImage, airplane.x, airplane.y);
  }
  if (birdReady) {
    ctx.drawImage(birdImage, bird.x, bird.y);
  }

  // Display score and time 
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Time New Roman";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("You had killed: " + birdKill, 19, 20);
  ctx.fillText("Time: " + count, 20, 50);

  // Display game over message when timer finished
  if(finished==true){
    ctx.fillText("Game over!", 200, 220);
  }
}

var count = 20; // how many seconds the game lasts for - default 20
var finished = false;

var counter =function(){
  count=count-1; // countown by 1 every second
  // when count reaches 0 clear the timer, hide bird and
  // airplane and finish the game
    if (count <= 0)
    {
      // stop the timer
       clearInterval(counter);

       // set game to finished
       finished = true;

       count=0;
       // hider bird and airplane
       birdReady=false;
       airplaneReady=false;
    }
}
// timer interval is every second (1000ms)
setInterval(counter, 1000);

// The main game loop
var main = function () {
  // run the update function
  update(0.02); // do not change
  // run the render function
  render();
  // Request to do this again ASAP
  requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!

reset();
main();