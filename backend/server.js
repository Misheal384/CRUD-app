const express = require("express")//using the requie to access the express
const cors = require("cors");
const mysql = require("mysql");//the import the sql by using require"mysql"
const app = express();
app.use(express.json());



app.use(cors());

//creating a connection for the sql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
    port:"3308"
  });
//a route handler using the Express framework in Node.js.
app.get("/", (req, res) => {
  
 console.log("database connected") 

    const sql = "SELECT * FROM `student`"; // 
    
    db.query(sql, (err, data) => {
      if (err) 
        return res.json("Error not working");
      
      return res.json(data);
    });
  });

  app.post('/create', (req, res) =>{
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email
    ] 
    db.query(sql,[values], (err,data) =>{
      if(err) return res.status(409).json({"Error": err});
      return res.json(data);

    })
  })


  app.put('/update/:id', (req, res) =>{
    const sql = "update student set `Name` = ?, `Email` = ? where ID =?";
    const values = [
      req.body.name,
      req.body.email
    ]
    const id = req.params.id;

    db.query(sql,[...values,id], (err,data) =>{
      if(err) return res.json({"Error": err});
      return res.json(data);

    })
  })

  app.delete('/student/:id', (req, res) =>{
    const sql = "DELETE FROM student WHERE ID = ?";
    
    const id = req.params.id;

    db.query(sql, [id], (err,data) =>{
      if(err) return res.json({"Error": err});
      return res.json(data);

    })
  })



  app.listen(8081, () => {
    console.log("Server is running on port 8081");
  });



