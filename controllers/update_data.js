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
  await db.query(
    `UPDATE Details SET FirstName=?,LastName=?,Address=?,City=?,Username=?,Password=? WHERE PersonID=?`,
    [FirstName, LastName, Address, City, Username, Password, PersonID]
  );
}
module.exports = update_data;
