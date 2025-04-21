const mysql = require("mysql2")

const db = mysql.createConnection({
    host : "localhost" , 
    user : "root" , 
    password : "chitkara@joel29879",
    database : "urbancart"
})

db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Database Connected Successfully");
    }
})
module.exports = db;