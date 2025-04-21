const db = require('../connection.js')
db.query(`
    CREATE TABLE IF NOT EXISTS contact_us(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) not null , 
    email varchar(255) not null , 
    issue text not null 
    )     
`,(error)=>{
    if(error){
        console.error("Table creation failed ❌", error);
    }
    else{
        console.log("Contact_Us table accessed successfully ✅");
    }
})