//particles
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

console.log("start")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray

//get mouse position
let mouse= {
    x: null,
    y: null,
    radius: (canvas.height/120) * (canvas.width/120)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }

);
//creat particle
class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //method to draw individual particle with arc method
    //Each particle will need  x and y coordinates, these are different and independent from mouse x and y coordinates so dont confuse the two.
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255,255,255,'+ 2/this.size +')';
        ctx.fill();
    }

    //check particle position, check mouse position, move the partocle, draw the particle

    update() {
        //check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        if (this.y > canvas.height || this.y <0){
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particle position
        //particle current position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }
        // move particle
        this.x += this.directionX/10;
        this.y += this.directionY/10;
        
        // draw particle
        this.draw();
    }
}
// create particle array, bigger canvas more particle 
function init() {
    particlesArray = [];
    //count
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for(let i = 0; i < numberOfParticles; i++){
        //size
        let size = (Math.random() * 30) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';


        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));

        console.log("init")
    }
}
// check if particles are close enough to draw line between them
function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
           // 7=>2
            if (distance < (canvas.width/1) * (canvas.height/3)) {
                //20000 => 10000
                opacityValue = 1 - (distance/15000);
                ctx.strokeStyle = 'rgba(255,255,255,'+ opacityValue/5 +')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }

        }
    }
}

// animation loop

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

//resize event
window.addEventListener('resize', 
    function(){
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
);

// mouse out event
window.addEventListener('mouseout' , 
    function(){
        mouse.x = undefined;
        mouse.x = undefined;
    }
);



init();
animate();