const db = require("../config/database");
async function update_data(
  FirstName,
  LastName,
  Address,
  City,
  Username,
  Password,
  PersonID
) {
  try {
    await db.query(
      `UPDATE Details SET FirstName=?,LastName=?,Address=?,City=?,Username=?,Password=? WHERE PersonID=?`,
      [FirstName, LastName, Address, City, Username, Password, PersonID]
    );
  } catch (error) {
    console.error("Error in updating data", error);
  }
}
module.exports = update_data;
