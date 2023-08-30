const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bgc-data",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database: ", err);
        return;
    }
    console.log("Connected to MySQL database!");
});

app.post('/api/test-database', (req, res) => {
    const query = "SELECT * FROM bgc";
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error executing the query: ", err);
            return res.status(500).json({ success: false, error: 'Error connecting to the database' });
        }
        if (result.length > 0) {
            const data = result;
            res.json({ success: true, message: "Success", data: data });
        } else {
            res.json({ success: false, message: "Not Success" });
        }
    });
});

app.get('/api/test-api', (req, res) => {
    res.json({ success: true, message: 'Data fetched from Xamapp' });
});

app.post('/api/get-data', (req, res) => {
    const query = "SELECT * FROM bgc";
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error executing the query: ", err);
            return res.status(500).json({ success: false, error: 'Error connecting to the database' });
        }
        if (result.length > 0) {
            const data = result;
            res.json({ success: true, message: "Success", data: data });
        } else {
            res.json({ success: false, message: "Not Success" });
        }
    });
});

app.post("/api/add-data", (req, res) => {
    const query = "INSERT INTO bgc (OrderDate, Region, City, Category, Product, Quantity, UnitPrice, TotalPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ";
    const OrderDate = req.body.OrderDate;
    const Region = req.body.Region;
    const City = req.body.City;
    const Category = req.body.Category;
    const Product = req.body.Product;
    const Quantity = req.body.Quantity;
    const UnitPrice = req.body.UnitPrice;
    const TotalPrice = req.body.TotalPrice;

    db.query(query, [OrderDate, Region, City, Category, Product, Quantity, UnitPrice, TotalPrice], (err, result) => {
        if (err) {
            console.error("Error executing MySQL query: ", err);
            res.status(500).json({ error: "An error occurred while processing your request." });
        } else {
            if (result.affectedRows > 0) {
                res.json({ success: true, message: "Insertion successful!" });
            } else {
                res.json({ success: false, message: "Insertion failed." });
            }
        }
    });
});

app.post('/api/delete-data', (req, res) => {
    const query = "DELETE FROM bgc WHERE bgc.orderId = ?";
    const id = req.body.id;
    db.query(query, [id, id], (err, result) => {
        if (err) {
            console.error("Error executing MySQL query: ", err);
            res.status(500).json({ error: "An error occurred while processing your request." });
        } else {
            if (result.affectedRows > 0) {
                res.json({ success: true, message: "Deleted data successfully." });
            } else {
                res.json({ success: false, message: "No matching data found for deletion." });
            }
        }
    });
});

app.post('/api/get-data-by-id', (req, res) => {
    const query = "SELECT * FROM bgc WHERE bgc.orderId = ?";
    const id = req.body.id;
    db.query(query, [id, id], (err, result) => {
        if (err) {
            console.error("Error executing the query: ", err);
            return res.status(500).json({ success: false, error: 'Error connecting to the database' });
        }
        if (result.length > 0) {
            const data = result[0];
            res.json({ success: true, message: "Success", data: data, date: data.OrderDate });
        } else {
            res.json({ success: false, message: "Not Success" });
        }
    });
});

app.post('/api/edit-data', (req, res) => {
    const query = "UPDATE bgc SET OrderDate = ?, Region = ?, City = ?, Category = ?, Product = ?, Quantity = ?, UnitPrice = ?, TotalPrice = ?  WHERE OrderId = ?";
    const OrderId = req.body.OrderId;
    const OrderDate = req.body.OrderDate;
    const Region = req.body.Region;
    const City = req.body.City;
    const Category = req.body.Category;
    const Product = req.body.Product;
    const Quantity = req.body.Quantity;
    const UnitPrice = req.body.UnitPrice;
    const TotalPrice = req.body.TotalPrice;

    db.query(query, [OrderDate, Region, City, Category, Product, Quantity, UnitPrice, TotalPrice, OrderId], (err, result) => {
        if (err) {
            console.error("Error executing MySQL query: ", err);
            res.status(500).json({ error: "An error occurred while processing your request." });
        } else {
            if (result.affectedRows > 0) {
                res.json({ success: true, message: "Updated successful!" });
            } else {
                res.json({ success: false, message: "Updated failed." });
            }
        }
    });
});

app.post('/api/get-data-by-date', (req, res) => {
    const query = "SELECT * FROM bgc WHERE OrderDate BETWEEN ? AND ?";
    const StartDate = req.body.StartDate;
    const EndDate = req.body.EndDate;
    db.query(query, [StartDate, EndDate], (err, result) => {
        if (err) {
            console.error("Error executing the query: ", err);
            return res.status(500).json({ success: false, error: 'Error connecting to the database' });
        }
        if (result.length > 0) {
            const data = result;
            res.json({ success: true, message: "Success", data: data });
        } else {
            res.json({ success: false, message: "Not Success" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});