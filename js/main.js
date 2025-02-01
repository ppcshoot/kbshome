const header = document.querySelector(".menu");
  const progcl = document.querySelector(".progressset");
      const toggleClass = "has-sticky";
      const progressClass = "progressbg";
  
      window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
          header.classList.add(toggleClass);
          progcl.classList.add(progressClass);
      } else {
          header.classList.remove(toggleClass);
          progcl.classList.remove(progressClass);
      }
  });
  $(document).on("scroll", function(){
    var pixels = $(document).scrollTop();
    var pageHeight = $(document).height() - $(window).height();
    var progress = 100 * pixels / pageHeight;
    
    $(".pageprogress").css("width", progress + "%");
    $(".pageprogress").css("background-color","green");
  })  

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

  var swiper = new Swiper(".workdeep", {
    allowTouchMove: false,
    slidesPerView:4,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.8,
        spaceBetween: 10,
      },
      468: {
        slidesPerView: 2.2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3.8,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  });