const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config({ path: './.env'});

const app = express();
app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodejs_login'
});

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.set('view engine' , 'hbs');




db.connect( (error) => {
    if(error){
        console.log(error);
    }else{
        console.log("Mysql Connected!");
    }
});

app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));




app.listen(8080, () => {
    console.log("server started on port 8080");
});