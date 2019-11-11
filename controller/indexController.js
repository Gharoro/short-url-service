const Url = require('../model/Url');

exports.shortUrlRedirect = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({
        status: 404,
        error: 'No url found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: 'Server error',
    });
  }
};