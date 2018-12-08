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