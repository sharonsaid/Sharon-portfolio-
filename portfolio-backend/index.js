const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

