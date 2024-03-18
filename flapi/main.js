//brain of the game 
/**
 * we sstablished a two-way connection between game and player classes 
 */
//round by Math.ceil() or Math.floor()

class Game{
    constructor(canvas,context){
        this.canvas=canvas;
        //ref to drawing context
        this.ctx= context;
        this.width= this.canvas.width;
        this.height= this.canvas.height;
        //720 is the background image height
        this.baseHeight=720;
        //this allows us to play the sound all over the code base
        this.sound=new AudioControl()

        //fined the ratio between canvas(game area) size and base height (actual) 
        this.ratio = this.height/ this.baseHeight;
        // this.fpsratio = this.deltaTime/6;
        //we create an instance of the background class as this.background property==> pass this represent this gameclass
        this.background = new Background(this)
        //call player class here 
        //this in Player(this) represent this entire game obj
        // when we create an instance for a class using the new keyword like we are creating an instance of game it will automaticly run allthe code inside the constructor of that class 
        this.player = new Player(this);
        //helper holds currently active obstacles 
        this.obstacles = [];
        //
        this.numberOfObstacles=6;
        //define gravity here 1 pix per animation frame
        this.gravity;
        //speed
        this.speed;     
        //player speed
        this.minSpeed;
        this.maxSpeed;
        //define score here
        this.score;
        this.gameOver;
        this.timer;
        //win or lose message 
        this.message1;
        this.message2;
        //helper for changing frame base to time
        //event timer will be accumulating milliseconds from delta time until it reaches interval value then it will set event update to true and we will trigger all our periodic events we want to happen every 150 milliseconds 
        this.eventTimer=0;
        this.eventInterval = 150;//1000 = 1ps
        this.eventUpdate = false;
        //swipdetect
        this.touchStartX;
        this.swipeDistance = 50;
        this.startBtn= false;
        this.reset;
        this.button1 = document.getElementById('btn1');
        this.button1.onclick = function(){
            window.location.replace("https://hessamhezaveh.github.io/grid.html");
        }
        


        this.resize(window.innerWidth, window.innerHeight);
        
        //make this responsive (create an instance for size)
        window.addEventListener('resize', e=>{
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });

        //mouse controler
        this.canvas.addEventListener('mousedown', e =>{
            //call methode from player class
            this.player.flap();
            this.player.wingsDown()
            this.player.stopCharge();

        });
        this.canvas.addEventListener('mouseup', e =>{
            //call methode from player class

            this.player.wingsIdle()


        });

        //keyboard controler
        window.addEventListener('keydown', e =>{
        
            if (e.key===' '|| e.key === 'Enter'){
                this.player.wingsDown();
                this.player.flap();
            } 
            //speed up
            if(e.key==='Shift') {
               
                if(!this.player.charging){
                  this.player.startCharge();  

                } else{
                    this.player.stopCharge();
                }
                

            }
            else{
                this.player.stopCharge();
            }
            if(e.key.toLowerCase()==='c') {this.player.startCharge()} ;
            //if(e.key.toLowerCase()==='R') {location.reload();} ;
            if(e.key.toLowerCase()==='p') {window.location.replace("https://hessamhezaveh.github.io/grid.html")} ;
            if(e.key.toLowerCase()==='r') {this.reset()};
            if(e.key.toLowerCase()==='s') {this.startBtn= true;} ;


        });
        //method 2 for Charging



        window.addEventListener('keyup', e =>{
        
            //speed up
            if(e.key.toLowerCase()==='c') {this.player.stopCharge()} ;
            if (e.key===' '|| e.key === 'Enter'){
                this.player.wingsIdle();
                
            } 
        });

        this.canvas.addEventListener('touchstart', e=>{
            this.startBtn=true;
            this.player.flap();
            this.player.wingsDown();
            this.touchStartX = e.changedTouches[0].pageX;
            this.player.stopCharge();
            
        })
        this.canvas.addEventListener('touchstop', e=>{
            //  this.player.wingsIdle();

        })

        this.canvas.addEventListener('touchmove', e =>{
            if(e.changedTouches[0].pageX - this.touchStartX > this.swipeDistance){

                this.player.startCharge();
                // console.log("start")
                
            } else if(e.changedTouches[0].pageX - this.touchStartX < this.swipeDistance){
                this.player.stopCharge();
                if(this.gameOver){
                    this.reset();
                }

                
                // console.log("stop")
            }

        });

    }
    reset(){
        this.createObstacles()
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
        this.button1.style['display']='none';
    }


    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;

