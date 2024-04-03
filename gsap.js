let width = window.innerWidth;
let height = window.innerHeight;

gsap.registerPlugin(ScrollTrigger);


ScrollTrigger.defaults({
  // toggleActions:"restart pause resume pause"
   toggleActions:"play none none reverse"
})
//eye
gsap.to('.img-container',{
  scale:52,
  ease:"ease",
  scrollTrigger:{
    trigger:'.video-section',
    scrub:3,
    // snap: 1/('.img-container'.length-1),
    start:"top top",
    end:"bottom",
    pin:true
  }
})


//dream
gsap.to('.t-right' ,{
  autoAlpha:0,
  x:500,
  duration:1.5,
  scrollTrigger:{
  start:1
  }
})

//reality
gsap.to('.t-left' ,{
  autoAlpha:0,
  x:-500,
  duration:1.5,
  scrollTrigger:{
  start:1
  }
})

//matne payini
gsap.to('.txt-bottom',{
  autoAlpha:0,
  letterSpacing:-3,
  duration:0.5,
  scrollTrigger:{
    
  start:1
  }
})



const tl = gsap.timeline();
//explore



//push part
//we say hide here

tl.from('.animation1 div, .animation1 img',{
  y:100,
  opacity:0,
  stagger:{
    amount:.4
  },
  
  duration:10,
  delay:0.5
})
tl.from('.animation2 div',{
  y:100,
  opacity:0,
  stagger:{
    amount:4
  },
  delay:.5
})

//t2//////////////////////////////////////////////////////////////////////



//explore
/*
tl.from('.text1 ',{
  y:150,
  opacity:0,
  // stagger:{
  //   amount:.4
  // },
  // duration:30,
  // delay:5
})*/

// tl.to('.text1',{
//   y:150,
//   opacity:0,
//   // stagger:{
//   //   amount:.4
//   // },
//   // duration:3,
//   // delay:.5
// })


/*
tl.from('.text2 ',{
  y:150,
  opacity:0,
  // stagger:{
  //   amount:.4
  // },
  // duration:30,
  // delay:5
})*/
// tl.to('.text2',{
//   y:150,
//   opacity:0,
//   // stagger:{
//   //   amount:0.4
//   // },
//   // duration:3,
//   // delay:.5
// })

/*tl.from('.text3',{
  y:150,
  opacity:0,

})
*/
// .to('.text3',{
//      y:15,
//      opacity:1,

//    })




ScrollTrigger.create({
  animation:tl,
  scrub:4,
  // markers:true,
  trigger:'.wrapper',
  start:"top top",
  
  end:`+=${height -500}`,
  //pin:true,
  ease:"ease",
  // duration:50
  // delay:50  
})

// if(){

// }else{

// }


 
