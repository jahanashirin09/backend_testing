const db = require("../config/database");
async function data(
  PersonID,
  FirstName,
  LastName,
  Address,
  City,
  Username,
  Password
) {
  try {
    await db.query(
      "INSERT INTO Details (PersonID, FirstName, LastName, Address, City, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [PersonID, FirstName, LastName, Address, City, Username, Password]
    );
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
module.exports = data;
