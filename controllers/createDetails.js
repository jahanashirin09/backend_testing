const db = require("../config/database");
const create = async (req, res) => {
  try {
    const { PersonID, FirstName, LastName, Address, City, Username, Password } =
      req.body;
    if (
      !PersonID ||
      !FirstName ||
      !LastName ||
      !Address ||
      !City ||
      !Username ||
      !Password
    ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const data = await db.query(
      "INSERT INTO Details (PersonID,FirstName,LastName,Address,City,Username,Password) VALUES (?,?,?,?,?,?,?)",
      [PersonID, FirstName, LastName, Address, City, Username, Password]
    );
    res.status(201).send({
      success: true,
      message: "Details created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server Error",
      error,
    });
  }
};
module.exports = { create };
