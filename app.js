const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

// Middleware
//-- Body parser --//
    // Parse app/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}));
    // Parse app/json
    app.use(bodyParser.json());

// Connect to db
connectDB();

// Define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const port = process.env.PORT || 9191;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//v=Z57566JBaZQ