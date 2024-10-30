const db=require("../config/database")



//CREATE STUDENT

const create=async(req,res)=>{
    try {
        const{PersonID,FirstName,LastName,Address,City}=req.body
        if(!PersonID||!FirstName||!LastName||!Address||!City){
            return res.status(500).send({
                success: false,
                message: "Please provide all required fields",
            })
        }
        const data=await db.query("INSERT INTO Details (PersonID,FirstName,LastName,Address,City) VALUES (?,?,?,?,?)",[PersonID,FirstName,LastName,Address,City])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Failed to create student",
            })
        }
        res.status(201).send({
          success: true,
          message: "Details created successfully",
          
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Server Error",
            error
        })
        
    }
}
module.exports={create};

