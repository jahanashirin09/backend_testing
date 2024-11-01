const db = require("../config/database");
const update = async (req, res) => {
  try {
    const PersonID = req.params.PersonID;
    if (!PersonID) {
      return res.status(404).send({
        success: false,
        message: "invalid PersonId",
      });
    }
    const { FirstName, LastName, Address, City, Username, Password } = req.body;
    const data = await db.query(
      `UPDATE Details SET FirstName=?,LastName=?,Address=?,City=?,Username=?,Password=? WHERE PersonID=?`,
      [FirstName, LastName, Address, City, Username, Password, PersonID]
    );
    if (!data) {
      return res.status(500).send({
        success: false,
        message: "failed to update Details",
      });
    }
    res.status(200).send({
      success: true,
      message: "Details updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};
module.exports = { update };
