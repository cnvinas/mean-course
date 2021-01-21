const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const app = express();
const cors = require('cors')

app.options('*', cors())

/*
    To connect database got to 
    --- /usr/local/opt/mongodb-community-shell/bin$ 
    and run 
    --- mongo "mongodb+srv://cluster0.fmq3y.mongodb.net/test" --username chris
    After this command run, try following command
    --- use node-angular 
    with command help you see help info
    --- help
    */

mongoose.connect('mongodb+srv://chris:chris@cluster0.fmq3y.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connection stablished!!');
    })
    .catch(() => {
        console.log('Connection failed.')
    });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use('/api/posts/', postsRoutes);

module.exports = app;