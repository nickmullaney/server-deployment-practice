`use strict`;

// TODO: Write middleware

module.exports = (req, res, next) => {
  //if I want to know it exits, I can do this
  if(req.params.banana === 'banana'){
    next();
  } else {
    next('Path parameter must be banana');
  }
}