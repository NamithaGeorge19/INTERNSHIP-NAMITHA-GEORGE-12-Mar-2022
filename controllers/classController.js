const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ClassDetail = mongoose.model('ClassDetail');

router.get('/', (req, res) => {
    res.render("class/classAddOrEdit", {
        viewTitle: "Insert Class"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});;


function insertRecord(req, res) {
    var classDetail = new ClassDetail();
    classDetail.standard = req.body.standard;
    classDetail.division = req.body.division;

    classDetail.save((err, doc) => {
        if (!err)
            res.redirect('class/classList');
        else {
            console.log('Error occured - ' + err);
        }
    });
}

function updateRecord(req, res) {
    ClassDetail.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('class/classList'); }
        else {
            console.log('Error occured - ' + err);
        }
    }).lean();
}



router.get('/classList', (req, res) => {
    ClassDetail.find((err, docs) => {
        if (!err) {
            res.render("class/classList", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Class list :' + err);
        }
    }).lean();
});

router.get('/:id', (req, res) => {
    ClassDetail.findById(req.params.id, (err, doc) => {
        console.log(doc)
        if (!err) {
            res.render("class/classAddOrEdit", {
                viewTitle: "Update ClassDetail",
                classDetail: doc
            });
        }
    }).lean();
});


router.get('/delete/:id', (req, res) => {
    ClassDetail.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/class/classList');
        }
        else { console.log('Error in class delete :' + err); }
    }).lean();
});



module.exports = router;