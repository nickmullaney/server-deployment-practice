'use strict';

module.exports = (err, req, res, next) =>{

    const errorMessage = typeof(error) === 'string' ? error : error.message;
    
    res.status(500).send({
      //Ternary WTF(What, True, False)
      error: 500,
      route: req.path,
      query: req.query,
      path: req.params,
      body: req.body,
      message: `Server Error: ${errorMessage}`,
    });
  });
}