import express from 'express';
import BoatModel from '../models/Boat.js';
import Joi from 'joi';
const BoatRoute = express.Router();

//Validate user input for POST and PUT for requestbody 
const boatSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().optional(),
    year: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    value: Joi.number().required(),
});

const validateBoat = (req, res, next) => {
    const { error } = boatSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details.map(detail => detail.message),
        });
    }
    next();
};
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
BoatRoute.route('/').post(validateBoat,(req, res, next) => {
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
BoatRoute.route('/:id').put(validateBoat,(req, res, next) => {
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
export default BoatRoute;