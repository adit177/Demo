const express = require('express');
const router = express.Router();
const demo = require('../controllers/demo');
const cloudinary = require('cloudinary').v2;

router.get('/new', demo.new)
router.get("/demomodels",demo.testmodels)
module.exports = router;
