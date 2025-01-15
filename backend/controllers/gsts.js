let express = require('express');
const Gsts = require('../models/Gst');

let router = express.Router();

router.get("/", (req, res)=>{
    let object = new Gsts();
    object.list().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

router.get("/:id", (req, res)=>{
    let object = new Gsts();
    object.id = req.params.id;
    object.get().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});


router.post("/", (req, res)=>{
    let object = new Gsts();
    object.id = 0;
    object.name = req.body.name;
    object.hsncode = req.body.hsncode;
    object.cgst = req.body.cgst;
    object.sgst = req.body.sgst;
    object.igst = req.body.igst;
    object.save().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

router.put("/:id", (req, res)=>{
    let object = new Gsts();
    object.id = req.params.id;
    object.name = req.body.name;
    object.hsncode = req.body.hsncode;
    object.cgst = req.body.cgst;
    object.sgst = req.body.sgst;
    object.igst = req.body.igst;
    object.save().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

router.delete("/:id", (req, res)=>{
    let object = new Gsts();
    object.id = req.params.id;
    object.delete().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

module.exports = router;