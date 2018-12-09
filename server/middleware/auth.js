const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({ hash });
    })
    .then(session => {
      if (!session) {
        throw session;
      }
      return session;
    })
    .catch(() => {
      return models.Sessions.create()
        .then((result) => {
          return models.Sessions.get({ id: result.insertId });
        })
        .then((newResult) => {

          res.cookie('shortlyid', newResult.hash);

          return newResult;
        });
    })
    .then((session) => {
      req.session = session;
      next();
    });
};

// //   if (!req.get('Cookie')) {
// //     models.Sessions.create()
// //       .then((result) => {
// //         return models.Sessions.get({ id: result.insertId })
// //         console.log("here2");
// //       })
// //       .then((newResult) => {
// //         req.session = { hash: newResult.hash }
// //         // console.log(req.session);
// //         res.cookies = { 'shortlyid': { value: newResult.hash } }
// //         return next();
// //       })
// //       .catch((err) => {
// //         next();
// //         return res.status(301).location('/').send();
// //       });
// //   };
// // }

// // module.exports.updateSession = (req, res, next) => {
// //   if (req.cookies && Object.keys(req.cookies).length > 0) {
// //     // cookie exists
// //     console.log('i am here')
// //     models.Sessions.get({ hash: req.cookies.shortlyid })
// //       .then((result) => {
// //         req.session = {
// //           hash: result.hash,
// //           userId: result.userId
// //         };
// //         console.log('here1')
// //         return result.userId;
// //       })
// //       .then((userId) => {
// //         console.log('is it here?')
// //         return models.Users.get({ id: userId });
// //       })
// //       .then((anotherResult) => {
// //         console.log('what about here?')
// //         req.session.user = ({ username: anotherResult.username })
// //         return next();
// //       })
// //       .catch((err) => {
// //         console.log('nah its here')
// //         next();
// //         return res.status(301).location('/').send();
// //       });
// //   }
// // }
//       // ===========================================================


// /************************************************************/
// // Add additional authentication middleware functions below
// /************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }
};