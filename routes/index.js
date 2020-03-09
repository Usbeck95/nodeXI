const express = require('express');
const router = express.Router();
const modCountry = require("../models/handleCountries");
const modContinent = require("../models/handleContinents");
const modGovernmentForm = require("../models/handleGovernmentForms");
const modCity = require("../models/handleCities");
const modLanguage = require("../models/handleLanguages");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Fragments of the World',
        subtitle: 'Display and Register World Data'
    });
});

router.get('/country', async function(req, res, next) {
    let cs = await modCountry.getCountries({});
    res.render('country', {
        title: 'Fragments of the World',
        subtitle: 'Select Country',
        countries: cs
    });
});
router.post("/country", async function(req, res, next) {
    let cs = await modCountry.getCountries({name: req.body.ctry});
    res.render('countryDisplay', {
        title: 'Fragments of the World',
        subtitle: req.body.ctry,
        countries: cs
    });
});

router.get('/countryData', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, {sort: {name: 1}});
    let governmentforms = await modGovernmentForm.getGovernmentForms();
    res.render('countryData', {
        title: 'Fragments of the World',
        subtitle: 'Enter Country Data',
        continents,
        governmentforms
    });
});
router.post("/countryData", function(req, res, next) {
    modCountry.postCountry(req);
    res.redirect("/");
});

router.get('/langcont', async function(req, res, next) {
    let result = await modContinent.getContinents({}, {sort: {name: 1}});
    res.render('langcontform', {
        title: 'Fragments of the World',
        subtitle: 'Languages of a Continent',
        continents: result
    });
});
router.post('/langcont', async function(req, res, next) {
    let languages = await modLanguage.getLanguages({}, {sort: {language: 1, countrycode: 1}});
    let countries = await modCountry.getCountries({continent: req.body.continent}, {});
    let result = await modLanguage.mergeAndTally(languages, countries);
    res.render('langcont', {
        title: 'Fragments of the World',
        subtitle: 'Languages of a Continent',
        subsubtitle: req.body.continent,
        languages: result
    });
});

router.get('/langrankall', async function(req, res, next) {
    let languages = await modLanguage.getLanguages({}, {sort: {language: 1, countrycode: 1}});
    let countries = await modCountry.getCountries({}, {sort: {name: 1}});
    let result = await modLanguage.mergeAndTally(languages, countries);
    res.render('langrankall', {
        title: 'Fragments of the World',
        subtitle: 'Languages of the World, Ranked',
        languages: result
    });
});

router.get('/langrankone', async function(req, res, next) {
    let result = await modLanguage.getLanguages({}, {sort: {language: 1, countrycode: 1}});
    res.render('langrankoneform', {
        title: 'Fragments of the World',
        subtitle: 'Get Rank of a Language',
        subsubtitle: 'Chose Language',
        languages: result
    });
});
router.post('/langrankone', async function(req, res, next) {
    let languages = await modLanguage.getLanguages({}, {sort: {language: 1, countrycode: 1}});
    let countries = await modCountry.getCountries({}, {sort: {name: 1}});
    let result = await modLanguage.mergeAndTally(languages, countries, req.body.language);
    res.render('langrankone', {
        title: 'Fragments of the World',
        subtitle: `Get Rank of the Language ${req.body.language}`,
        languages: result
    });
});

router.get('/cntrycont', async function(req, res, next) {
    let result = await modCountry.getCountries({}, {sort: {continent: 1, name: 1}});
    res.render('cntrycont', {
        title: 'Fragments of the World',
        subtitle: 'Countries per Continent',
        countries: result
    });
});

router.get('/namesakes', async function(req, res, next) {
    let reslt1 = await modCity.getCities({}, {sort: {name: 1}});
    let result = await modCity.findNamesakes(reslt1);
    res.render('namesakes', {
        title: 'Fragments of the World',
        subtitle: 'Namesakes in other Countries',
        cities: result,
        count: result.length
    });
});

module.exports = router;
