// const express = require('express')
import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv'

dotenv.config({path: 'variables.env'})


const app = express();


//? connect to database
db.authenticate()
    .then(()=>console.log("database connection ready"))
    .catch(()=>console.log("Error. database not connected"));


//? define port
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000

//? habilitar pug
app.set('view engine', 'pug');

//? get current year
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de viajes"
    next();
});

//? add body parser to read data from form
app.use(express.urlencoded({extended: true}));


//? define public folder
app.use(express.static('public'));

//? add router
app.use('/', router);




app.listen(port, host, ()=>{
    console.log(`Server ready. Running on port ${port} and host: ${host}`)
})