const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Insert Student"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var student = new Student();
    student.name = req.body.name;
    student.rollNo = req.body.rollNo;
    student.phoneNo = req.body.phoneNo;
    student.classId = req.body.classId;
    student.save((err, doc) => {
        if (!err)
            res.redirect('student/list');
        else {
            console.log('Error occured - ' + err);
        }
    });
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('student/list'); }
        else {
            console.log('Error occured - ' + err);
        }
    }).lean();
}

router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving student list :' + err);
        }
    }).lean();
});


router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
        }
    }).lean();
});


router.get('/delete/:id', (req, res) => {

    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list');
        }
        else { console.log('Error in student delete :' + err); }
    }).lean();
});





module.exports = router;