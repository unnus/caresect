window.addEventListener('DOMContentLoaded', (event)=>{
  /*Scroll effect */
  // let Scrollbar = window.Scrollbar;

  // Scrollbar.init(document.querySelector('#my-scrollbar'), {
  //  thumbMinSize:20,
  //  renderByPixels:true,
  //  alwaysShowTracks:false,
  //  continuousScrolling:true,
  //  delegateTo:null,
  //  plugins:{}
  // });



  sal(); /*text & buttons reveal effect*/

  let img = document.querySelectorAll('img.animate-clip');
  let imgSecond = document.querySelectorAll('img.animate-clip-1')
  let imgSecondx = document.querySelectorAll('img.animate-clip-2')
  let imgSecondxy = document.querySelector('div.img-sect')
  let observable = document.querySelectorAll('.observe');
  let tl = gsap.timeline();
  let tl2 = gsap.timeline({ paused: true, delay: .3 })
  let revealConfig = {
      path: 'polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 68% 100%, 32% 100%, 0% 100%, 0% 100%, 0% 0%)'
  }

  /* First Timeline */
  tl.to(["nav img", 'nav ul li'], .6, { css: { top: 0 }, stagger: 0.1, ease: Circ.easeOut })
      .to(img, 1, { // img 1
          clipPath: revealConfig.path,
          webkitClipPath: revealConfig.path,
          stagger: 0.5,
          opacity: 1,
          delay: .1,
          ease: Circ.easeInOut
      });

  /* Second Timeline */
  tl2
      .to(imgSecond, 1, { // img 2
          clipPath: revealConfig.path,
          webkitClipPath: revealConfig.path,
          opacity: 1,
          ease: Circ.easeInOut
      })

      .to(imgSecondx, .8, { // img 3
          clipPath: revealConfig.path,
          webkitClipPath: revealConfig.path,
          opacity: 1,
          ease: Circ.easeInOut
      })

      .to(imgSecondxy, .5, { scaleX: 1, scaleY: 1, ease: "power4.easeOut" }, "-=.5")


  /* Testimonial Slider Effects */

  let mainCont = document.querySelector('.testimonials .media-content')
  let container = document.querySelectorAll(".hov");
  let ball = document.querySelectorAll(".circle-mouse");
  let xySets = [],
      xSet, ySet, mouse;
  let pos = [];
  let speed = 0.1;


  ball.forEach((el, i, arr) => {

      gsap.set(ball[i], { xPercent: -50, yPercent: -50 });

      xySets.push({
          xSet: gsap.quickSetter(ball[i], "x", "px"),
          ySet: gsap.quickSetter(ball[i], "y", "px")
      })

  })

  container.forEach((el, i, arr) => {

      pos.push({
          x: container[i].offsetLeft,
          y: container[i].offsetTop
      })

  })

  mouse = pos.map((el, i, arr) => {
      return { x: pos[i].x, y: pos[i].y }
  });

  let eventFire = ['mousemove', "pointerleave", "pointerenter", "scroll"];

  container.forEach((el, i, arr) => {

      eventFire.forEach(evt =>

          container[i].addEventListener(evt, e => {
              if(evt == "pointerenter"){
                container[i].classList.add('active');
              }
              if(evt == "pointerleave"){
                container[i].classList.remove('active');
              }
              if (evt == "pointerleave") {
                  gsap.to(ball[i], 0.3, { scale: 0, opacity: 0 });
              } else {
                  gsap.to(ball[i], 0.3, { scale: 1, opacity: 1 });
              }

              mouse[i].x = e.clientX - (container[i].offsetLeft - mainCont.scrollLeft);
              mouse[i].y = e.clientY - (mainCont.scrollTop);

          }, false)

      );

      gsap.ticker.add(() => {
          pos[i].x += (mouse[i].x - pos[i].x) * speed;
          pos[i].y += (mouse[i].y - pos[i].y) * speed;
          xySets[i].xSet(pos[i].x);
          xySets[i].ySet(pos[i].y);
      });

  });

  /* Slider Motion On Mousemove Effect */

  class MoveSlider {
      constructor() {
          this.slider = document.querySelector('.testimonials .media-content');
          this.drag = false;
          this.startX = null;
          this.scrollLeft = null;
          this.init();
      }
      init() {
          this.initEvents();
      }
      initEvents() {
          this.slider.addEventListener('mouseover', this.mouseDown.bind(this));
          this.slider.addEventListener('mouseup', this.mouseUp.bind(this));
          this.slider.addEventListener('mouseleave', this.mouseLeave.bind(this));
          this.slider.addEventListener('mousemove', this.mouseMove.bind(this));
      }
      mouseDown(e) {
          e.preventDefault();
          this.drag = true;
          this.slider.classList.add('drag');
          this.startX = e.pageX - this.slider.offsetLeft;
          this.scrollLeft = this.slider.scrollLeft;
      }
      mouseUp() {
          this.drag = false;
          this.slider.classList.remove('drag');
      }
      mouseLeave() {
          this.drag = false;
          this.slider.classList.remove('drag');
      }
      mouseMove(e) {
          if (!this.drag) return;
          e.preventDefault();
          const x = e.pageX - this.slider.offsetLeft;
          const move = (x - this.startX) * 9;
          // this.slider.scrollLeft = this.scrollLeft - move;

          gsap.to(this.slider, 2, {
              scrollLeft: this.scrollLeft + move
          })

      }
  }


  let slider = new MoveSlider();





   // Fire On Scroll Reveal Effect 

  let testimonials = document.querySelector('.testimonials');

  const config = {
      rootMargin: '50px 20px 75px 30px',
      threshold: [0, 0.25, 0.75, 1]
  }


  let observer = new IntersectionObserver(entries => {
      entries.forEach(function(entry) {
          if (entry.intersectionRatio > 0) {
              // specify to what section the below animation will fire just like the above example 
              tl2.play()
              observer.unobserve(entry.target);
          }
      })
  }, config);

  observable.forEach(section => {
      observer.observe(section);
  });


/* Page Transition */

// optimize the code
// finish the damn thing 

  // SELECT LINKS
  let firstLink = document.querySelector('.naomi');
  let secondLink = document.querySelector('.nara');
  let thirdLink = document.querySelector('.lamar');

  // CREATE ARRAY OF LINKS
  let linkArray = [firstLink, secondLink, thirdLink];

  let newlyFetched;
            // fetchPage('testimonials/naomi.html');

    // LOOP THROUGH LINKS, ATTACH EVENTLISTENERS AND FIRE FETCH
  linkArray.forEach((eachLink) => {
    eachLink.addEventListener('click', function(e){
      
      e.preventDefault();
      
      switch (eachLink) {
        case firstLink:
          if(!document.querySelector('.naomi-text')){
            fetchPage('testimonials/naomi.html');
          }else{
            gsap.to(['.hov', ".heading-testi"], .2, {scaleX:.6, scaleY:.6, opacity:0, ease:Circ.easeInOut})
            animateTextIn(".naomi-text");
          }
          break;
        case secondLink:
          if(!document.querySelector('.nara-text')){
            fetchPage('testimonials/nara.html');
          }else{
            gsap.to(['.hov', ".heading-testi"], .2, {scaleX:.6, scaleY:.6, opacity:0, ease:Circ.easeInOut})
            animateTextIn(".nara-text");
          }
          break;
        case thirdLink:
          if(!document.querySelector('.lamar-text')){
            fetchPage('testimonials/lamar.html');
          }else{
            gsap.to(['.hov', ".heading-testi"], .2, {scaleX:.6, scaleY:.6, opacity:0, ease:Circ.easeInOut})
            animateTextIn(".lamar-text");
          }          
      }
    })


  }, false);

        // ANIMATE TESTIMONIAL IN. 
    function animateTextIn(which){
        let tlq = gsap.timeline();

   

        tlq.to('.white-stripe', 1, {x:0, ease:Circ.easeInOut})
           .to('.white-stripe', .5, {x:"100%", ease:Circ.easeInOut})
           .to(which, .5, {x:0, ease:Circ.easeOut})        

    }

    function animateTextOut(which){
       let tlg = gsap.timeline();
        tlg.to(which, .5, {x:"-100%", ease:Circ.easeInOut})
           .to('.white-stripe', .5, {x:0, ease:Circ.easeInOut})
           .to('.white-stripe', .5, {x:"-100%", ease:Circ.easeInOut})
           .to(['.hov', ".heading-testi"], .5, {scaleX:1, scaleY:1, opacity:1, ease:Circ.easeInOut})
    }

  // FETCH FUNCTION
  function fetchPage(page) {
    // GET BASE URL
    let baseURL = `${window.location.protocol}//${window.location.hostname}`;
    let TestimonialgoBackButton;
    // ADD PORT TO URL IF AVAILABLE
    if (window.location.port) {
      baseURL += `:${window.location.port}`;
    }

    // FETCH API
    fetch(`${baseURL}/${page}`)
      .then((response) => {
        // CONVERT FETCH RESPONSE TO STRING
        return response.text();
      })
      .then((html) => {
        // PARSE STRING TO HTML
        let doc = new DOMParser().parseFromString(html, 'text/html'); 

        gsap.to(['.hov', ".heading-testi"], .2, {scaleX:.6, scaleY:.6, opacity:0, ease:Circ.easeInOut})
        
        // USE TIMEOUT TO DELAY CONTENT INSERTION UNTIL ANIMATION IS FINISHED
        setTimeout(() => {
          // INSERTING THE NEWLY FETCHED CONTENT
          document.querySelector('.testimonials').insertBefore(doc.querySelector('.testimonials-text'), document.querySelector('.testimonials .container'));
         
            /* Start Animation In */
            let TestimonialgoBackButton;
            if(page.includes('naomi')){
              animateTextIn('.naomi-text');
               TestimonialgoBackButton = document.querySelector('.btn-naomi');

                TestimonialgoBackButton.addEventListener("click", function(){
                  /* Start Animation Out */
                    animateTextOut(".naomi-text");
                })

            }
            if(page.includes('nara')){
               animateTextIn('.nara-text');
               TestimonialgoBackButton = document.querySelector('.btn-nara');

                TestimonialgoBackButton.addEventListener("click", function(){
                  /* Start Animation Out */
                    animateTextOut(".nara-text");
                })
            }
            if(page.includes('lamar')){
               animateTextIn('.lamar-text');
               TestimonialgoBackButton = document.querySelector('.btn-lamar');

                TestimonialgoBackButton.addEventListener("click", function(){
                  /* Start Animation Out */
                    animateTextOut(".lamar-text");
                })
            }

        }, 700)

    })
  }
});


/* Mobile Menu Click Handler */

let mobileMenu = document.querySelector('.hamburgerMenu');
let crossMenu  = document.querySelector('.cross');

function menuHandler(whatToDo){
    if(whatToDo === 'reveal'){
        gsap.to('.mobile-menu ul', .5, {opacity:1, visibility:"visible", ease:"power4.easeOut"});
    }

    if(whatToDo === 'hide'){
        gsap.to('.mobile-menu ul', .5, {opacity:0, ease:"power4.easeIn",
         onComplete:function(){
          gsap.set('.mobile-menu ul', {visibility:"hidden"})
        }});      
    }
}

mobileMenu.addEventListener('click', e =>{
   menuHandler('reveal')
})

crossMenu.addEventListener('click', e =>{
  menuHandler('hide')
})




