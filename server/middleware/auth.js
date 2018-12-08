const models = require('../models');
const Promise = require('bluebird');
const Cookies = require('./cookieParser');

module.exports.createSession = (req, res, next) => {

  if (!req.get('Cookie')) {
    models.Sessions.create()
      .then((result) => {
        return models.Sessions.get({ id: result.insertId })
        // console.log(result);
      })
      .then((newResult) => {
        // console.log(newResult);
        req.session = { hash: newResult.hash }
        res.cookies = { 'shortlyid': { value: newResult.hash } }
        next();
      })
  } else {
    // if cookie header does exist
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

