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
