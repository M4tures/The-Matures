console.log('The Matures loaded');

if(window.location.hash){

    history.replaceState(
        null,
        null,
        window.location.pathname
    );

}

if(history.scrollRestoration){

    history.scrollRestoration = "manual";

}


window.scrollTo(0,0);

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("#menu");


if(hamburger && menu){

    hamburger.addEventListener("click", function(){

        menu.classList.toggle("active");

        console.log(menu.classList);

    });

}



const menuLinks = document.querySelectorAll("#menu a");


if(menu){

    menuLinks.forEach(function(link){

        link.addEventListener("click", function(){

            menu.classList.remove("active");

        });

    });

}



window.addEventListener("resize", function(){

    if(menu && window.innerWidth > 700){

        menu.classList.remove("active");

    }

});
document.addEventListener("click", function(event){

    if(menu && hamburger){

        if(
            !menu.contains(event.target) &&
            !hamburger.contains(event.target)
        ){

            menu.classList.remove("active");

        }

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


if(homeLink){

    homeLink.addEventListener("click", function(event){

        event.preventDefault();


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


        history.replaceState(
            null,
            null,
            window.location.pathname
        );

    });

}

// PRODUCT COLOR SWITCH

const productImage = document.querySelector("#product-image");
const productEdition = document.querySelector("#product-edition");

const whiteBtn = document.querySelector("#white-btn");
const blackBtn = document.querySelector("#black-btn");


if(productImage){

    whiteBtn.addEventListener("click", function(){

        productImage.src = "images/white-tee.jpg";

        productEdition.textContent = "WHITE EDITION";


        whiteBtn.classList.add("active");
        blackBtn.classList.remove("active");

    });



    blackBtn.addEventListener("click", function(){

        productImage.src = "images/black-tee.jpg";

        productEdition.textContent = "BLACK EDITION";


        blackBtn.classList.add("active");
        whiteBtn.classList.remove("active");

    });

}

// PRODUCT SIZE SELECTOR

const sizeButtons = document.querySelectorAll(".size-btn");


if(sizeButtons.length > 0){

    sizeButtons.forEach(function(button){

        button.addEventListener("click", function(){

            sizeButtons.forEach(function(btn){

                btn.classList.remove("active");

            });


            button.classList.add("active");


        });

    });

}

// PRODUCT WHATSAPP ORDER

const whatsappOrder = document.querySelector("#whatsapp-order");


if(whatsappOrder){


    whatsappOrder.addEventListener("click", function(event){


        const activeColor = document.querySelector(".color-btn.active");

        const activeSize = document.querySelector(".size-btn.active");



        const color = activeColor 
        ? activeColor.textContent.trim()
        : "-";



        const size = activeSize
        ? activeSize.dataset.size
        : "-";



        const message = 
`Halo THE_MATURES 👋

Saya ingin melakukan pemesanan:

Produk:
THE MATURE YOUNG TEE

Warna:
${color} EDITION

Ukuran:
${size}

Terima kasih.`;



        const phone = "6282126323422";


        whatsappOrder.href =
        "https://wa.me/" + phone +
        "?text=" +
        encodeURIComponent(message);



    });


}