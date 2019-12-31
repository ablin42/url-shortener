const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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

app.get('*', (req, res) => {
try {
    let obj = {
        active: "404"
    };
    res.status(404).render('404', obj);
} catch (err) {
    console.error("404 PAGE ERROR:", err.message)
    res.status(500).render('views/index', {active: "Home"});
}});

const port = process.env.PORT || 9191;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//v=Z57566JBaZQ