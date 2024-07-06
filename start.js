const fs = require("fs");
const express = require('express');
const app = express();

//const mysql = require("mysql2");

//const connection = mysql.createConnection({
//    host: "localhost",
//    user: "root",
//    password: "root",
//    database: "test",
//    port: 3306,
//});

//connection.connect(function (err) {
//    if (err) {
//        return console.error("Error" + err.message);
//    }
//    else {
//        console.log("Everithing OK - connection established");
//    }
//});

//connection.query("SELECT * FROM seminar4",
//    function (err, results, fields) {
//        console.log(err);
//        console.log(results); // собственно данные
//        console.log(fields); // мета-данные полей 
//    });

//// закрытие подключения
//connection.end(function (err) {
//    if (err) {
//        return console.log("Error: " + err.message);
//    }
//    console.log("Connection close");
//});



app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


function wr_file(item) {
    var data=fs.readFileSync('test.json', 'utf-8'); 
    var arr = JSON.parse(data);
    arr[item]++;
    console.log(item + ":" + arr[item]);
    fs.writeFileSync('test.json', JSON.stringify(arr));
    console.log("GET Request");
    return arr[item];
}


app.get('/', (req, res) => {
    var num=wr_file("home");
    res.render('index', { page_name: "Home "+num });
});


app.get('/about', (req, res) => {
    var num =wr_file("about");
    res.render('about', { page_name: "About "+num});
});

app.post('/authorisation', (req, res) => {

    console.log("Authorisation inside");
    console.log(req.body);
    console.log(req.body.x);

    var obj = JSON.parse(req.body.x);
    console.log(obj.login);
    console.log(obj.pass);

    fs.readFile('users.json', 'utf-8', (err, data) => {
        var arr = JSON.parse(data);
        var flag = false;
        arr.forEach((item) => {
            if ((item.login == obj.login) && (item.pass == obj.pass)) {
                flag = true;
            }
        });
        if (flag == true) {
            res.send(obj.login);
        } else {
            res.send("No");
        }
    });
    
});


app.post('/registration', (req, res) => {

    console.log("Registration inside");
    console.log(req.body);
    console.log(req.body.x);

    var obj = JSON.parse(req.body.x);
    //console.log(obj.login);
    //console.log(obj.pass);

    fs.readFile('users.json', 'utf-8', (err, data) => {
        var arr = JSON.parse(data);
        arr.push(obj);
        console.log(arr);
        fs.writeFileSync('users.json', JSON.stringify(arr));
        console.log("POST user added");
    });

    res.send(obj.login);

});


app.get('/other', (req, res) => {
    res.render('other', { page_name: "Other" });
});

app.listen(3000, () => {
    console.log("Server start");
});
