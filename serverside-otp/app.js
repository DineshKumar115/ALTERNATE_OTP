var express = require('express');
var bodyParser = require('body-parser');
// var user = require('./routes/user');
var user = require('./routes/user');


var process = require('dotenv').config();
var app = express();
// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/authentication';
// var dev_db_url = 'mongodb://MyAltID_Dev_User:myaltId_ds2050@13.59.194.102/MyAltID_Dev_Dir';
var mongoDB = dev_db_url;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var cors = require('cors');
var corsOption={
    origin:'http://localhost:4200',
    potionSuccessStatus:200,
}
app.use(cors(corsOption));

app.use(bodyParser.json({
    limit: '150mb',
    extended: true,
    strict: false
}));
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));
// app.use('/api/v1/users', user);
app.use('/api/v1/user', user);
var port = 3003;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

