// ================================
// MOBILE MENU TOGGLE
// ================================
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");

    // Change icon between open and close
    menuToggle.textContent = mobileMenu.classList.contains("active") ? "✖" : "☰";
});

// Close menu when clicking any link
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


// ================================
// AUTO UPDATE YEAR IN FOOTER
// ================================
document.getElementById("currentYear").textContent = new Date().getFullYear();


// ================================
// ADD SHADOW ON SCROLL (HEADER)
// ================================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("header-shadow");
    } else {
        header.classList.remove("header-shadow");
    }
});


// ================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const section = document.querySelector(this.getAttribute("href"));
        if (section) {
            e.preventDefault();
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
});
