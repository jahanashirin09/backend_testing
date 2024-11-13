const db = require("../config/database");
async function data() {
  try {
    const result = await db.query("SELECT * FROM Details");
    return result[0];
  } catch (error) {
    console.error("Error in getting data", error);
  }
}
module.exports = data;
