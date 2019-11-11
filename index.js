const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Coonect to database
const connectDB = require('./config/dbconn');

connectDB();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 2200;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));