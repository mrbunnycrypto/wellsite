const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./config');
const app = express();
const port = 3000;

require('dotenv').config();

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Admin route for development mode (only accessible if DEV_MODE is true)
app.get('/admin', (req, res) => {
    if (process.env.DEV_MODE === 'true') {
        res.render('admin-dashboard');
    } else {
        res.send('Access Denied!');
    }
});

// Route for building a website
app.get('/build', (req, res) => {
    res.render('dashboard');
});

// Route to insert new data into the SQL database
app.post('/saveData', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO pages (title, description) VALUES (?, ?)';
    connection.query(query, [title, description], (err, result) => {
        if (err) throw err;
        res.send('Data saved successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
