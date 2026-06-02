const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PROFILE = {
    name: "Sharon Saidi Sogoi",
    role: "Data Scientist"
};

const SKILLS = [
    "Python",
    "Data Analysis",
    "Machine Learning",
    "Artificial Intelligence",
    "SQL",
    "Statistics",
    "JavaScript",
    "Git & GitHub"
];

const EDUCATION = [
    {
        year: "2023 - 2026",
        title: "Bachelor's in Data Science",
        description: "Final-year degree with a focus on analytics, machine learning, and AI-driven data projects."
    },
    {
        year: "2020 - 2023",
        title: "Advanced Data Analytics Coursework",
        description: "Completed coursework in statistics, probability, data visualization, and cloud-based data engineering."
    }
];

app.get('/', (req, res) => {
    res.send('Backend is running. Use /api/profile, /api/skills, or /api/education');
});

app.get('/api/profile', (req, res) => {
    res.json(PROFILE);
});

app.get('/api/skills', (req, res) => {
    res.json(SKILLS);
});

app.get('/api/education', (req, res) => {
    res.json(EDUCATION);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

