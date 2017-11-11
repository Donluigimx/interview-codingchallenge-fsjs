'use strict';

const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [{
        item: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('List', listSchema);
