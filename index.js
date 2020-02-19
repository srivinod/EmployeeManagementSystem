const mysql = require('mysql');
const express = require("express");
const bodyparser = require("body-parser");

var mySqlConnection = mysql.createConnection({
    host:'localhost',
    user: '',
    password: '',
    database: 'handigital'
});

mySqlConnection.connect((err) =>{
    if(!err){
        console.log("connection Success")
    }
    else{
        console.log("Connection Failed: "+JSON.stringify(err,undefined,2))
    }
});

var app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(3000,function(){
    console.log("Express Served at 3000")
});


//Get all employee
app.get("/employees",function(req,res){
    mySqlConnection.query("SELECT * FROM employees",function(err,rows,fields){    
        if(!err){
        console.log(rows[0].employeeid);
        res.send(rows);
        }
        else{
        console.log(err)
        }
    });

});


//Get single employee
app.get("/employees/:id",function(req,res){
    mySqlConnection.query("SELECT * FROM employees WHERE employeeid = ?",[req.params.id],function(err,rows,fields){
        if(!err){
            console.log(rows);
            res.send(rows);
            }
            else{
            console.log(err);
            }
    })
})


//Delete a employee
app.delete("/employees/:id",function(req,res){
    mySqlConnection.query("SELECT * FROM employees WHERE employeeid = ?",[req.params.id],function(err,rows,fields){
        if(!err){
            console.log("Deleted Successfully")
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


//INSERT a employee
app.post("/employees",function(req,res){ 
    mySqlConnection.query("INSERT INTO employees SET ?",[req.body],function(err,rows,fields){
        if(!err){
            console.log("Inserted Successfully")
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


//UPDATE a employee
app.put("/employees/:id",function(req,res){ 
    mySqlConnection.query("UPDATE employees SET ? WHERE employeeid = ?",[req.body,req.params.id],function(err,rows,fields){
        if(!err){
            console.log("Updated Successfully")
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})