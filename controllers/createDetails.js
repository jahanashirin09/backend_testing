const data = require("./create_data");
const create = async (req, res) => {
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
  data(PersonID, FirstName, LastName, Address, City, Username, Password);
  res.status(201).send({
    success: true,
    message: "Details created successfully",
  });
};
module.exports = { create };
