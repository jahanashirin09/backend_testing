const express=require("express")
const router=express.Router()
const {getStudent}=require("../controllers/getstudentDetails")
const{create}=require("../controllers/createDetails")
const {update}=require("../controllers/updateDetails")
const{deletedetails}=require("../controllers/delete")
router.get('/getall',getStudent)
router.post('/create',create);
router.put('/update/:PersonID',update)
router.delete('/delete/:PersonID',deletedetails)
module.exports=router