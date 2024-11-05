const db = require("../config/database");
const delete_data = require("./delete_data");
const update = async (req, res) => {

    const PersonID = req.params.PersonID;
    if (!PersonID) {
      return res.status(404).send({
        success: false,
        message: "invalid PersonId",
      });
    }
    const { FirstName, LastName, Address, City, Username, Password } = req.body;
    delete_data(FirstName, LastName, Address, City, Username, Password, PersonID)
    if (PersonID===undefined) {
      return res.status(500).send({
        success: false,
        message: "failed to update Details",
      });
    }
    res.status(200).send({
      success: true,
      message: "Details updated successfully",
    });
  
};
module.exports = { update };
