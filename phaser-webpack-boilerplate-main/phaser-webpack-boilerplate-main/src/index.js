import Phaser from 'phaser';




const config = {
  // webGL
  type: Phaser.AUTO,
  width: 800, 
  height: 600,
  physics: {
    // arcade physics plugin
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 },
    }
  },
  scene: {
    preload,
    create,
    update
  }
}




function preload() { 
  
  this.load.image('sky', 'assets/sky.png');

  this.load.image('bird', 'assets/bird.png');

  

}


const VELOCITY = 200;
const flapVelocity = 150;
const initialBirdPosition = { x: config.width / 16, y: config.height / 2 };
let bird = null;
let totalDelta = null;


function create() {

  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  
  // bird.body.velocity.x = VELOCITY;


  // pressing mouse button
  this.input.on('pointerdown', flap);


  // pressing space bar
  this.input.keyboard.on('keydown_SPACE',flap);
 
 
}







function update(time, delta) {

  if(bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }

  
}




// // if bird postion is small than 0 or greater than height of the canvas
// // restart the bird position to the initial position
// function update(time, delta) {

//   if(bird.y > config.height || bird.y < -bird.height) {
//     restartBirdPosition();
//   }

  
// }




// // move left and right 
// // comment out the gravity in physics
// // set bird.body.velocity.x to VELOCITY in the create function
// function update(time, delta) {

//   if(bird.x >= config.width - bird.width) {
//     bird.body.velocity.x = -VELOCITY;
//   } else if (bird.x <= 0) {
//     bird.body.velocity.x = VELOCITY;
//   }

// }




// to make the bird flap
function flap() {
  bird.body.velocity.y = -flapVelocity;
}




// restart the bird position to the initial position
function restartBirdPosition() {

  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;

  bird.body.velocity.y = 0;
  

}







new Phaser.Game(config);