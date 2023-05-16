`use strict`;

module.exports = (req, res, next) => {
  console.log('Fourth Middleware Hit!');
  // next('feed it anything to cause an error');
  // next called with no argument means move on to the next middleware
  next();
};


