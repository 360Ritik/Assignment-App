const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


pool.connect((error)=>{
    if(error){
    console.error('Error connecting to MySQL database:', error);
    }else{
    console.log('Connected to MySQL database!');
    }
    });
module.exports = pool.promise();
