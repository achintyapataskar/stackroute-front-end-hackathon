
var transitionSpeed = .5;

var easing = Power1.easeOut;


var startTime;

var tl;


function init() {

    startTime = new Date();

    tl = new TimelineMax({onComplete:endTime});

    addListeners();
    animate1();

}


function animate1(){

    tl.set(["#main_content"], {autoAlpha:1});

    tl.to(["#whiteFader"], .25, {autoAlpha:1,force3D:true, ease:Power1.easeOut, delay:4});

    tl.to(["#bg2","#c1"], transitionSpeed, {autoAlpha:1,force3D:true, ease:Power1.easeIn}, "-=0");

    tl.to(["#c1"], transitionSpeed, {autoAlpha:0,force3D:true, ease:easing, delay:2.5});

    tl.to(["#c2","#c3", "#arrow"], transitionSpeed, {autoAlpha:1,force3D:true, ease:easing, delay:.5});

}

function addListeners() {
    document.getElementById('default_exit').addEventListener("mouseover", cta_Over);
    document.getElementById('default_exit').addEventListener("mouseout", cta_Out);
}

function cta_Over(){
    TweenMax.to( "#arrow", 0.2, { x:5, ease: Power1.easeInOut});
}

function cta_Out(){
    TweenMax.to( "#arrow", 0.2, { x:0, ease: Power1.easeInOut});
}

// End timer

function endTime(){

    var endTime = new Date()
    console.log("Animation duration: " + ((endTime - startTime) / 1000) + " seconds");

}
