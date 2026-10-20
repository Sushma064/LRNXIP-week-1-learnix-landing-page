
// ---------- Mobile Navigation ----------
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu when a navigation link is clicked
navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// ---------- Footer Year ----------
document.getElementById("year").textContent =
    new Date().getFullYear();

// ---------- Contact Form Validation ----------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    domain: document.getElementById("domain"),
    message: document.getElementById("message")
};

function showError(field, message) {
    field.classList.add("invalid");

    document.getElementById(field.id + "Error").textContent = message;
}

function clearError(field) {
    field.classList.remove("invalid");

    document.getElementById(field.id + "Error").textContent = "";
}

function validateForm() {
    let isValid = true;

    // Validate name
    const name = fields.name.value.trim();

    if (name.length < 2) {
        showError(fields.name, "Please enter at least 2 characters.");
        isValid = false;
    } else if (name.length > 80) {
        showError(fields.name, "Name must be 80 characters or fewer.");
        isValid = false;
    } else {
        clearError(fields.name);
    }

    // Validate email
    const email = fields.email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) || email.length > 254) {
        showError(fields.email, "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError(fields.email);
    }

    // Validate selected internship domain
    if (fields.domain.value === "") {
        showError(fields.domain, "Please select an internship domain.");
        isValid = false;
    } else {
        clearError(fields.domain);
    }

    // Validate message
    const message = fields.message.value.trim();

    if (message.length < 10) {
        showError(fields.message, "Message must contain at least 10 characters.");
        isValid = false;
    } else if (message.length > 1000) {
        showError(fields.message, "Message must be 1000 characters or fewer.");
        isValid = false;
    } else {
        clearError(fields.message);
    }

    return isValid;
}

// Clear individual field errors while the user types
Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
        clearError(field);
        formStatus.textContent = "";
        formStatus.className = "form-status";
    });

    field.addEventListener("change", () => {
        clearError(field);
        formStatus.textContent = "";
        formStatus.className = "form-status";
    });
});

// Handle form submission
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.textContent = "";
    formStatus.className = "form-status";

    if (!validateForm()) {
        formStatus.textContent = "Please correct the errors above.";
        formStatus.classList.add("failure");

        contactForm.querySelector(".invalid")?.focus();
        return;
    }

    // Frontend demonstration only: no message is sent to a server.
    formStatus.textContent =
        "Validation successful! The form is ready to be connected to a backend.";
    formStatus.classList.add("success");

    contactForm.reset();

    Object.values(fields).forEach(clearError);
});
