const express = require('express');
const router = express.Router();
const demo = require('../controllers/demo');

router.get('/new', demo.new)
router.get("/demomodels",demo.testmodels)
module.exports = router;
