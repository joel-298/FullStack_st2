const express = require("express") ; 
const contact_us = express.Router() ; 
const connection = require("../connection") ; 


contact_us.post('/' , (req,res)=>{
    const {name, email, message} = req.body ; 

    connection.query('INSERT INTO contact_us (name, email, issue) VALUES (?, ?, ?)' ,[name,email,message], (error) => {
        if(error) {
            res.json({boolean : false}) ; 
        } 
        res.json({boolean : true}) ; 
    });
});


module.exports = contact_us ;  