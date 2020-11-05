const express = require('express');
const sqlite3 = require('sqlite3');
const xmlparser = require('express-xml-bodyparser');

var db = new sqlite3.Database('nemId_API_DB');
var app = express();

app.use(express.json());
app.use(xmlparser());

app.get('/test', (req, res) =>{
    res.status(200).send({message: "Server is running just fine on port 8080... "})
});

// ---------------------------------------------------
// CRUD for Users
// ---------------------------------------------------

// Read all users
app.get('/api/users', (req, res) => {
    let data = req.body;
    let sql = `SELECT * FROM User`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
        res.status(200).json({
            message: 'List of Users!',
            users: rows
        });
    });
});

// Read one user
app.get('/api/user', (req, res) => {
    let data = req.body;
    let sql = "SELECT * FROM User WHERE Cpr = ?";

    db.all(sql, [data.cpr], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });

        res.status(200).json({
            message: 'User based on Cpr!',
            user: rows
        });
    });
});

// Create a user
app.post('/api/create-user', (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO User (Email, Cpr, NemId, GenderId) VALUES(?,?,?,?)";
    db.all(sql, [data.Email, data.Cpr, data.NemId, data.GenderId], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({
            message: 'User Created!',
            user: data
        });
    });
});

// Update an user
app.patch('/api/update-user', (req, res) => {
    let data = req.body;
    let sql = "UPDATE User SET Email = ?, Cpr = ?, NemId = ?, GenderId = ? WHERE Cpr = ?";
    db.all(sql, [data.Email, data.NewCpr, data.NemId, data.GenderId, data.Cpr], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({
            message: 'User Updated!',
            user: data
        });
    });
});

// Delete an user
app.delete('/api/delete-user', (req, res) => {
    let data = req.body;
    let sql = "DELETE FROM User WHERE Cpr = ?";
    db.all(sql, [data.Cpr], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("data.Cpr " + data.Cpr);
        res.status(200).json({
            message: 'User Deleted!',
        });
    });
});

// ---------------------------------------------------
// CRUD for Gender
// ---------------------------------------------------

// Read all Genders
app.get('/api/genders', (req, res) => {
    let data = req.body;
    let sql = `SELECT * FROM Gender`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
        res.status(200).json({
            message: 'List of Genders!',
            users: rows
        });
    });
});

// Read one user
app.get('/api/gender', (req, res) => {
    let data = req.body;
    let sql = "SELECT * FROM Gender WHERE Id = ?";
    db.all(sql, [data.id], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });

        res.status(200).json({
            message: 'Gender based on Id!',
            user: rows
        });
    });
});

// Create a Gender
app.post('/api/create-gender', (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO Gender (Label) VALUES(?)";
    db.all(sql, [data.Label], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({
            message: 'Gender Added!',
            gender: data
        });
    });
});

// Update a Gender
app.patch('/api/update-gender', (req, res) => {
    let data = req.body;
    let sql = "UPDATE Gender SET Label = ? WHERE Id = ?";
    db.all(sql, [data.Label, data.Id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({
            message: 'Gender Updated!',
            gender: data
        });
    });
});

// Delete a Gender
app.delete('/api/delete-gender', (req, res) => {
    let data = req.body;
    let sql = "DELETE FROM Gender WHERE Id = ?";
    db.all(sql, [data.Id], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("data.Id " + data.Id);
        res.status(200).json({
            message: 'Gender Deleted!',
        });
    });
});


app.listen(8080, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port 8080");
        console.log("The server is running !!!!");
    }
});
