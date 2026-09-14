console.log('The Matures loaded');


const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("#menu");


hamburger.addEventListener("click", function(){

    menu.classList.toggle("active");

    console.log(menu.classList);

});



const menuLinks = document.querySelectorAll("#menu a");


menuLinks.forEach(function(link){

    link.addEventListener("click", function(){

        menu.classList.remove("active");

    });

});



window.addEventListener("resize", function(){

    if(window.innerWidth > 700){

        menu.classList.remove("active");

    }

});
document.addEventListener("click", function(event){

    if(
        !menu.contains(event.target) &&
        !hamburger.contains(event.target)
    ){

        menu.classList.remove("active");

    }

});
const reveals = document.querySelectorAll(".reveal");


window.addEventListener("scroll", function(){

    reveals.forEach(function(element){

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 100;


        if(elementTop < windowHeight - revealPoint){

            element.classList.add("active");

        }

    });

});
const header = document.querySelector(".header");


window.addEventListener("scroll", function(){

    if(window.scrollY > 50){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});
const homeLink = document.querySelector('nav a[href="/"]');


homeLink.addEventListener("click", function(event){

    event.preventDefault();


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


    history.replaceState(null, null, location.pathname);

});