"use strict";
const mon = require("./mongooseWrap");
const GovernmentForm = require("./GovernmentForm");
const dbServer = "localhost";
const dbName = "world";

exports.getGovernmentForms = async function (req, res, next) {
    try {
        let gf = await mon.retrieve(dbServer, dbName, GovernmentForm, {});
        return gf;
    } catch (e) {
        console.log(e);
    }
}