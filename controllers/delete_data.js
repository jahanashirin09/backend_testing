const db = require("../config/database");

async function delete_data(PersonID) {
  try {
    await db.query("DELETE FROM Details WHERE PersonID=?", [PersonID]);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

module.exports = delete_data;
