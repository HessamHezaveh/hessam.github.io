class Obstacle{
    constructor(game, x){
        this.game=game;
        this.spriteWidth = 120;
        this.spriteHeight = 120
        //base width time game ratio
        this.scaledWidth = this.spriteWidth*this.game.ratio;
        this.scaledHeight= this.spriteHeight*this.game.ratio;
        //spaced out evenly
        this.x=x;
        //place at the center
        this.y=Math.random() * (this.game.height -this.scaledHeight);

        //colision
        //X,Y define a center point of collision 
        this.collisionX;
        this.collisionY;
        //collision circle radius
        this.collisionRadius= 50*this.game.ratio;


        //OBSTACLE UP AND DOWN MOVEMENT (simple 1 line if else statement>> if its less than 0.5 give this obstacle speed y -1 else give it speed y +1)
        this.speedY = Math.random() < .5 ? -1* this.game.ratio:1*this.game.ratio;
        // this.speedY = Math.random() < .5 ? -(1+this.game.score)* this.game.ratio:(1+this.game.score)*this.game.ratio;
        this.markedForDeletion = false;

        //obstacle image 
        this.image = document.getElementById('smallGears');

        this.frameX=Math.floor( Math.random()*4 );
       
    }
    update(){
        //obstacles appear static in the game world same speed value by game world speed 
        this.x -= this.game.speed;
        this.y += this.speedY;

        //make them move around with object 
        this.collisionX = this.x+(this.scaledWidth *0.5);
        this.collisionY = this.y+(this.scaledHeight *0.5);
        /**
         * do the same for paralex background
         */
        //for move up and down we need 2 boundry when it reach each of them switch the value
        if(!this.game.gameOver){
            if(this.y <=0 || this.y>= this.game.height - this.scaledHeight){
                this.speedY *=-1;
            }
        } else {
            this.speedY += 0.1;
        }

        //min50 recheck
        if(this.isOffScreen()){
            this.markedForDeletion = true;
            //filter the obstacles array and only include those obstacle object that have marked for deletion property set to false 
            this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion);
            if(!this.game.gameOver){
            this.game.score++    
            }
            
            // console.log(this.game.obstacles.length);
            if(this.game.obstacles.length <=0) {
                this.game.triggerGameOver();
                //this.game.sound.play(this.game.sound.win);
            };
        }
        //collision 
        if(this.game.checkCollision(this, this.game.player)){

            this.game.player.collided = true;
            //this.game.sound.play(this.game.sound.lose); // it has delay
            this.game.triggerGameOver();
            //
            this.game.player.stopCharge()
        }

    }
    draw(){
        // this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);

        this.game.ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight, this.x,this.y, this.scaledWidth, this.scaledHeight)

        //draw a circle on canvas we have to start by begin path
        this.game.ctx.beginPath();
        //0, Math.PI start angle and end angle full circle
        this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI*2)
        //it doesnt directly render anything on canvas so we have to call fill or stroke methods
        this.game.ctx.stroke();
       


    }
    resize(){
        this.scaledWidth = this.spriteWidth*this.game.ratio;
        this.scaledHeight= this.spriteHeight*this.game.ratio;

    }
    //check in multiple places around the code base it will check at first onle if the obstacle moved to the left far enough to touch the left edge of the game area and it will return true or false if is offscreen returns true we set marked for deletion to true , we want to remove the obstacle from the obstacles array and we want to give the player a score point for successfully avoiding it 
    isOffScreen(){
        return this.x < -this.scaledWidth || this.y>this.game.height;

    }

}