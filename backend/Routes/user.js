const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require('../Schema/User');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtkey = process.env.PRIVATE_KEY || "i am the key";

const { body, validationResult } = require("express-validator")

router.post('/createuser',
    body('username').isLength({ min: 6 })
    , async (req, res) => {
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            return res.status(400).json({ success: false, error: "Name must have atleast 6 charachter" });
        }
        try {
            let result = await User.findOne({ username: req.body.username });
            if (result) {
                return res.status(400).json({ success: false, error: "User with this username already exist" });

            }
            const haspass = await bcrypt.hash(req.body.password, 10);

            result = await User.create({
                username: req.body.username,
                password: haspass
            });

            const data = {
                id: result._id,
                username: result.username
            }
            const token = jwt.sign(data, jwtkey);

            return res.status(201).json({ authToken: token, success: true });

        } catch (err) {
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    })


router.post('/login',
    body('username').isLength({ min: 6 })
    , async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) { return res.status(500).json({ error: "invalid cred" }); }
        try {

            let user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ success: success, error: "No user found" })
            }
            let pass = await bcrypt.compare(req.body.password, user.password);
            if (!pass) {
                return res.status(404).json({ success: false, error: "Please enter valid password" })
            }
            if (user.isAdmin) {
                return res.status(404).json({ success: false, error: "Kindly login through admin" })
            }
            const data = {
                id: user._id,
                username: user.username
            }
            const token = jwt.sign(data, jwtkey);

            res.json({ authToken: token, success: true });

        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }
    })
router.post('/adminlogin',
    body('username').isLength({ min: 6 })
    , async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) { return res.status(500).json({ error: "invalid cred", success: false }); }
        try {
            let user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ success: false, error: "No user found" })
            }
            let pass = await bcrypt.compare(req.body.password, user.password);
            if (!pass) {
                return res.status(404).json({ success: false, error: "Please enter valid password" })
            }
            if (!user.isAdmin) {
                return res.status(404).json({ success: false, error: "Only admins can login here" })
            }
            const data = {
                id: user._id,
                username: user.username
            }
            const token = jwt.sign(data, jwtkey);

            res.json({ authToken: token, success: true });

        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }
    })

module.exports = router;