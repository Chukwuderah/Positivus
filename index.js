const navbar = document.querySelector(".navbar");
const hamburgerIcon = document.querySelector(".logo .hamburger");
const navList = document.querySelector(".nav-list");
const navButton = document.querySelector(".nav-button");

// Initialize state management
let isMenuOpen = false;

// Ensure the menu is hidden and hamburger icon is reset on page load
const initializeMenu = () => {
  if (window.innerWidth <= 1140) {
    navList.style.display = "none";

    // Reset the hamburger icon to default state
    hamburgerIcon.setAttribute("data-state", "closed");
    hamburgerIcon.src = "./assets/hamburger-menu.png";
    hamburgerIcon.style.transform = "rotate(0deg)";

    // Reset navbar background if scrolled to top
    if (window.scrollY <= 100) {
      navbar.classList.remove("bg-grey");
      navbar.style.position = "relative";
    }
  }
};

// Toggle menu and handle hamburger icon
const toggleMenu = () => {
  if (window.innerWidth <= 1140) {
    isMenuOpen = !isMenuOpen;
    const currentState = hamburgerIcon.getAttribute("data-state");

    // Toggle nav-list visibility with transition
    navList.style.transition = "all 0.3s ease-in-out";

    if (isMenuOpen) {
      // Open menu
      navList.style.display = "flex";
      navList.style.position = "fixed";
      navList.style.top = "80px";
      navList.style.left = "0";
      navList.style.width = "100%";
      navList.style.padding = "20px";
      navList.style.backgroundColor = "#F3F3F3";
      navList.style.zIndex = "1000";
      navList.style.opacity = "0";

      // Style list items for mobile
      const navItems = navList.querySelectorAll(".nav-item");
      navItems.forEach((item) => {
        item.style.width = "100%";
        item.style.textAlign = "center";
      });

      // Style the button for mobile
      if (navButton) {
        navButton.style.width = "fit-content";
        navButton.style.margin = "10px 0";
      }

      // Ensure navbar has background when menu is open
      navbar.classList.add("bg-grey");
      navbar.style.position = "fixed";
      navbar.style.top = "0";
      navbar.style.left = "0";
      navbar.style.width = "100%";
      navbar.style.zIndex = "2000";

      // Trigger fade in
      setTimeout(() => {
        navList.style.opacity = "1";
      }, 10);

      // Change to close icon with animation
      hamburgerIcon.style.transition = "transform 0.3s ease-in-out";
      hamburgerIcon.style.transform = "rotate(90deg)";
      setTimeout(() => {
        hamburgerIcon.src = "./assets/closeMenu.png";
        hamburgerIcon.style.transform = "rotate(0deg)";
        hamburgerIcon.setAttribute("data-state", "open");
      }, 150);
    } else {
      // Fade out menu
      navList.style.opacity = "0";

      // Reset navbar background if scrolled to top
      if (window.scrollY <= 100) {
        navbar.classList.remove("bg-grey");
        navbar.style.position = "relative";
      }

      // Change back to hamburger icon with animation
      hamburgerIcon.style.transform = "rotate(90deg)";
      setTimeout(() => {
        hamburgerIcon.src = "./assets/hamburger-menu.png";
        hamburgerIcon.style.transform = "rotate(0deg)";
        hamburgerIcon.setAttribute("data-state", "closed");
        navList.style.display = "none";
      }, 300);
    }
  }
};

// Handle responsive behavior
const handleResize = () => {
  if (window.innerWidth > 1140) {
    // Reset styles for desktop view
    navList.style.display = "flex";
    navList.style.position = "static";
    navList.style.width = "auto";
    navList.style.padding = "0";
    navList.style.backgroundColor = "transparent";
    navList.style.opacity = "1";
    navList.style.transition = "none";

    // Reset hamburger icon
    isMenuOpen = false;
    hamburgerIcon.src = "./assets/hamburger-menu.png";
    hamburgerIcon.setAttribute("data-state", "closed");
    hamburgerIcon.style.transform = "rotate(0deg)";

    // Reset navbar styles
    navbar.classList.remove("bg-grey");
    navbar.style.position = "relative";

    // Reset list items styles
    const navItems = navList.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.style.width = "auto";
      item.style.textAlign = "left";
    });

    // Reset button styles
    if (navButton) {
      navButton.style.width = "auto";
      navButton.style.margin = "0";
    }
  } else {
    initializeMenu(); // Reinitialize menu for mobile view
  }
};

