// Get all menu items and sections
const menuItems = document.querySelectorAll('.topmenu li a');
const sections = document.querySelectorAll('.autoscroll');

// Offset for sticky headers or margins
const offset = 150; // Adjust this for your sticky header
const buffer = 10; // Buffer of 10 pixels

// Duration for smooth scrolling (in milliseconds)
let scrollDuration = 1000; // Vertical scroll duration
let horizontalScrollDuration = 1000; // Horizontal menu scroll duration

// Easing function for smooth transition
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

// Function to scroll smoothly with a custom speed
function smoothScrollTo(targetPosition, duration, callback) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition); // Ensure it ends exactly at target
      if (callback) callback(); // Call the callback if provided
    }
  }

  requestAnimationFrame(animation);
}

// Function to scroll the menu horizontally with a custom speed
function smoothHorizontalScrollTo(menu, targetScrollLeft, duration) {
  const startScrollLeft = menu.scrollLeft;
  const distance = targetScrollLeft - startScrollLeft;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startScrollLeft, distance, duration);
    menu.scrollLeft = run;
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      menu.scrollLeft = targetScrollLeft; // Ensure it ends exactly at target
    }
  }

  requestAnimationFrame(animation);
}

// Function to scroll the menu to keep the active item in view
function scrollMenuToActive(menuItem) {
  const menu = document.querySelector('.topmenu'); // Ensure this matches your actual menu class
  const menuRect = menu.getBoundingClientRect();
  const menuItemRect = menuItem.getBoundingClientRect();

  // Calculate the difference between the menuItem and the menu center
  const offset = menuItemRect.left - (menuRect.left + (menuRect.width / 2) - (menuItemRect.width / 2));

  // Adjust target scroll position and apply smooth horizontal scroll
  const targetScrollLeft = menu.scrollLeft + offset;
  smoothHorizontalScrollTo(menu, targetScrollLeft, horizontalScrollDuration);
}

// Function to update active class based on the section in view
function updateActiveMenuItem() {
  const scrollPosition = window.scrollY + offset;

  sections.forEach((section) => {
    const sectionRect = section.getBoundingClientRect();
    
    // Check if the section is in view with a buffer
    if (sectionRect.top < (offset + buffer) && sectionRect.bottom > (offset - buffer)) {
      const menuItem = document.querySelector(`[href="#${section.id}"]`);
      if (menuItem) {
        // Remove active class from all menu items
        menuItems.forEach((item) => item.parentNode.classList.remove('active'));
        
        // Add active class to the current menu item
        menuItem.parentNode.classList.add('active');
        
        // Scroll menu to keep active item in view
        scrollMenuToActive(menuItem);
      }
    }
  });
}

// Add event listener to each menu item
menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', (e) => {
    // Prevent default link behavior
    e.preventDefault();

    const targetId = menuItem.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const sectionPosition = targetSection.offsetTop - offset;

        // Scroll to the target section and update the active class after scrolling
        smoothScrollTo(sectionPosition, scrollDuration, () => {
          // After scrolling, set the active class
          menuItems.forEach((item) => item.parentNode.classList.remove('active'));
          menuItem.parentNode.classList.add('active');
          scrollMenuToActive(menuItem);
        });
      }
    }
  });
});

// Auto-scroll to the target section when the page is loaded
window.addEventListener('load', () => {
  const targetId = window.location.hash;

  if (targetId && targetId.startsWith('#')) {
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const sectionPosition = targetSection.offsetTop - offset;
      smoothScrollTo(sectionPosition, scrollDuration, () => {
        const targetMenuItem = document.querySelector(`[href="${targetId}"]`);
        if (targetMenuItem) {
          targetMenuItem.parentNode.classList.add('active');
          scrollMenuToActive(targetMenuItem);
        }
      });
    }
  }
});

// Add event listener to window scroll event for highlighting menu items
window.addEventListener('scroll', updateActiveMenuItem);



const menuArrow = document.getElementById('menuArrow');
const menu = document.querySelector('.topmenu');

// Function to handle arrow click for scrolling one item at a time
menuArrow.addEventListener('click', () => {
  const menuItems = menu.querySelectorAll('li');
  const itemWidth = menuItems[0].getBoundingClientRect().width; // Get width of the first menu item
  const scrollAmount = itemWidth * 1.7; // Calculate scroll amount for 1.4 items
  const currentScrollLeft = menu.scrollLeft; // Get current scroll position

  // Calculate the new scroll position, ensuring it doesn't exceed total scroll width
  const newScrollLeft = Math.min(currentScrollLeft + scrollAmount, menu.scrollWidth - menu.clientWidth);

  // Smooth scroll to the new position
  smoothHorizontalScrollTo(menu, newScrollLeft, horizontalScrollDuration);

  // Hide arrow if at the end
  if (newScrollLeft >= menu.scrollWidth - menu.clientWidth) {
      menuArrow.style.display = 'block';
  } else {
      // Show arrow if the end is not reached
      menuArrow.style.display = 'block';
  }
});

// Function to check and show/hide the arrow based on scroll position
function checkArrowVisibility() {
  const scrollPosition = menu.scrollLeft;
  const menuWidth = menu.scrollWidth;
  const menuRect = menu.getBoundingClientRect();

  // Show the arrow if the scroll position is not at the start
  menuArrow.style.display = scrollPosition > 0 ? 'block' : 'block';

  // Show the arrow if there are more items to scroll to the left
  if (menuWidth - scrollPosition > menuRect.width) {
      menuArrow.style.display = 'block';
  }
}

// Add event listener to check arrow visibility on scroll
menu.addEventListener('scroll', checkArrowVisibility);
window.addEventListener('resize', checkArrowVisibility); // Check arrow visibility on window resize

// Initialize arrow visibility on page load
checkArrowVisibility();