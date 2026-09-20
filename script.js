


if(history.scrollRestoration){

    history.scrollRestoration = "manual";

}


window.scrollTo(0,0);

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("#menu");
const menuLinks = document.querySelectorAll("#menu a");


function setMenuState(isOpen){

    if(!hamburger || !menu){
        return;
    }

    menu.classList.toggle("active", isOpen);
    hamburger.classList.toggle("active", isOpen);

    hamburger.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

    hamburger.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );

}


// CLICK HAMBURGER

if(hamburger && menu){

    hamburger.addEventListener("click", function(){

        const isOpen = menu.classList.contains("active");

        setMenuState(!isOpen);

    });

}


// KEYBOARD HAMBURGER

if(hamburger && menu){

    hamburger.addEventListener("keydown", function(event){

        if(event.key === "Enter" || event.key === " "){

            event.preventDefault();

            const isOpen = menu.classList.contains("active");

            setMenuState(!isOpen);

        }

    });

}


// MENU LINK CLICK

if(menu && hamburger){

    menuLinks.forEach(function(link){

        link.addEventListener("click", function(){

            setMenuState(false);

            setTimeout(function(){

                hamburger.focus({
                    preventScroll:true
                });

            },0);

        });

    });

}


// ESCAPE CLOSE MENU

document.addEventListener("keydown", function(event){

    if(
        event.key === "Escape" &&
        menu &&
        hamburger &&
        menu.classList.contains("active")
    ){

        event.preventDefault();

        setMenuState(false);

        hamburger.focus({
            preventScroll:true
        });

    }

});


// CLOSE WHEN RESIZE TO DESKTOP

window.addEventListener("resize", function(){

    if(
        menu &&
        hamburger &&
        window.innerWidth > 700
    ){

        setMenuState(false);

    }

});


// CLICK OUTSIDE MENU

document.addEventListener("click", function(event){

    if(menu && hamburger){

        if(
            !menu.contains(event.target) &&
            !hamburger.contains(event.target)
        ){

            setMenuState(false);

        }

    }

});

const reveals = document.querySelectorAll(".reveal");


if("IntersectionObserver" in window){

    const revealObserver = new IntersectionObserver(
        function(entries){

            entries.forEach(function(entry){

                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold:0.1,
            rootMargin:"0px 0px -100px 0px"
        }
    );


    reveals.forEach(function(element){

        revealObserver.observe(element);

    });

}else{

    reveals.forEach(function(element){

        element.classList.add("active");

    });

}

// ACTIVE NAVBAR SECTION

const sections = document.querySelectorAll("section[id]");


const sectionRoutes = {
    home: "/",
    collection: "/Collection",
    archive: "/Archive",
    about: "/About"
};


function getCurrentSection(){

    if(window.scrollY < window.innerHeight * 0.8){

        return "home";

    }


    let current = "home";


    sections.forEach(function(section){

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if(
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ){

            current = section.getAttribute("id");

        }

    });


    return current;

}


function updateActiveNav(){

    const current = getCurrentSection();


    menuLinks.forEach(function(link){

        link.classList.remove("active");

        const href = link.getAttribute("href");

        const route = sectionRoutes[current];


        if(href === route){

            link.classList.add("active");

        }

    });

}


let isProgrammaticNavigation = false;
let navigationTimer = null;


function updateCleanUrl(){

    if(isProgrammaticNavigation){
        return;
    }


    const current = getCurrentSection();

    const route = sectionRoutes[current];


    if(window.location.pathname !== route){

        history.replaceState(
            null,
            "",
            route
        );

    }

}


window.addEventListener(
    "scroll",
    function(){

        updateActiveNav();
        updateCleanUrl();

    },
    {
        passive:true
    }
);


function openSectionFromUrl(){

    const path =
        window.location.pathname.replace(/\/+$/, "");


    let targetId = "home";


    if(path === "/Collection"){

        targetId = "collection";

    }else if(path === "/Archive"){

        targetId = "archive";

    }else if(path === "/About"){

        targetId = "about";

    }


    if(targetId === "home"){

        window.scrollTo({
            top:0,
            behavior:"auto"
        });

    }else{

        const target =
            document.getElementById(targetId);


        if(target){

            setTimeout(function(){

                target.scrollIntoView({
                    behavior:"auto",
                    block:"start"
                });

            },100);

        }

    }


    updateActiveNav();

}


openSectionFromUrl();



// PRODUCT SIZE SELECTOR

const sizeButtons = document.querySelectorAll(".size-btn");


if(sizeButtons.length > 0){

    sizeButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const selectedSize = button.dataset.size;


            sizeButtons.forEach(function(btn){

                btn.classList.toggle(
                    "active",
                    btn.dataset.size === selectedSize
                );

            });

        });

    });

}

