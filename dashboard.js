// dashboard.js
const express = require('express');
const router = express.Router();
const connection = require('./config');

// Create the route to save data
router.post('/saveData', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO pages (title, description) VALUES (?, ?)';
    connection.query(query, [title, description], (err, result) => {
        if (err) throw err;
        res.send('Data saved successfully');
    });
});

module.exports = router;
