const db = require("../config/database");
async function data() {
  await db.query("SELECT * FROM Details");
}
module.exports = data;
