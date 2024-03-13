const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
require('dotenv').config();





const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodejs_login'
});

const JWT_SECRET = 'mysupersecretpassword';
const JWT_EXPIRES_IN = '90d';

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if( !email  || !password){
            return res.status(400).render('login',{
                message: 'Please provide an email and password'
            })
        }

    

    db.query('Select * from users where email = ?', [email], async(error, results) => {
        
        console.log(results);
        if( !results || !( await bcrypt.compare(password, results[0].password)) ){
        res.status(400).render('login', {
            message: 'Email or Password is incorrect!'
        })
    } else {
        const id= results[0].id;
        const token =  jwt.sign({ id: id },JWT_SECRET ,{
            expiresIn: JWT_EXPIRES_IN
        });

        console.log("The token is : " + token);
        const cookieOptions = {
            expires: new Date(
                Date.now() + 90 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/");
    }

    })

}catch (error){
        console.log(error);

    }



}






exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }
        
        if (!results || results.length === 0) {
            // Email is not registered
            // Proceed with registration
            if (password !== passwordConfirm) {
                return res.render('register', {
                    message: 'Password not matched'
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send("Internal Server Error");
                } else {
                    console.log(results);
                    return res.render('register', {
                        message: 'User registered'
                    });
                }
            });
        } else {
            // Email is already registered
            return res.render('register', {
                message: 'That email is already registered'
            });
        }
    });
}



exports.isLoggedIn = async (req, res, next) => {
    
//console.log(req.cookies);
    if(req.cookies.jwt) {
        try{
            //1) verify token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,
                JWT_SECRET
                
                );
                console.log(decoded);
                //2) Check if user still exists
                db.query('Select * from users where id = ?' , [decoded.id], (error, result) => {
                    console.log(result);
                    if(!result){
                        return next();
                    }

                    req.user = result[0]
                    return next();


                });
        }
        catch (error) 
        {
            console.log(error);
            return next();
        }
    }
    else{
    next();
    }

}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}