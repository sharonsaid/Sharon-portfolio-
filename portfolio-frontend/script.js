const API_URL = "http://localhost:5000/api/profile";

const PROFILE = {
    name: "Sharon Saidi Sogoi",
    role: "Data Scientist"
};

function applyProfile(name, role) {
    document.getElementById("api-name").textContent = name;
    document.getElementById("api-role").textContent = role;
}

function isPlaceholderName(name) {
    return !name || /your full name|your name here/i.test(name);
}

function isPlaceholderRole(role) {
    return !role || /cloud computing specialist|^data science$/i.test(role);
}

async function getBackendData() {
    applyProfile(PROFILE.name, PROFILE.role);

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const name = isPlaceholderName(data.name) ? PROFILE.name : data.name;
        const role = isPlaceholderRole(data.role) ? PROFILE.role : (data.role || PROFILE.role);
        applyProfile(name, role);
    } catch (error) {
        console.error("API error:", error);
        applyProfile(PROFILE.name, PROFILE.role);
    }
}

function initScrollReveal() {
    const cards = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    cards.forEach((card) => observer.observe(card));
}

function initNavHighlight() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "nav__link--active",
                            link.getAttribute("href") === `#${id}`
                        );
                    });
                }
            });
        },
        { threshold: 0.35, rootMargin: "-100px 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
}

getBackendData();
initScrollReveal();
initNavHighlight();
