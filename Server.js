const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "poject"
});

con.connect(function (err) {
    if (err) throw err;
    else
        console.log("Connected!");
});

//Defining global variable
var AUTH;
var PATH;

app.get('/', (req, res) => {
    res.render('Main');
});

app.post('/', (req, res) => {
    var EEN = req.body.EN;
    var CCn = req.body.CN;
    //Assigning values
    AUTH = EEN;
    PATH = CCn;
    if (AUTH != undefined)
        res.redirect("/user")
    else
        res.redirect("/")
})


app.get('/user', function (req, res, next) {
    console.log(AUTH);
    // console.log(PATH);
    var sql = `SELECT * FROM user   `;
    con.query(sql, function (err, data, fields) {
        if (err) throw err;
        console.log(data)
        console.log(data[0].NAME)
        res.render('user', { title: 'user', data: data });
    })
})
app.post('/Register', function (req, res, next) {

    var name = req.body.Name;
    var number = req.body.Phone_Number;
    var ENN = req.body.EN;
    var CNN = req.body.CN;
    var ADDRES = req.body.ADDRESS;
    var rel = req.body.DL_Number;
    //console.log(name,number,date,id,gender,salary,adhar,address,nat,rel,gate,pass)
    var sql = `INSERT INTO user values ("${name}", "${number}", "${ENN}", "${CNN}", "${ADDRES}", "${rel}")`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        //req.flash('success', 'Data added successfully!');
        res.redirect('/');
    });
})

app.get('/Register', (req, res) => {
    res.render('Register');
});





app.listen(3000, () => {
    console.log("Server is running on port 3000");
})