
const db = require("../config/database");

async function data(PersonID, FirstName, LastName, Address, City, Username, Password) {
  await db.query(
    "INSERT INTO Details (PersonID, FirstName, LastName, Address, City, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [PersonID, FirstName, LastName, Address, City, Username, Password]
  );
}

module.exports = data;
