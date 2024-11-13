const db = require("../config/database");
var jwt = require("jsonwebtoken");
const login = async (req, res) => {
  if (!req.body.Username || !req.body.Password) {
    return res
      .status(400)
      .send({ error: "Username and Password are required" });
  }
  let Username = req.body.Username;
  let Password = req.body.Password;
  const data = await db.query(
    "SELECT * FROM Details WHERE Username=? and Password=?",
    [Username, Password]
  );
  const db_password = await db.query(
    "SELECT Password FROM Details WHERE Username=? and Password=?",
    [Username, Password]
  );
  if (Password.length == 0 || db_password[0][0] == undefined) {
    return res.status(401).send({
      success: false,
      message: "Login failed: invalid username or password",
    });
  }
  const user = data[0][0];
  let resp = {
    id: user.PersonID,
    name: user.FirstName,
  };
  const jwtSecret = process.env.JWT_SECRET;

  let token = jwt.sign(resp, jwtSecret, { expiresIn: 3600 });
  res.status(200).send({
    success: true,
    message: "logged successfully",
    token: token,
  });
};
module.exports = { login };
