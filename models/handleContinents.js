"use strict";
const mon = require("./mongooseWrap");
const Continent = require("./Continent");
const dbServer = "localhost";
const dbName = "world";

exports.getContinents = async function (sort) {
    try {
        let cs = await mon.retrieve(dbServer, dbName, Continent, {}, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}