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

      const dragArea = document.querySelector(".drag-area");
      if (dragArea) {
          dragArea.innerHTML = ""; // Clear previous content

          templates.forEach((template) => {
              const templateDiv = document.createElement("div");
              templateDiv.classList.add("template-item"); // Add a class for styling
              templateDiv.dataset.template = template.name; // Store template name in data attribute
              templateDiv.innerHTML = `
                  <h4>${template.name}</h4>
                  <p>${template.description}</p>
                  <button class="select-btn">Select</button>
              `;

              // Add event listener to each "Select" button
              templateDiv.querySelector(".select-btn").addEventListener("click", function() {
                  selectTemplate(template.name);
              });

              dragArea.appendChild(templateDiv);
          });
      }
  } catch (error) {
      console.error("Error fetching templates:", error);
      const dragArea = document.querySelector(".drag-area");
      if (dragArea) {
          dragArea.innerHTML = "<p>Error fetching templates.</p>";
      }
  }
}

// Ensure fetchTemplates is called when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchTemplates);

// New Functionality: Change Chatbot Appearance (from previous code)
document.addEventListener("DOMContentLoaded", function () {

    // Handle color picker for primary color
    const primaryColorPicker = document.getElementById("primaryColor");
    primaryColorPicker.addEventListener("input", function () {
        document.documentElement.style.setProperty("--primary-color", this.value);
    });

    // Handle color picker for header color
    const headerColorPicker = document.getElementById("headerColor");
    headerColorPicker.addEventListener("input", function () {
        document.documentElement.style.setProperty("--header-color", this.value);
    });

    // Handle color picker for user message bubble color
    const userBubbleColorPicker = document.getElementById("userBubbleColor");
    userBubbleColorPicker.addEventListener("input", function () {
        document.documentElement.style.setProperty("--user-bubble", this.value);
    });

    // Handle color picker for bot message bubble color
    const botBubbleColorPicker = document.getElementById("botBubbleColor");
    botBubbleColorPicker.addEventListener("input", function () {
        document.documentElement.style.setProperty("--bot-bubble", this.value);
    });

    // Handle range slider for adjusting message bubble radius
    const bubbleRadiusSlider = document.getElementById("bubbleRadius");
    bubbleRadiusSlider.addEventListener("input", function () {
        document.documentElement.style.setProperty("--bubble-radius", `${this.value}px`);
    });

    // Handle range slider for adjusting input border radius
    const inputRadiusSlider = document.getElementById("inputRadius");
    inputRadiusSlider.addEventListener("input", function () {
        document.documentElement.style.setProperty("--input-radius", `${this.value}px`);
    });

    // Handle file upload for changing chatbot logo
    const logoUpload = document.getElementById("logoUpload");
    const logoPreview = document.getElementById("logoPreview");
    logoUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                logoPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

});

function selectTemplate(templateType) {
  localStorage.setItem('selectedTemplate', templateType);
  alert(`Selected ${templateType.charAt(0).toUpperCase() + templateType.slice(1)} template!`);
  
  // Redirect to the main page after selection
  window.location.href = 'main.html'; // Change this to the URL of your main page
}

