const db=require("../config/database")
const update=async(req,res)=>{
   try {
     const PersonID=req.params.PersonID
     if(!PersonID){
        return res.status(404).send({
            success:false,
            message:"invalid PersonId"
        })
     }
     const{FirstName,LastName,Address,City}=req.body 
     const data=await db.query(`UPDATE Details SET FirstName=?,LastName=?,Address=?,City=? WHERE PersonID=?`,[FirstName,LastName,Address,City,PersonID])
     if(!data){
        return res.status(500).send({
            success:false,
            message:"failed to update"
        })
     }
     res.status(200).send({
        success:true,
        message:"student updated successfully"
     })
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Server error",
        error
    })

    
   }
}
module.exports={update}