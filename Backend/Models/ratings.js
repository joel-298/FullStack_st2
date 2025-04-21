const db = require("../connection");

db.query(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        product_id INT,
        rate INT DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`, (error) => {
    if (error) {
        console.error("Table creation failed ❌", error);
    }
    else {
        console.log("Reviews table accessed successfully ✅");
    }
}
)