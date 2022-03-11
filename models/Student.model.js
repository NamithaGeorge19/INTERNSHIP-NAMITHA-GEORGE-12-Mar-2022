const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var studentSchema = new mongoose.Schema({
    name: {
        type: String

    },
    rollNo: {
        type: Number
    },
    phoneNo: {
        type: Number
    },
    classId: {
        type: Number
    }
});

mongoose.model('Student', studentSchema);