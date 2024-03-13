const express = require('express');
const authController = require('../controllers/auth');
const mysql = require('mysql');

const router = express.Router();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodejs_login'
});
router.get('/', authController.isLoggedIn, (req, res) =>{
    const sql = 'SELECT * FROM contacts ORDER BY CONCAT(first_name, " ", COALESCE(middle_name, ""), " ", last_name)';

    // Execute the query
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching contacts:', error);
            return res.status(500).render('error', { error: 'Internal Server Error' });
        }

        // Render the index.hbs template with the fetched contacts
       res.render('index', {
            results,
            user: req.user
        })   
     });

});
// router.get('/show',authController.isLoggedIn,(req,res)=>{

//     res.send()
// })
// });

router.get('/register', (req, res) => {

    res.render('register');
    
});
router.get('/add',(req,res)=>{
    res.render('add');
})
router.get('/login', (req, res) => {

    res.render('login');
    
});

router.post('/add', (req, res) => {
    const { first_name, middle_name, last_name, email, phone_number_1, phone_number_2, address } = req.body;

    // Create SQL query
    const sql = `INSERT INTO contacts (first_name, middle_name, last_name, email, phone_number_1, phone_number_2, address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    // Execute the query
    db.query(sql, [first_name, middle_name, last_name, email, phone_number_1, phone_number_2, address], (err, result) => {
        if (err) {
            console.error('Error adding contact: ', err);
            res.status(500).send('Error adding contact');
        } else {
            // alert('Contact added successfully');
            res.status(200).redirect('/');
        }
    });

});



router.get('/profile', authController.isLoggedIn, (req,res) => {


    if(req.user){

        res.render('profile', {
            user: req.user
        });
    }
    else{
        res.redirect('/login');

    }
    

})



module.exports = router;