
const track = document.getElementById("image-track")

window.handleOnDown = e => {track.dataset.mouseDownAt = e.clientX;}

window.handleOnUp = () => {    
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.handleOnMove= e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta= window.innerWidth/2;

    const percentage = (mouseDelta/maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });

   for(const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `center ${-nextPercentage/2}% `
        }, { duration: 1200, fill: "forwards" });
    }
     /*
    for(const image of track.getElementsByClassName("image")) {
        image.computedStyleMap.objectPosition = `${nextPercentage + 100} 50%`;
    }*/
}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
