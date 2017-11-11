'use strict';

const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    name: String,
    items: [{item: String}]
});

module.exports = mongoose.model('List', listSchema);
