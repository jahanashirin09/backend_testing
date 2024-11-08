const db = require("../config/database");
const update_data = require("./update_data");
const update = async (req, res) => {
  const PersonID = req.params.PersonID;
  if (!PersonID) {
    return res.status(404).send({
      success: false,
      message: "invalid PersonId",
    });
  }
  const { FirstName, LastName, Address, City, Username, Password } = req.body;
  update_data(FirstName, LastName, Address, City, Username, Password, PersonID);

  res.status(200).send({
    success: true,
    message: "Details updated successfully",
  });
};
module.exports = { update };
