let express = require('express');
const User = require('../models/User');

let router = express.Router();

router.get("/", (req, res) => {
    let object = new User();
    object.list().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
    });
});

router.post("/", (req, res) => {
    let object = new User();
    object.id = 0;
    object.fname = req.body.fname;
    object.lname = req.body.lname;
    object.email = req.body.email;
    object.password = req.body.password;
    object.save().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
    });
});

module.exports = router;