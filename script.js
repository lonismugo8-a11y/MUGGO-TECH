const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileBackdrop = document.querySelector(".mobile-menu-backdrop");
const mobileLinks = document.querySelectorAll(".mobile-nav a, .desktop-nav a");
const yearNode = document.getElementById("currentYear");

if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

const syncHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

const setMenuState = (open) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("menu-open", open);
};

setMenuState(false);

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setMenuState(!isOpen);
    });
}

if (mobileBackdrop) {
    mobileBackdrop.addEventListener("click", () => setMenuState(false));
}

mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
        setMenuState(false);
    }
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-page]").forEach((link) => {
    const matches = link.getAttribute("href") === currentPage;
    link.classList.toggle("is-active", matches);
    if (matches) {
        link.setAttribute("aria-current", "page");
    }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const quoteForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(quoteForm);
        const name = (data.get("name") || "").toString().trim();
        const phone = (data.get("phone") || "").toString().trim();
        const service = (data.get("service") || "").toString().trim();
        const brand = (data.get("brand") || "").toString().trim();
        const issue = (data.get("issue") || "").toString().trim();

        const message = [
            "Hello MUGGO TECH Computers, I would like a repair quote.",
            `Name: ${name || "Not provided"}`,
            `Phone: ${phone || "Not provided"}`,
            `Service Needed: ${service || "Not selected"}`,
            `Laptop Model: ${brand || "Not provided"}`,
            `Issue: ${issue || "Not provided"}`
        ].join("\n");

        const whatsappUrl = `https://wa.me/254759849524?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank", "noopener");

        if (formStatus) {
            formStatus.textContent = "Your message is ready in WhatsApp. Send it there and we’ll reply with a quote.";
        }
    });
}
