let express = require('express');
const Holidays = require('../models/Holiday');

let router = express.Router();

router.get("/", (req, res)=>{
    let object = new Holidays();
    object.list().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

router.get("/:id", (req, res)=>{
    let object = new Holidays();
    object.id = req.params.id;
    object.get().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});


router.post("/", (req, res)=>{
    let object = new Holidays();
    object.id = 0;
    object.hdate = req.body.hdate;
    object.everyyear = req.body.everyyear;
    object.reason = req.body.reason;
    object.save().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

router.put("/:id", (req, res)=>{
    let object = new Holidays();
    object.id = req.params.id;
    object.hdate = req.body.hdateate;
    object.everyyear = req.body.everyyear;
    object.reason = req.body.reason;
    object.save().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

router.delete("/:id", (req, res)=>{
    let object = new Holidays();
    object.id = req.params.id;
    object.delete().then((result)=>{
        res.json({status:"success", data:result});
    }).catch((err)=>{
        res.json({status:"failed", data:err});
    });
});

module.exports = router;