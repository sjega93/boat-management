express = require('express'),
cors = require('cors'),
mongoose = require('mongoose'),
bodyParser = require('body-parser')
createError = require('http-errors')
const boatRoutes = require('../backend/routes/BouteRoute');


    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(cors());

    // API
    app.use('/api', boatRoutes);

    // create port
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
        console.log('Connected to port' + port)
    })

    // 404 Handler
app.use((req, res, next) => {
    next(createError(404))
})

    // error Handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})