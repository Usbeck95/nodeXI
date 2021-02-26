"use strict";
const mongoose = require("mongoose");
const validate = require('mongoose-validator');
mongoose.set('debug', true);
mongoose.set('debug', { color: false });

var codeValidator = [
  validate({
    validator: 'isLength',
    arguments: [3],
    message: 'Name should be 3 characters'
  }),
  validate({
    validator: 'matches',
    arguments: '/[A-Z][A-Z][A-Z]/',
    message: 'Name should contain alphabetic characters only'
  })
];

const countrySchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
        validate: codeValidator
    },
    name: String,
    continent: String,
    region: String,
    surfacearea: Number,
    indepyear: Number,
    population: Number,
    lifeexpectancy: Number,
    gnp: Number,
    gnpold: Number,
    localname: String,
    governmentform: String,
    headofstate: String,
    capital: Number,
    code2: String
});

module.exports = mongoose.model("Country", countrySchema, 'country');
