class Background{
    //expect the reference to the main game object
    constructor(game){
        this.game=game;

        this.image=document.getElementById('background');
        this.image2=document.getElementById('background2');
        this.image3=document.getElementById('background3');
        this.image4=document.getElementById('robo');
        //use the exact size:
        this.width = 2400;
        this.robotHeight;
        this.robotWiidth;
        this.height = this.game.baseHeight;
        //keep in mind image size should be equal to the canvas height
        //background will scrolling horizintaly (x)
        this.x;
        this.x2;
        this.x3;

    }
    update(){

        //make it move 

        this.x -= this.game.speed ;
        if(this.x<= -this.scaledWidth) this.x = 0;

        this.x2 -= this.game.speed * .3 ;
        if(this.x2<= -this.scaledWidth) this.x2 = 0;

        this.x3 -= this.game.speed * .1 ;
        if(this.x3<= -this.scaledWidth) this.x3 = 0;

    }
    draw(){
        this.game.ctx.drawImage(this.image3, this.x3, 0 , this.scaledWidth ,this.scaledHeight );
        this.game.ctx.drawImage(this.image3, this.x3 + this.scaledWidth-0.2, 0 , this.scaledWidth ,this.scaledHeight );

        if (this.game.canvas.width >= this.scaledWidth){
            this.game.ctx.drawImage(this.image3, this.x3+ this.scaledWidth*2-.1, 0 , this.scaledWidth ,this.scaledHeight );

        }
                //robot
         this.game.ctx.drawImage(this.image4, window.innerWidth/2,window.innerHeight-this.robotHeight,this.robotWiidth, this.robotHeight)




        //(image we want to draw, x and y coordinate where to draw it ,width and heigth)
        this.game.ctx.drawImage(this.image, this.x2, 0 , this.scaledWidth ,this.scaledHeight );
        this.game.ctx.drawImage(this.image, this.x2 + this.scaledWidth-.1, 0 , this.scaledWidth ,this.scaledHeight );
        
        if (this.game.canvas.width >= this.scaledWidth){
            this.game.ctx.drawImage(this.image, this.x2 + this.scaledWidth*2-0.1, 0 , this.scaledWidth ,this.scaledHeight );

        }







        this.game.ctx.drawImage(this.image2, this.x, 0 , this.scaledWidth ,this.scaledHeight );
        this.game.ctx.drawImage(this.image2, this.x + this.scaledWidth-0.5, 0 , this.scaledWidth ,this.scaledHeight );

        if (this.game.canvas.width >= this.scaledWidth){
            this.game.ctx.drawImage(this.image2, this.x* this.scaledWidth*2-1, 0, this.scaledWidth ,this.scaledHeight );

        }




        

    }
    resize(){

        this.robotHeight = window.innerHeight;
        this.robotWiidth= 0.82* this.robotHeight
        
        this.scaledWidth = this.width*this.game.ratio;
        this.scaledHeight = this.height*this.game.ratio;
        this.x=0;
        this.x2=0;
        this.x3=0;
        console.log("1")
        
    }
}