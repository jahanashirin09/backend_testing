const delete_data = require("./delete_data");
const deletedetails = async (req, res) => {
  const PersonID = req.params.PersonID;
  if (!PersonID) {
    return res.status(404).send({
      success: false,
      message: "Invalid PersonID",
    });
  }

  delete_data(PersonID);
  res.status(200).send({
    success: true,
    message: "Details deleted successfully",
  });
};

module.exports = { deletedetails };
