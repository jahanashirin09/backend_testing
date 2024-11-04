const express = require("express");
const app = express();
const mysqlpool = require("./config/database");
app.use(express.json());
const routes = require("./routes/detailsRoutes");
app.use("/person", routes);
app.get("/user", (req, res) => {
  res.send("<h1>home</h1>");
});
app.get("*", (req, res) => {
  res.send("<h1>404 Error</h1>");
});
const PORT = process.env.process || 3001;
app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});
module.exports=app