const db = require("../config/database");

async function delete_data(PersonID) {
  await db.query("DELETE FROM Details WHERE PersonID=?", [PersonID]);
}

module.exports = delete_data;
