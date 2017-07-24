// load the things we need
var mongoose = require('mongoose');

// define the schema for our map entry model
var mapEntrySchema = mongoose.Schema({
    userId: {
        type: String
    },
    fullAddress: {
        type: String
    },
    /*lat: {
        type: Number,
        decimal: true
    },
    lng: {
        type: Number,
        decimal: true
    },*/
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    geometry: {
        type: Object,
        blackbox: true
    },
    placeId: {
        type: String
    },
    street: {
        type: String,
        max: 100
    },
    city: {
        type: String,
        max: 50
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    country: {
        type: String
    },
    entryType: {
        type: String
    }
});

// create the model for map entry and expose it to our app
module.exports = mongoose.model('MapEntry', mapEntrySchema);