// PRODUCT WHATSAPP ORDER

const whatsappOrders = document.querySelectorAll(".whatsapp-order");


if(whatsappOrders.length > 0){

    whatsappOrders.forEach(function(orderLink){

        orderLink.addEventListener("click", function(event){

            const activeColor = document.querySelector(".color-btn.active");
            const activeSize = document.querySelector(".size-btn.active");


            if(!activeSize){

                event.preventDefault();

                alert("Please select a size first.");

                return;

            }


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


            orderLink.href =
                "https://wa.me/" +
                phone +
                "?text=" +
                encodeURIComponent(message);

        });

    });

}

// PRODUCT COLOR SWITCH
const colorButtons = document.querySelectorAll(".color-btn");
const productImage = document.querySelector("#product-image");
const productEdition = document.querySelector("#product-edition");

if(colorButtons.length > 0 && productImage && productEdition){

    colorButtons.forEach(function(button){

        button.addEventListener("click", function(){

            colorButtons.forEach(function(btn){
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const color = button.dataset.color;

            if(color === "BLACK"){

                productImage.src = "images/black-tee.jpg";
                productImage.alt = "THE MATURE YOUNG TEE Black Edition";

                productEdition.textContent = "BLACK EDITION";

            }else{

                productImage.src = "images/white-tee.jpg";
                productImage.alt = "THE MATURE YOUNG TEE White Edition";

                productEdition.textContent = "WHITE EDITION";

            }

        });

    });

}

// SIZE GUIDE MODAL

const sizeButtonsGuide = document.querySelectorAll(".size-guide-btn");
const sizeModal = document.getElementById("size-modal");
const closeSize = document.getElementById("close-size");


if(sizeButtonsGuide.length > 0 && sizeModal){

    sizeButtonsGuide.forEach(function(button){

        button.addEventListener("click", function(){

            sizeModal.style.display="flex";

        });

    });

}


if(closeSize){

    closeSize.addEventListener("click", function(){

        sizeModal.style.display="none";

    });

}


if(sizeModal){

    sizeModal.addEventListener("click", function(e){

        if(e.target === sizeModal){

            sizeModal.style.display="none";

        }

    });

}

document.addEventListener("keydown", function(event){

    if(
        event.key === "Escape" &&
        sizeModal &&
        sizeModal.style.display === "flex"
    ){

        sizeModal.style.display = "none";

    }

});

// ================= PAGE TRANSITION =================

const pageTransition = document.querySelector(".page-transition");


function navigateToSection(route, sectionId){

    const target = document.getElementById(sectionId);

    if(!target){
        return;
    }


    isProgrammaticNavigation = true;


    if(navigationTimer){
        clearTimeout(navigationTimer);
    }


    history.pushState(
        null,
        "",
        route
    );


    target.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });


    updateActiveNav();


    navigationTimer = setTimeout(function(){

        isProgrammaticNavigation = false;

        updateActiveNav();

        updateCleanUrl();

    },800);

}


// ================= INTERNAL SECTION LINKS =================

document.querySelectorAll("#menu a").forEach(function(link){

    link.addEventListener("click", function(event){

        const href = link.getAttribute("href");


        if(href === "/"){

            event.preventDefault();

            history.pushState(
                null,
                "",
                "/"
            );

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

            setMenuState(false);

            return;

        }


        if(href === "/Collection"){

            event.preventDefault();

            navigateToSection(
                "/Collection",
                "collection"
            );

            setMenuState(false);

            return;

        }


        if(href === "/Archive"){

            event.preventDefault();

            navigateToSection(
                "/Archive",
                "archive"
            );

            setMenuState(false);

            return;

        }


        if(href === "/About"){

            event.preventDefault();

            navigateToSection(
                "/About",
                "about"
            );

            setMenuState(false);

            return;

        }

    });

});


// ================= PRODUCT PAGE TRANSITION =================

document.querySelectorAll(
    'a[href="/the-mature-young-tee"], a[href*="product.html"]'
).forEach(function(link){

    link.addEventListener("click", function(event){

        event.preventDefault();


        const target = this.href;


        if(pageTransition){

            pageTransition.classList.add("active");

        }


        setTimeout(function(){

            window.location.href = target;

        },500);

    });

});


// ================= BROWSER BACK / FORWARD =================

window.addEventListener("popstate", function(){

    openSectionFromUrl();

});


// ================= PAGE LOAD =================

window.addEventListener("pageshow", function(){

    if(pageTransition){

        pageTransition.classList.remove("active");

    }

});