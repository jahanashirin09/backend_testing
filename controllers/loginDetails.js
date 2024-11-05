const db = require("../config/database");
var jwt = require("jsonwebtoken");


function verifyToken(req,res,next){
  let authHeader=req.headers.authorization;
  if(authHeader==undefined){
      res.status(401).send({error:"no token provided"})
  }
  let token =authHeader.split(" ")[1]
  jwt.verify(token,"secret",function(err,decoded){
      if(err){
          res.status(500).send(
              {
                  error:"authenticatio failed"
              }
          )
      }
      else{
         next();
      }
  })
  
}
const login= async(req,res) =>{
  try {
    if (!req.body.Username || !req.body.Password) {
            return res
              .status(400)
              .send({ error: "Username and Password are required" });
          }
          let Username = req.body.Username;
          let Password = req.body.Password;
      
      const data=await db.query("SELECT * FROM Details WHERE Username=? and Password=?",[Username,Password]);
      const db_password=await db.query("SELECT Password FROM Details WHERE Username=? and Password=?",[Username,Password]);
     // const user_password= db_password[0][0].password;

      // console.log(data[0][0].display_name)
      console.log(data);
      console.log(db_password);
      
    
      if (Password.length == 0 || db_password[0][0] == undefined) {
              return res.status(401).send({
                success: false,
                message: "Login failed: invalid username or password",
              });
            }
            const user = data[0][0];

                let resp = {
                  id: user.PersonID,
                  name: user.FirstName,
                };
            
                let token = jwt.sign(resp, "secret", { expiresIn: 3600 });
                res.status(200).send({
                  success: true,
                  message: "logged successfully",
                  token: token,
                });

      
      
  } catch (error) {
      {
          console.log(error)
          res.status(500).send({ 
          success:false,
          message: "Server Error",
          error
          })
      }
      
  }
  
};
module.exports={login,verifyToken};
// const login = async (req, res) => {
//   try {
//     if (!req.body.Username || !req.body.Password) {
//       return res
//         .status(400)
//         .send({ error: "Username and Password are required" });
//     }
//     let Username = req.body.Username;
//     let Password = req.body.Password;
//     const data = await db.query(
//       "SELECT * FROM Details WHERE Username=?  AND Password=?",
//       [Username, Password]
//     );
//     const db_password = await db.query(
//       "SELECT password FROM Details WHERE username=? and password=?",
//       [Username, Password]
//     );
//     console.log(data);
//     if (Password.length == 0 || db_password[0][0] == undefined) {
//       return res.status(401).send({
//         success: false,
//         message: "Login failed: invalid username or password",
//       });
//     }

//     const user = data[0][0];

//     let resp = {
//       id: user.PersonID,
//       name: user.FirstName,
//     };

//     let token = jwt.sign(resp, "secret", { expiresIn: 60 });
//     res.status(200).send({
//       success: true,
//       message: "logged successfully",
//       token: token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "server error",
//       error,
//     });
//   }
// };
// module.exports = { login, verifyToken };
