// import { EventEmitter } from "events";

const parseCookies = (req, res, next) => {
  let cookieHeader = req.get('Cookie');

  req.cookies = {};

  if (cookieHeader) {
    let cookieArr = cookieHeader.split(';');
    for (let cookie of cookieArr) {
      cookie = cookie.trim();
      let [key, value] = cookie.split('=');
      req.cookies[key] = value;
    }
  }
  next();
};

module.exports = parseCookies;

// const parseCookies = (req, res, next) => {

//   let cookieString = req.get('Cookie') || '';

//   parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
//     if (cookie.length) {
//       let index = cookie.indexOf('=');
//       let key = cookie.slice(0, index);
//       let token = cookie.slice(index + 1);
//       cookies[key] = token;
//     }
//     return cookies;
//   }, {});

//   req.cookies = parsedCookies;

//   next();
// };

// module.exports = parseCookies;