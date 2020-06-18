const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navLinks');
    const navLinks = document.querySelectorAll('.navLinks li');

    burger.addEventListener('click', () => {

        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if(link.style.animation){
               link.style.animation = '';
            } 
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.4}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}

navSlide();


(function(){
    var d = document,
    accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
    setAria,
    setAccordionAria,
    switchAccordion,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  }

        setAriaAttr = function(el, ariaType, newProperty){
        el.setAttribute(ariaType, newProperty);
    };
    setAccordionAria = function(el1, el2, expanded){
        switch(expanded) {
      case "true":
        setAriaAttr(el1, 'aria-expanded', 'true');
        setAriaAttr(el2, 'aria-hidden', 'false');
        break;
      case "false":
        setAriaAttr(el1, 'aria-expanded', 'false');
        setAriaAttr(el2, 'aria-hidden', 'true');
        break;
      default:
                break;
        }
    };
//function
switchAccordion = function(e) {
  console.log("triggered");
    e.preventDefault();
    var thisAnswer = e.target.parentNode.nextElementSibling;
    var thisQuestion = e.target;
    if(thisAnswer.classList.contains('is-collapsed')) {
        setAccordionAria(thisQuestion, thisAnswer, 'true');
    } else {
        setAccordionAria(thisQuestion, thisAnswer, 'false');
    }
    thisQuestion.classList.toggle('is-collapsed');
    thisQuestion.classList.toggle('is-expanded');
        thisAnswer.classList.toggle('is-collapsed');
        thisAnswer.classList.toggle('is-expanded');
    
    thisAnswer.classList.toggle('animateIn');
    };
    for (var i=0,len=accordionToggles.length; i<len; i++) {
        if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})(); 

// carrousel


var carousel = document.querySelector('.carousel');
var carouselSlideWrapper = document.querySelector('.carousel__slide-wrapper');
var carouselSlide = document.querySelector('.carousel__slide');
var allSlides = document.querySelectorAll('.carousel__slide');
var slides = [];
var slideActive = document.querySelector('.carousel__slide.active');
var activeSlideIndex = 0;
var prev = document.querySelector('.carousel__navigation--left');
var next = document.querySelector('.carousel__navigation--right');
var pagination = document.querySelector('.carousel__pagination');
var bullet = document.querySelector('.carousel__bullet');
var allBullets = document.querySelectorAll('.carousel__bullet');
var bulletActive = document.querySelector('.carousel__bullet.active');
var bullets = [];
var translateX = 100;


//Obtener array diapositivas
function loopThroughSlides(){
    for(var i = 0; i < allSlides.length; i++){
        slides.push(allSlides[i]);
    }
}
loopThroughSlides();


//Obtener índice de diapositiva activa
function indexOfActive(){
    activeSlideIndex = slides.indexOf(slideActive);
}

indexOfActive();


//Mover diapositivas
function moveSlides(){
    for(var i = 0; i < allSlides.length; i++){
        allSlides[i].style.transform = "translateX(" + translateX + "%)";
    }
}



//Diapositiva previa y anterior
function nextSlide(){

    elementActive = document.querySelector('.carousel__slide.active');
    elementActive.classList.remove('active');
    
    if(elementActive.nextElementSibling == null){
        slides[0].classList.add('active');
    }
    else {
        elementActive.nextElementSibling.classList.add('active');
    }


    translateX = translateX - 100;

    moveSlides();

    activeSlideIndex = activeSlideIndex + 1;
}

function nextTransform(){
    
}


function prevSlide(){
    elementActive = document.querySelector('.carousel__slide.active');
    elementActive.classList.remove('active');

    if(elementActive.previousElementSibling == null){
        slides[slides.length - 1].classList.add('active');
    }
    else {
        elementActive.previousElementSibling.classList.add('active');
    }


    translateX = translateX + 100;

    moveSlides();
    
    activeSlideIndex = activeSlideIndex - 1;
}




// Crear los bullets dentro de pagination

function createBullets(){
    for(var i = 0; i < allSlides.length; i++){
        var bulletCreated = document.createElement('li');
        bulletCreated.className = 'carousel__bullet'
        pagination.appendChild(bulletCreated);
        bullets.push(bulletCreated);
    }
}

createBullets();

//Hacer coincidir índice bullet y slide active

function matchIndex(){
    bullets.forEach(function(elem) {
        elem.classList.remove('active');
    })
    bullets[activeSlideIndex].classList.add('active');
}

matchIndex();


//Ocultar/mostrar los botones dependiendo de si hay una diapositiva siguiente o anterior

function checkPrevButton(){
    if (slides[0].classList.contains('active')) {
        prev.style.display = "none";
    }
    else {
        prev.style.display = "flex";
    }  
}

checkPrevButton();


function checkLastButton(){
    if (slides[slides.length -1].classList.contains('active')) {
        next.style.display = "none";
    }
    else {
        next.style.display = "flex";
    }
}

checkLastButton();




//Ejecutar anterior y siguiente diapositiva


next.addEventListener('click', function(){
    nextSlide();
    checkPrevButton();
    checkLastButton();
    matchIndex();
    console.log(activeSlideIndex);
});

prev.addEventListener('click', function(){
    prevSlide();
    checkPrevButton();
    checkLastButton();
    matchIndex();
    console.log(activeSlideIndex);
});

bullets.forEach(function(elem) {
    elem.addEventListener('click', function() {
        [].forEach.call(bullets, function(elem) {
            if(elem !== this) {
                elem.classList.remove('active');
            }
        })
        this.classList.add('active');
        for(var i = 0; i < allSlides.length; i++){
            allSlides[i].classList.remove('active');
        }
        var indexBulletActive = bullets.indexOf(this);
        slides[indexBulletActive].classList.add('active');
        activeSlideIndex = indexBulletActive;
        translateX = (indexBulletActive - 1) * -100;
        moveSlides();
        checkPrevButton();
        checkLastButton();
    });
});