        if(window.innerWidth>=600){
           this.ctx.font = '40px Anta'  
        }else if(window.innerWidth<600){
           this.ctx.font = '25px Anta'  
        }
       
    
        this.ctx.textAlign = 'right'

        //collision line w
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'white';


        this.width = this.canvas.width;
        this.height = this.canvas.height;

       // this.ctx.fillStyle='blue';
        //dynamice height
        this.ratio = this.height/ this.baseHeight

        //we need to scale the gravity 
        this.gravity = .1 * this.ratio;
        //speed
        this.speed = 1 * this.ratio;
        //player speed
        this.minSpeed = this.speed;
        this.maxSpeed = this.speed * 5;

        //resize the background
        this.background.resize();

        //call player resize as well
        this.player.resize();
        // console.log(this.height, this.baseHeight, this.ratio)

        this.createObstacles()
        this.obstacles.forEach(obstacle =>{
            obstacle.resize();
        });
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;

    }
    //we will draw all game objects from costom methode on the game class 
    render(deltaTime){
        
        //background
        if (!this.gameOver && this.startBtn) this.timer += deltaTime;
        this.handlePeriodicEvents(deltaTime);
        this.background.update();
        this.background.draw();

        this.drawStatusText();

        //animate 
        this.player.update();
        this.player.draw();
        if(this.startBtn){
            this.obstacles.forEach(obstacle =>{
                obstacle.update();
                obstacle.draw();
            });

        }


        
  

    }
    //when this method runs it will set this.obstacles to an empty array
    createObstacles(){
        this.obstacles=[];
        //horizontal position of first obstacle
        const firstX =this.baseHeight * this.ratio;
        //the left margin space between the obstcles 
        const obstacleSpacing = 600* this.ratio;
        //based on numbers that we set before

        for (let i = 0; i<this.numberOfObstacles; i++){
            //array push method is java script will take whatever we pass to it and it will add it to end of the array
            //each obstacle object expects a game reference and horizontal x position 
            this.obstacles.push(new Obstacle(this, firstX + i*obstacleSpacing))
            
        }



    }


    checkCollision(a,b){
        //we have to measure the distance between their two Center points to get a distance between two points in 2d 

        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;

        //hypotenuse
        // const distance = Math.sqrt(dx * dx + dy * dy);
        const distance = Math.hypot(dx,dy);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        
        return distance <= sumOfRadii;
    }
    formatTimer(){
        //toFixed method display howmuch number after decimal point 
        return (this.timer*0.001).toFixed(1);
    }
    //this method basically set event update to true every 150 milli seconds 

    //this event basically set  event update to true every 150ms
    handlePeriodicEvents(deltaTime){
        if(this.eventTimer < this.eventInterval){
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else{
            this.eventTimer = this.eventTimer%this.eventInterval ;//0 is not accurate 
            //^ it returns the remainder left over when one operand divided by second operand 
            this.eventUpdate= true;
           // console.log(this.eventTimer)
           // console.log(deltaTime)// /6
           //console.log(fpsratio)

        }


    }
    triggerGameOver(){
        if(!this.gameOver){
            this.gameOver=true;


            if(this.obstacles.length<=0){

                this.sound.play(this.sound.win)
                this.message1="Well Done little Soul!"
                this.message2= this.formatTimer() + ' seconds, not bad! now you have access to the page. '
                this.button1.style['display']='block';

            } else {
 
                this.sound.play(this.sound.lose)
                this.message1="Getting rusty?";
                this.message2="Collision time " + this.formatTimer() + ' seconds!';
                this.button1.style['display']='none';
            }
        }
    }
    //messages
    drawStatusText(){
        //wrapping something between save and restore which is a canvas method limit any changes we make here to canvas state to the area between these two lines of code.   
        this.ctx.save();
        this.ctx.fillText('Score:' + this.score, this.width-50 , 70);
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Timer:' + this.formatTimer(), 50, 70);
        if(!this.startBtn){
            this.ctx.textAlign = 'center';
            this.ctx.fillText("press [S] to Start!" , this.width *.5 , this.height*0.85) ;
        }

        if (this.gameOver){
            this.ctx.textAlign = 'center';
            
            if(window.innerWidth>=700){
                this.ctx.font = '50px Anta'  
             }else if(window.innerWidth<700){
                this.ctx.font = '30px Anta'  
             }


            this.ctx.fillText(this.message1 , this.width *0.5 , this.height*0.5-40);
            if(window.innerWidth>=700){
                this.ctx.font = '40px Anta'  
             }else if(window.innerWidth<700){
                this.ctx.font = '25px Anta'  
             }

            this.ctx.fillText(this.message2 , this.width *0.5 , this.height*0.5+40);
            
            this.ctx.fillText("press [R] or swipe left to refresh the game!" , this.width *0.5 , this.height*0.5+90);
        }

        //energy allert
        if( this.player.energy <=this.player.minEnergy)this.ctx.fillStyle = 'red';
        else if (this.player.energy >= this.player.maxEnergy)this.ctx.fillStyle='green'
        //display the energy : for each energy point create a rectangle

        for (let i=0; i<this.player.energy; i++){
            //this.ctx.fillRect(10+i*10,90,8,30);
            //hisway
            //this.ctx.fillRect(10,this.height - 10 - this.player.barSize * i, this.player.barSize * 5, this.player.barSize)
            //my way
            this.ctx.fillRect(1, this.height -i/200*this.height ,15,-this.height/300);
        }
        for (let i = 0; i<this.player.energy; i++){
 
  
        }
        this.ctx.restore();
    }

}
//run after fully load 
window. addEventListener('load',function(){
    //setup project here 
    //1.we create a variable pointing towards the actual HTML canvas element we created

    const canvas = document.getElementById('canvas1');
    //2. then we take that canvas variable and call built-in "getContext" method
    //"getContext" method creates a so called Drawing Context, which is basically a built in JS interface that contains all drawing methods and properties we will need, it expect at least one argument so-scalled CONTEXT TYPE (2d OR webgl)

    const ctx = canvas.getContext('2d');
    //3.Set width and height of canvas properties 
    //using these properties is correct the way how we should resize your canvas not in css****** 
    /*********
    *html canvas has 2 sizes  
    1. element size 
    2. drawing surface size 
    */
    canvas.width=720;
    canvas.height=720;
    
    //4. we use ctx variable to draw any thing we want 

    //5.we need to call render method  and it will try to find its Constructor method it will run all the code inside the constructor line by line from top to btm 
    //it expect two variable that we call them from priveus lines(canvas, ctx) 

    const game= new Game(canvas, ctx);

    //helper variable= will store the value of the tim stamp from the previous animation 
    //we will using builtin request animation frame method which autogenerates time stamps for us, it passes that time stamp value to the method it calles ==> animate(timeStamp)
    // we use this technique for regularly repeating events  
    let lastTime = 0;

    //now able to draw shapes from inside the game calss we can test if it works by taking this new game variable which holds an instance of the entire game class and from there we call render
    //game.render();

    // for animate we need to create a costom method to update all game objects over and over 
    function animate(timeStamp){
        //we shode use delta time if we have timeStamp
        const deltaTime = timeStamp - lastTime; // this tells us how many milliseconds it took our computer to generate this animation frame 
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.render(deltaTime);
        
        // if(!game.gameOver) 
        
        requestAnimationFrame(animate);
    }

       requestAnimationFrame(animate);  

    
});