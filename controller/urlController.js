const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const Url = require('../model/Url');

exports.createShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseURL');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid base url',
    });
  }
  const urlCode = shortId.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.status(200).json({
          status: 200,
          message: 'Success',
          url,
        });
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.status(200).json({
          status: 200,
          message: 'Success',
          url,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      error: 'Invalid long url',
    });
  }
};