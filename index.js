  const express=require("express");
  const app=express()
  const  mysqlpool=require("./config/database")
  app.use(express.json());
  const routes=require("./routes/detailsRoutes")
  app.use("/student",routes)
  app.get("/user",(req,res)=>{
    res.send("<h1>home</h1>")
  })
  const PORT=process.env.process ||3003;
  app.listen(PORT,()=>{console.log(`server running in ${PORT}`)})
//   mysqlpool
// .query("SELECT * FROM Details")
// .then(()=>{
//     console.log("Database Connected");

//     app.listen(PORT,()=>{
//         console.log("server running")
//     });

// })
// .catch((error)=>{
//     console.error(error);
// });