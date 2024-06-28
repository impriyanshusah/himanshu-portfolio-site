//Header Section
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
})

// Home Section
var navElements = document.querySelectorAll('header nav a');
const title = document.querySelector('#profile');
const skills_left = document.querySelector('#home-skills-left');
const skills_right = document.querySelector('#home-skills-right');
document.addEventListener('scroll', function() {
    let value = window.scrollY
    title.style.marginTop = value * 2.5 + 'px'
    skills_left.style.marginLeft = -value + 'px'
    skills_right.style.marginRight = -value + 'px'
});

//Portfolio Section
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return;
    
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return;
    
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Contact Section
// Email JS
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");
const sendEmail = (e) => {
  e.preventDefault();

  // serviceId - templateId - #form - publicKey
  emailjs
    .sendForm(
      "service_spsah3h",
      "template_4n5dg9t",
      "#contact-form",
      "ryZvDGXnMOZiYX1BR"
    )
    .then(
      () => {
        // show sent message
        contactMessage.textContent = "Message Sent Succesfully ✅";

        // remove message after 5sec
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        //clear input fields
        contactForm.reset();
      },
      () => {
        contactMessage.textContent = "Message Not Sent (service error) ❌";
      }
    );
};
contactForm.addEventListener("submit", sendEmail);

// Move To Top Button
let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}