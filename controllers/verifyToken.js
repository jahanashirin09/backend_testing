const db = require("../config/database");
var jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "no token provided"  
 });
    }
    console.log(authHeader);
    let token = authHeader.split(" ")[1];
    jwt.verify(token, "secret", function (err, decoded) {
      if (err) {
        res.status(500).send({
          error: "authentication failed",
        });
      } else {
        next();
      }
    });
  }
  module.exports = { verifyToken};