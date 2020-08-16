const mysql=require('mysql');

const express = require('express');
var app= express();
const bodyparser=require('body-parser');
var cors = require('cors');
app.use(cors());

// console.log(bodyparser);
app.use(bodyparser.json());


// app.all( function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// });

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'myemp',
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection success ! Done');
    else
    console.log('DB Connection Failed:' + JSON.stringify(err, undefined,2));

}

)
//Get whole data from Query

app.listen(3100, ()=>console.log('Express server is running at port no: 3000'));
app.get('/employees', (req,res,next)=>{
    mysqlConnection.query('SELECT * FROM myemp.myemployee', (err,rows,fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); 
            res.send(rows);
            // next();
        }
        else
        console.log(err);
    })
});

//Get An employee Data

// app.listen(3100, ()=>console.log('Express server is running at port no: 3000'));
app.get('/employees/:id', (req,res, next)=>{
    mysqlConnection.query('SELECT * FROM myemp.myemployee WHERE EmpId = ?',[req.params.id], (err,rows,fields)=>{
        if(!err){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");   
        res.send(rows);
        // next();

    }
        else
        console.log(err);
    })
});


//Delete an employee record.

// app.listen(3100, ()=>console.log('Express server is running at port no: 3000'));
app.delete('/employees/:id', (req,res, next)=>{
    mysqlConnection.query('Delete FROM myemp.myemployee WHERE EmpId=?',[req.params.id], (err,rows,fields)=>{
        if(!err){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");   
        res.send(rows);  
        console.log('Record has been deleted');

        // next();

        }
        else
        console.log(err);
    })
});