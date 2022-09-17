const express = require("express");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

async function run() {
  try {
    app.get("/comments", (req, res) => {
      const sqlGET = "SELECT * FROM comment";
      db.query(sqlGET, (err, result) => {
        res.send(result);
      });
    });

    app.post("/insert", (req, res) => {
      const uid = req.body.uid;
      const username = req.body.username;
      const body = req.body.body;
      const postID = req.body.postID;
      console.log(uid,username,body,postID)
      const sqlInsert =
        "INSERT INTO comment (body, uid, username, postID) VALUES (?,?,?,?)";
      db.query(sqlInsert, [body, uid, username, postID], (result, err) => {
        console.log(result)
      });
    });

    app.put('/update',(req,res) => {
      const uid = req.body.uid;
      const username = req.body.username;
      const body = req.body.body;
      const postID = req.body.postID;

      const sqlUPDATE = "UPDATE comment SET body =?, username =?, postID =? WHERE uid = ?";
      db.query(sqlUPDATE, [body, username, postID, uid], (result, err) => {
        if(err){
          console.log(err)
        }
        console.log(result)
      });
    })
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  /* const sqlInsert =
    "INSERT INTO comment (body, uid, username, postID) VALUES ('First comment',600, 'kashfee', 500);";
  db.query(sqlInsert, (err, result) => {
    if(err){
        console.log(err)
    }
    console.log(result)
    res.send("Welcome to mySql server");
  }); */
  res.send("Welcome to mySql server");
});
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
