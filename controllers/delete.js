const db=require("../config/database")

const deletedetails=async(req,res)=>{
   try {
    const PersonID =req.params.PersonID
    if(!PersonID){
        return res.status(404).send({
            success: false,
            message: "Invalid ID",
        })
    }
    const data=await db.query("DELETE FROM Details WHERE PersonID=?",[PersonID])
    if(!data){
        return res.status(500).send({
            success: false,
            message: "Failed to delete ",
        })
    }
    res.status(200).send({
        success: true,
        message: "Student deleted successfully",
    })
    
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Server Error",
        error
    })
    
   }
    }


module.exports={deletedetails};