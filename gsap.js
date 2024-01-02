gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions:"play none none reverse"
})
//eye
gsap.to('.img-container',{
  scale:52,
  ease:"ease",
  scrollTrigger:{
    trigger:'.video-section',
    scrub:3,
    snap: 1/('.img-container'.length -1),
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

gsap.to('.txt-bottom',{
  autoAlpha:0,
  letterSpacing:-3,
  duration:0.5,
  scrollTrigger:{
    //2
  start:1
  }
})

const tl = gsap.timeline();
//explore
/*
tl.from('.right-side div',{
  y:15,
  opacity:0,
  stagger:{
    amount:.4
  },
  delay:.5
})*/

//push part

tl.from('.left-side div',{
  y:15,
  opacity:0,
  stagger:{
    amount:.4
  },
  delay:.5
})

//explore
tl.from('.right-side',{
  y:15,
  opacity:0,
  stagger:{
    amount:.4
  },
  delay:.5
})




ScrollTrigger.create({
  animation:tl,
  trigger:'.wrapper',
  start:"top top",
  end:"+=800",
  scrub:3,
  //pin:true,
  ease:"ease",
  delay:.5  
})

const timeline = gsap.timeline();

timeline.from('.title span' ,{
  y:15,
  skewY:5,
  duration:3
}).from('.txt-bottom',{
  letterSpacing:-10,
  opacity:0,
  duration:3
})
