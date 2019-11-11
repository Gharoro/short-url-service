const express = require('express');

const router = express.Router();

const urlController = require('../controller/urlController');

// @route   POST /api/url/shorten
// @dec     Create short URL
router.post('/shorten', urlController.createShortUrl);

module.exports = router;