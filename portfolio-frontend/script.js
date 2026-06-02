const API_URL = window.API_URL || "http://localhost:5000/api/profile";
const API_BASE = API_URL.replace(/\/api\/.*$/, "");
const PROFILE_API = `${API_BASE}/api/profile`;
const SKILLS_API = `${API_BASE}/api/skills`;
const EDUCATION_API = `${API_BASE}/api/education`;

const PROFILE = {
    name: "Sharon Saidi Sogoi",
    role: "Data Scientist"
};

function applyProfile(name, role) {
    document.getElementById("api-name").textContent = name;
    document.getElementById("api-role").textContent = role;
}

function renderSkills(skills) {
    const container = document.getElementById("skill-list");
    if (!container) return;
    container.innerHTML = "";
    skills.forEach((skill) => {
        const item = document.createElement("li");
        item.className = "skill-tag";
        item.textContent = skill;
        container.appendChild(item);
    });
}

function renderEducation(entries) {
    const container = document.getElementById("education-timeline");
    if (!container) return;
    container.innerHTML = "";
    entries.forEach((entry) => {
        const item = document.createElement("div");
        item.className = "timeline__item";
        item.innerHTML = `
            <span class="timeline__year">${entry.year}</span>
            <p class="timeline__title">${entry.title}</p>
            <p class="card__text">${entry.description}</p>
        `;
        container.appendChild(item);
    });
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
        const [profileResponse, skillsResponse, educationResponse] = await Promise.all([
            fetch(PROFILE_API),
            fetch(SKILLS_API),
            fetch(EDUCATION_API)
        ]);

        const [profileData, skillsData, educationData] = await Promise.all([
            profileResponse.json(),
            skillsResponse.json(),
            educationResponse.json()
        ]);

        const name = isPlaceholderName(profileData.name) ? PROFILE.name : profileData.name;
        const role = isPlaceholderRole(profileData.role) ? PROFILE.role : (profileData.role || PROFILE.role);
        applyProfile(name, role);

        if (Array.isArray(skillsData) && skillsData.length) {
            renderSkills(skillsData);
        }
        if (Array.isArray(educationData) && educationData.length) {
            renderEducation(educationData);
        }
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
