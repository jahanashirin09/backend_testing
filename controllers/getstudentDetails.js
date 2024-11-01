const db = require("../config/database");
const getStudent = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Details");

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No details found",
      });
    }
    res.status(200).send({
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "server error",
      error,
    });
  }
};
module.exports = { getStudent };
