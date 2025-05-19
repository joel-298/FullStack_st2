const express = require("express");
const products = express();
const db = require("../connection.js")



products.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM products WHERE id = ?`;

  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error("DB error fetching product:", error);
      return res.status(500).send({ success: false, message: "Failed to fetch product details" });
    }

    if (results.length === 0) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    // Send back the single product object
    res.status(200).send(results[0]);
  });
});


// GET ALL PRODUCTS 
products.get("/",(req,res)=>{
    db.query('SELECT * FROM products',(error,results)=>{
        if(error){
            return res.status(500).send({message:"Products Not Found ❌",error});
        }

        const formattedResults = results.map(product => ({
            ...product,
            images: JSON.parse(product.images)
        }));

        res.send(formattedResults);
    })
})

// adding product !
products.post("/add",(req,res)=>{
    const {name,company,images,quantity,price,category,description} = req.body
    console.log(req.body) ; 
    
    db.query('INSERT INTO products (name,company,images,qty,price,category,description) VALUES (?,?,?,?,?,?,?)', [name,company,images,quantity,price,category,description],(error)=>{
        if(error){
            return res.status(500).send({message:"Product Not Added ❌",error});
        }

        res.status(201).send({message:"Product added successfully ✅"})
    })
})

// Delete Product 
products.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM products WHERE id = ?", [id], (error) => {
        if (error) {
            return res.status(500).send({ boolean: false, message: "Product was not deleted ❌" });
        }

        res.status(200).send({ boolean: true, message: "Product deleted successfully! ✅" });
    });
});

// Edit Product
products.patch("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { name, images, qty, price, category, description } = req.body;

    const sql = `
        UPDATE products 
        SET 
            name = ? ,
            images = ? ,
            qty = ? ,
            price = ? ,
            category = ? ,
            description = ?
        WHERE id = ?
    `;


    // in frontend : User will see all the images and edit or delete one or two therefore images will always keep on updating 
    db.query(sql, [name, images, qty, price, category, description, id], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ boolean: false, message: "Unable to edit product! ❌" });
        }
        res.status(200).send({ boolean: true, message: "Product updated successfully! ✅" });
    });
});



// FILTER FUNCTIONS !
products.get("/mobile",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["mobile"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

products.get("/laptop",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["laptop"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

products.get("/watch",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["watch"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

products.get("/accessories",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["accessories"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

module.exports = products










