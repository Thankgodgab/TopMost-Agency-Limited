const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };
  
  // header container
  ScrollReveal().reveal(".header_container img", {
    duration: 1000,
  });
  
  ScrollReveal().reveal(".header_container h1", {
    ...scrollRevealOption,
    delay: 500,
  });
  
  ScrollReveal().reveal(".header_container p", {
    ...scrollRevealOption,
    delay: 1000,
  });
  
  ScrollReveal().reveal(".header_btns", {
    ...scrollRevealOption,
    delay: 1500,
  });
  
  // about container
  ScrollReveal().reveal(".about_image img", {
    ...scrollRevealOption,
    origin: "left",
  });
  
  ScrollReveal().reveal(".about_content h3", {
    ...scrollRevealOption,
    delay: 500,
  });
  
  ScrollReveal().reveal(".about_content .section_header", {
    ...scrollRevealOption,
    delay: 1000,
  });
  
  ScrollReveal().reveal(".about_content .section_subheader", {
    ...scrollRevealOption,
    delay: 1500,
  });
  
  ScrollReveal().reveal(".about_content .about_grid", {
    ...scrollRevealOption,
    delay: 2000,
  });
  
  // contact container
  ScrollReveal().reveal(".contact_image img", {
    ...scrollRevealOption,
    origin: "left",
  });
  
  
  const initSlider = () => {
    const imageList = document.querySelector(".swiper-wrapper .item");
    const slideButtons = document.querySelectorAll(".swiper-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".swiper .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
};
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

function sendbutton(){
  window.location.href ="https://bit.ly/4dGaSgD";
}
function listbutton(){
  window.location.href ="https://bit.ly/4dJ9Ikf";
}

emailjs.init("_6rZpFxklF4U1snMo");

function sendEmail(event){
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const message = document.getElementById("message").value;

  if(!firstName || !lastName || !email || !number ||!message){
    alert("Please fill all the fields");
    return;
  }

  emailjs.send("service_240ok9q", "template_3ksolrd",{
    from_firstName:firstName,
    from_lastName:lastName,
    from_email:email,
    from_number:number,
    from_message:message,
  })
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    alert("Email sent successfully");
    document.getElementById("contact-form").reset();
    
  }, function(error){
    console.log('FAILED...', error);
    alert("Oops! something went wrong")
  });
}

document.getElementById("contact-form").addEventListener("submit", sendEmail);