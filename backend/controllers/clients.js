let express = require('express');
const Clients = require('../models/Client');

let router = express.Router();

router.get("/", (req, res) => {
    let object = new Clients();
    object.list().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
    });
});

router.get("/:id", (req, res) => {
    let object = new Clients();
    object.id = req.params.id;
    object.get().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
    });
});

router.post("/", (req, res) => {
    let object = new Clients();
    object.id = 0;
    object.name = req.body.name;
    object.address = req.body.address;
    object.contact = req.body.contact;
    object.gstcode = req.body.gstcode;
    
    object.save().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
    });
});

router.put("/:id", (req, res) => {
    let object = new Clients();
    object.id = req.params.id;
    object.name = req.body.name;
    object.address = req.body.address;
    object.mobileno = req.body.mobileno;
    object.gstcode = req.body.gstcode;
    object.save().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
    });
});

router.delete("/:id", (req, res) => {
    let object = new Clients();
    object.id = req.params.id;
    object.delete().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
    });
});

module.exports = router;