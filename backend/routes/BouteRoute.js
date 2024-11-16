const express = require('express')
const BoatRoute = express.Router();

let BoatModel = require('../models/Boat');

// Get Boats
BoatRoute.route('/').get((req, res, next) =>{
    BoatModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create Boat
BoatRoute.route('/').post((req, res, next) => {
    BoatModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get specific Boat details
BoatRoute.route('/:id').get((req, res, next) => {
    BoatModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update a specific boat
BoatRoute.route('/:id').put((req, res, next) => {
    BoatModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//Delete a specific boat
BoatRoute.route('/:id').delete((req, res, next) => {
    BoatModel.findByIdAndDelete(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
 module.exports = BoatRoute