//this will contain the player class
class Player {
    //this constructor will expect a reference point in to the main game object.
    constructor(game){
        //access all the usefull methods and properties that will be sitting on there on the main game class 
        //point to the memory where the main game object is stored 
        this.game= game;

        this.x = 20;
        this.y;
        //sprite sheet
        this.spriteWidth = 200;
        this.spriteHeight = 200;

        this.width;
        this.height;

        //add reality to gravity(helper property) initial speed
        this.speedY;
        this.flapSpeed;

        this.collisionX;
        this.collisionY;
        this.collisionRadius; 


        this.collided; //flag for signal 
        
        //for speed up ability
        this.energy = 100;
        this.maxEnergy = this.energy * 2;
        this.minEnergy = 15;

        this.barSize;
        this.charging;

        //Player animation
        this.image = document.getElementById('player_fish');

        this.frameY;

    }
    draw(){
        // this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        //(image, source X, source y, source width, source height, destination x, destination y, destination width and destination height) )
        // this.game.ctx.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(this.image, 0, this.frameY*this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        //collision
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.collisionX,this.collisionY, this.collisionRadius, 0, Math.PI*2)
        //this.game.ctx.stroke();
    }

    // for animate it 
    update(){
        if(this.game.startBtn){
            this.handleEnergy()
            if(this.speedY>=0) this.wingsUp();//when pleyer is moving down 
    
            this.y += this.speedY;
            this.collisionY = this.y + this.height * 0.5;
            //apply gravity here to touch the ground
            if (!this.isTouchingBottom() ){
                //pull it down by gavity force
                this.speedY +=this.game.gravity;
            } 

        }


        // if (!this.isTouchingBottom() && !this.charging){
        //     //pull it down by gavity force
        //     this.speedY +=this.game.gravity;
        // } else {this.speedY=0}



        //bottom boundary
        if (this.isTouchingBottom()){
            this.y = this.game.height - this.height;
            this.wingsIdle();
            //this.speedY -=this.game.gravity;
        }
        if(this.charging && !this.game.gameOver)this.speedY=0;




        //move 1 per animation methode 
        //this.x++;
        //this.y++;

        //console.log('1')
    }
    //give the player the custom resize method 

    resize(){
        this.width = this.spriteWidth*this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;

        //start from center
        this.y = this.game.height * 0.5 - this.height * 0.5;
        //initial jump speed 
        this.speedY =-6 * this.game.ratio;
        //jump speed
        this.flapSpeed =4*this.game.ratio;

        this.collisionRadius = 50*this.game.ratio;
        this.collisionX= this.x+ this.width * 0.5+30*this.game.ratio;
        // this.collisionY= this.y+ this.height * 0.5;
        this.collided = false;

        //His way
        //this.barSize = Math.ceil(5 * this.game.ratio);
        //every time we resize or reset frame reset to 0
        this.frameY = 0;
        this.charging = false;

    }
    //ability
    startCharge(){
      //flag
        if(this.energy> this.minEnergy && !this.game.gameOver && this.game.startBtn  ){
            this.charging=true
            this.game.speed = this.game.maxSpeed; 
            this.wingsCharge();
            // this.game.sound.charge.play();
            this.game.sound.play(this.game.sound.charge);
        }
        
   
    }
    stopCharge(){
        this.charging= false; //flag
        this.game.speed = this.game.minSpeed;
        
        //this.wingsIdle();
    }

    wingsIdle(){
        this.frameY=0
    }
    wingsDown(){
        if(!this.charging)this.frameY=1
    }
    wingsUp(){
        if(!this.charging) this.frameY=2
    }
    wingsCharge(){
        this.frameY=3
    }
    isTouchingTop(){
        return this.y <= 0;
    }

    isTouchingBottom(){
        return this.y>= this.game.height - this.height
    }
    handleEnergy(){
        //new 
        if(this.game.eventUpdate ){
            if(this.energy < this.maxEnergy){
                this.energy+=2;//sharj
            }
            if(this.charging && !this.game.gameOver){
                this.energy -=10; //masraf
                if(this.energy <=0){
                    this.energy = 0;
                    this.stopCharge()
                }
            }
        }
        //charging method (previus method)
        // if(this.energy < this.maxEnergy){
        //     this.energy+=0.1;
        // }
        // if(this.charging){
        //     this.energy -=1;
        //     if(this.energy <=0){
        //         this.energy = 0;
        //         this.stopCharge()
        //     }
        // }

        
    }
    //custome method for flap
    flap(){
        //this.stopCharge();
        if(!this.isTouchingTop()){
            this.speedY=-this.flapSpeed;

             //this.game.sound.play(this.game.sound.flapSounds[Math.floor(Math.random() * 5)]);
             this.game.sound.play(this.game.sound.flapSounds[3]);

            //this.wingsDown()
        }
        // this.speedY=-5;
    }


}