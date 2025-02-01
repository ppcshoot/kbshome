// Selecting elements
const openModalBtns = document.querySelectorAll(".openModalBtn");
const modalContainer = document.getElementById("modalContainer");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalContent = document.getElementById("modalContent");

// Content variables
const contentMap = {
  //modal1: document.getElementById("modelone").innerHTML,
  //modal2: document.getElementById("modeltwo").innerHTML,
  //modal3: document.getElementById("modelthree").innerHTML,
  //modal5: document.getElementById("privacypolicy").innerHTML,
    modal6: document.getElementById("cleaning1").innerHTML,
    modal7: document.getElementById("cleaning2").innerHTML,
    modal8: document.getElementById("cleaning3").innerHTML,
    modal9: document.getElementById("cleaning4").innerHTML,
    modal10: document.getElementById("cleaning5").innerHTML,
    modal11: document.getElementById("cleaning6").innerHTML,
    // modal12: document.getElementById("cleaning7").innerHTML,
  
};

// Adding event listeners to open modal buttons
openModalBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const modalTarget = button.getAttribute("data-modal-target");
    modalContent.innerHTML = contentMap[modalTarget] || "";

    // Display modal container
    modalContainer.style.display = "block";

    // Hide body overflow
    document.documentElement.style.overflow = "hidden";
    // Apply animation based on window width
    if (window.innerWidth <= 600) {
      document.getElementById("modal").style.animation = "slideIn .5s ease-out";
    } else {
      document.getElementById("modal").style.animation = "slideleft .5s ease-in";
    }
    document.body.style.overflow = "hidden"; // Hide body overflow
    
    $('.noword').keypress(function(event) {
      console.log(event.which);
      if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault();
      }
    });
    
    $('input[type="tel"]').bind('input', function() {
    var c = this.selectionStart,
        r = /[^a-z0-9 .]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
    }); 

  });
});

// Adding event listener to close modal button
closeModalBtn.addEventListener("click", () => {
  // Apply appropriate animation based on window width
  if (window.innerWidth <= 600) {
    document.getElementById("modal").style.animation = "slideOut .5s ease-out";
  } else {
    document.getElementById("modal").style.animation = "slideleftOut .5s ease-out";
  }
  // Hide modal after animation
  setTimeout(function () {
    modalContainer.style.display = "none";
    // Reset overflow styles
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto"; // Reset body overflow to default
    // Reset modal animation
    document.getElementById("modal").style.animation = "none";
  }, 500);
});