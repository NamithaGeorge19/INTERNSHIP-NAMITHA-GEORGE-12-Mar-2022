const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var classDetailSchema = new mongoose.Schema({
    standard: {
        type: Number
    },

    division: {
        type: String
    }
});

mongoose.model('ClassDetail', classDetailSchema);