// Handle scroll behavior
const handleScroll = () => {
  const isMobile = window.innerWidth <= 1140;
  const isOpen = hamburgerIcon.getAttribute("data-state") === "open";

  if (window.scrollY > 100 || (isMobile && isOpen)) {
    navbar.classList.add("bg-grey");
    navbar.style.position = "fixed";
    navbar.style.top = "0";
    navbar.style.left = "0";
    navbar.style.width = "100%";
    navbar.style.zIndex = "2000";
  } else {
    navbar.classList.remove("bg-grey");
    navbar.style.position = "relative";
  }
};

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  const isClickInside =
    navList.contains(event.target) || hamburgerIcon.contains(event.target);

  if (!isClickInside && window.innerWidth <= 1140 && isMenuOpen) {
    toggleMenu();
  }
});

// Event listeners
hamburgerIcon.addEventListener("click", toggleMenu);
window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll);
window.addEventListener("DOMContentLoaded", () => {
  initializeMenu();
  handleResize();
});

// Get all process cards
const processCards = document.querySelectorAll(".process-card");

// Create SVG strings for plus and minus icons
const plusSVG = `<svg width="58" height="59" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="29" cy="29.5" r="28.5" fill="#F3F3F3" stroke="#191A23"/>
    <path d="M25.6 41.58V31.86H16V26.22H25.6V16.5H31.48V26.22H41.08V31.86H31.48V41.58H25.6Z" fill="#191A23"/>
</svg>`;

const minusSVG = `<svg width="58" height="59" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="29" cy="29.5" r="28.5" fill="#F3F3F3" stroke="#191A23"/>
    <path d="M16 31.86V26.22H41.08V31.86H16Z" fill="#191A23"/>
</svg>`;

// Function to close all sections except the current one
function closeOtherSections(currentCard) {
  processCards.forEach((card) => {
    if (card !== currentCard) {
      const hiddenContent = card.querySelector(".hidden");
      const svgContainer = card.querySelector(".header svg").parentElement;

      hiddenContent.style.display = "none";
      card.style.backgroundColor = "#F3F3F3";
      svgContainer.innerHTML = plusSVG;
      card.dataset.isOpen = "false";
    }
  });
}

// Function to create click handler for each card
function createToggleHandler(card) {
  return function toggleSection(event) {
    const hiddenContent = card.querySelector(".hidden");
    const svgContainer = card.querySelector(".header svg").parentElement;
    const isOpen = card.dataset.isOpen === "true";

    if (isOpen) {
      // Close current section
      hiddenContent.style.display = "none";
      card.style.backgroundColor = "#F3F3F3";
      svgContainer.innerHTML = plusSVG;
      card.dataset.isOpen = "false";
    } else {
      // Close other sections first
      closeOtherSections(card);

      // Open current section
      hiddenContent.style.display = "block";
      card.style.backgroundColor = "#B9FF66";
      svgContainer.innerHTML = minusSVG;
      card.dataset.isOpen = "true";
    }
  };
}

// Initialize all process cards
processCards.forEach((card) => {
  // Initialize data-is-open attribute
  card.dataset.isOpen = "false";

  // Create a container for the SVG if it doesn't exist
  const svgElement = card.querySelector(".header svg");
  const svgContainer = document.createElement("div");
  svgContainer.innerHTML = plusSVG;
  svgElement.parentElement.replaceChild(svgContainer, svgElement);

  // Add click event listener
  const toggleHandler = createToggleHandler(card);
  svgContainer.addEventListener("click", toggleHandler);

  // Add transition effect
  card.style.transition = "background-color 0.3s ease";
});
