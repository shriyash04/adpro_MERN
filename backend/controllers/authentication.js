let express = require('express');
const Employee = require('../models/Employee');
// const jwt = require("jsonwebtoken");


let router = express.Router();



router.post("/login", (req, res) => {
    let object = new Employee();
    object.username = req.body.username;
    object.password = req.body.password;

    object.login().then((result) => {
        res.json({ status: "success", data: result });
    }).catch((err) => {
        res.json({ status: "failed", data: err });
        
    });
});

module.exports = router;


// let express = require("express");
// const jwt = require("jsonwebtoken");
// const Employee = require("../models/Employee");

// const router = express.Router();
// const SECRET_KEY = "Shriyash@123";

// router.post("/login", (req, res) => {
//     let object = new Employee();
//     object.username = req.body.username;
//     object.password = req.body.password;

//     object.login()
//         .then((result) => {
//             if (result) {
//                 // Generate JWT token
//                 const token = jwt.sign(
//                     { id: result.id, username: result.username }, // Payload
//                     SECRET_KEY, // Secret Key
//                     { expiresIn: "1h" } // Token valid for 1 hour
//                 );

//                 res.json({
//                     status: "success",
//                     data: {
//                         user: result,
//                         token: token, // Include the JWT token in response
//                     },
//                 });
//             } else {
//                 res.status(401).json({
//                     status: "failed",
//                     message: "Invalid username or password",
//                 });
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 status: "failed",
//                 error: err,
//             });
//         });
// });

// module.exports = router;