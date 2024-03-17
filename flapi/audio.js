class AudioControl{
    constructor(){
        this.charge = document.getElementById('charge');

        this.flap1 = document.getElementById('flap1');
        this.flap2 = document.getElementById('flap2');
        this.flap3 = document.getElementById('flap3');
        this.flap4 = document.getElementById('flap4');

        this.flapSounds = [this.flap1, this.flap2, this.flap3, this.flap4];
        this.flaprand = this.flapSounds[Math.floor(Math.random() * 5)];





        this.lose = document.getElementById('lose');
        this.win = document.getElementById('win');

    }
    //for managing the sound play we will create a custom method 
    play(sound){

        sound.currentTime = 0;
        sound.play();
      

    };

    
}