import Phaser from 'phaser';


const PIPES_TO_RENDER = 4;


class PlayScene extends Phaser.Scene {




    constructor(config) {
        
        super('PlayScene');

        this.config = config;

        this.bird = null;
        this.pipes = null;

        this.pipeHorizontalDistance = 0;
        this.pipeVerticalDistanceRange = [150, 250];
        this.pipeHorizontalDistanceRange = [500, 600];
        this.flapVelocity = 150;

    }





    preload(){
        this.load.image('sky', 'assets/sky.png');

        this.load.image('bird', 'assets/bird.png');

        this.load.image('pipe', 'assets/pipe.png');

    }




    create(){

        this.createBG();
        this.createBird();
        this.createPipes();
        this.handleInputs();
        
        
    }




    update() {

        if( this.bird.y > this.config.height || this.bird.y < -this.bird.height) {
            this.restartBirdPosition();
          }
        
          // recycles pipes in the group
          this.recyclePipes();


    }


    createBG() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }



    createBird() {
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
        this.bird.body.gravity.y = 400;
    }



    createPipes() {
        this.pipes = this.physics.add.group();
        
        
        // bird.body.velocity.x = VELOCITY;

        for(let i = 0; i < PIPES_TO_RENDER; i++) {

            // creates and adds to the group
            const upperPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0,1);
            const lowerPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0,0);

            

            this.placePipe(upperPipe, lowerPipe)

        }

        
        this.pipes.setVelocityX(-200);
    }





    handleInputs() {
        // pressing mouse button
        this.input.on('pointerdown', this.flap, this);


        // pressing space bar
        this.input.keyboard.on('keydown_SPACE', this.flap, this);
    }



    placePipe(uPipe, lPipe) {

        // pipeHorizontalDistance += 400;
        // pipeHorizontalDistance = getRightMostPipe();
    
        const rightMostX = this.getRightMostPipe();
    
        const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
        const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 -pipeVerticalDistance);
        
        const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);
    
    
    
    
        // upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0,1);
        // lowerPipe = this.physics.add.sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0,0);
      
        uPipe.x = rightMostX + pipeHorizontalDistance;
        uPipe.y = pipeVerticalPosition;
        
    
        lPipe.x = uPipe.x;
        lPipe.y = uPipe.y + pipeVerticalDistance;
        
    
        
    }



    // recycle pipes
    recyclePipes() {

        const tempPipes = [];
    
        this.pipes.getChildren().forEach(pipe => {
    
        if(pipe.getBounds().right <= 0){
            // get upper and lower pipe that are out of bounds
            tempPipes.push(pipe);
            if(tempPipes.length == 2) {
            this.placePipe(...tempPipes);
            }
    
            
        }
    
        })
    
    }



    
    // get right most pipe
    getRightMostPipe() {

        let rightMostX = 0;
    
        this.pipes.getChildren().forEach(function (pipe){
        rightMostX = Math.max(pipe.x, rightMostX);
        })
    
    
        return rightMostX;
    
    
    }
    
    
    
    
    
    
    
    // to make the bird flap
    flap() {
        this.bird.body.velocity.y = -this.flapVelocity;
    }
    
    
    
    
    // restart the bird position to the initial position
    restartBirdPosition() {
    
        this.bird.x = this.config.startPosition.x;
        this.bird.y = this.config.startPosition.y;
    
        this.bird.body.velocity.y = 0;
        
    
    }
        



    




}








export default PlayScene;