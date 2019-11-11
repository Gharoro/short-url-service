const express = require('express');

const router = express.Router();

const indexController = require('../controller/indexController');

// @route     GET /:code
// @desc      Redirect to original/long URL
router.get('/:code', indexController.shortUrlRedirect);


module.exports = router;