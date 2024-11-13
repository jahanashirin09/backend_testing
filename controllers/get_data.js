const db = require("../config/database");
async function data() {
  const result = await db.query("SELECT * FROM Details");
  return result[0]
}
module.exports = data;
