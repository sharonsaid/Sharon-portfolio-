const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// Serve frontend static files
const frontendPath = path.join(__dirname, '..', 'portfolio-frontend');
app.use(express.static(frontendPath));

app.get('/api/profile', (req, res) => {
    res.json({
        name: "Sharon Saidi Sogoi",
        role: "Data Scientist"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running smoothly on port ${PORT}`);
});

// Fallback: serve index.html for any other route (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});