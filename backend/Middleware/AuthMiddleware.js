const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secret-key', (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).send(false);
      } else {
        
        next();
      }
    });
  } else {
    return res.status(401).send(false); 
  }
};

module.exports = jwtAuthMiddleware;
