"use strict";
/*
 * wrapper for CRUD functionality of a mongodb with mongoose
 */
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.set('debug', { color: false });

const conparam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

const connect = async function(url, dbn) {
    const constr = `mongodb://${url}:27017/${dbn}`;
    await mongoose.connect(constr, conparam);
    return mongoose.connection;
}

exports.distinct = async function(url, dbn, obj, query, sort) {
    const db = await connect(url,dbn);
    let stuff = [];
    try {
        stuff = await obj.distinct(query);
    } catch(err) {
        console.log(error);
    } finally {
        db.close();
        return stuff;
    }
}

exports.retrieve = async function(url, dbn, obj, query, sort) {
    const db = await connect(url,dbn);
    let stuff = null;
    try {
        stuff = await obj.find(query, null, sort);
    } catch(err) {
        console.log(error);
    } finally {
        db.close();
        return stuff;
    }
}

exports.upsert = async function(url, dbn, obj, query, chk) {
    const db = await connect(url,dbn);
    let newquery = query.toObject();        // from SO, the necessity
    delete newquery._id;                    // must be a mongooseerror
    let stuff = null;
    try {
        stuff = await obj.findOneAndUpdate(chk, query, {upsert: true});
    } catch(err) {
        console.log(error);
    } finally {
        db.close();
        return stuff;
    }
}