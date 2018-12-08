const models = require('../models');
const Promise = require('bluebird');
const Cookies = require('./cookieParser');

module.exports.createSession = (req, res, next) => {
  if (req.cookies && Object.keys(req.cookies).length > 0) {
    // cookie exists
    console.log('i am here')
    models.Sessions.get({ hash: req.cookies.shortlyid })
      .then((result) => {
        req.session = {
          hash: result.hash,
          userId: result.userId
        };
        console.log('here1')
        return result.userId;
      })
      .then((userId) => {
        console.log('is it here?')
        return models.Users.get({ id: userId });
      })
      .then((anotherResult) => {
        console.log('what about here?')
        req.session.user = ({ username: anotherResult.username })
        return next();
      })
      .catch((err) => {
        console.log('nah its here')
        next();
        return res.status(301).location('/').send();
      });
  } else {
    // cookie does not exist
    models.Sessions.create()
      .then((result) => {
        return models.Sessions.get({ id: result.insertId })
        console.log("here2");
      })
      .then((newResult) => {
        req.session = { hash: newResult.hash }
        // console.log(req.session);
        res.cookies = { 'shortlyid': { value: newResult.hash } }
        return next();
      })
      .catch((err) => {
        next();
        return res.status(301).location('/').send();
      });
  }
  // ===========================================================
  // if (!req.get('Cookie')) {
  //   models.Sessions.create()
  //     .then((result) => {
  //       return models.Sessions.get({ id: result.insertId })
  //       // console.log(result);
  //     })
  //     .then((newResult) => {
  //       req.session = { hash: newResult.hash }
  //       // console.log(req.session);
  //       res.cookies = { 'shortlyid': { value: newResult.hash } }
  //       console.log('working')
  //       next();
  //     })
  //     .catch((err) => {
  //       models.Sessions.get({ hash: req.cookies.shortlyid })
  //         .then((result) => {
  //           console.log('result', result);
  //           req.session = {
  //             hash: result.hash,
  //             userId: result.userId
  //           };
  //           return result.userId;
  //         })
  //         .then((userId) => {
  //           console.log(userId);
  //           return models.Users.get({ id: userId });
  //         })
  //         .then((anotherResult) => {
  //           req.session.user = ({ username: anotherResult.username })
  //           next();
  //         })
  //     });
  // }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

