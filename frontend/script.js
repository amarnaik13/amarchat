// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
      }
  });
});

function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('show');
}

function showHelp() {
  alert("How can we help you today?");
}

// Mobile menu toggle
const mobileMenu = () => {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  }
};

// Ensure nav-links visibility updates on window resize
window.addEventListener('resize', () => {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
      navLinks.style.display = window.innerWidth > 768 ? 'flex' : 'none';
  }
});

// Store selected template in localStorage
function selectTemplate(templateType) {
  localStorage.setItem('selectedTemplate', templateType);
  alert(`Selected ${templateType.charAt(0).toUpperCase() + templateType.slice(1)} template!`);
}

// Fetch templates from backend
async function fetchTemplates() {
  try {
      const response = await fetch("http://localhost:5000/api/templates"); // Fixed API call port
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const templates = await response.json();

      const templateList = templates.map(
          (template) => 
          `<div onclick="selectTemplate('${template.name}')">
              <h4>${template.name}</h4>
              <p>${template.description}</p>
          </div>`
      ).join("");

      const dragArea = document.querySelector(".drag-area");
      if (dragArea) {
          dragArea.innerHTML = templateList;
      }
  } catch (error) {
      console.error('Error fetching templates:', error);
      const dragArea = document.querySelector(".drag-area");
      if (dragArea) {
          dragArea.innerHTML = "<p>Error fetching templates.</p>";
      }
  }
}

// Ensure fetchTemplates is called when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchTemplates);
