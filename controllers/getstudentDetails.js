const db = require("../config/database");
const getStudent = async (req, res) => {

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

};
module.exports = { getStudent };
