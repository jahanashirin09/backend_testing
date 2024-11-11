const express = require("express");
const router = express.Router();
const { getStudent } = require("../controllers/getDetails");
const { create } = require("../controllers/createDetails");
const { update } = require("../controllers/updateDetails");
const { deletedetails } = require("../controllers/delete");
const { login } = require("../controllers/loginDetails");
const { verifyToken } = require("../controllers/verifyToken");
router.get("/getall", verifyToken, getStudent);
router.post("/create", verifyToken, create);
router.put("/update/:PersonID", verifyToken, update);
router.delete("/delete/:PersonID", verifyToken, deletedetails);
router.post("/login", login);
module.exports = router;
