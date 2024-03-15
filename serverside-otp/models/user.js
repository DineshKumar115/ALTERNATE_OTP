const {
    Number
} = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
var validator = require("validator");

const UserSchema = new Schema({
    c_Name: {
        type: String,
        required: [true, 'Name required'],
        validate(value) {
            if (!validator.isLength(value, {
                    min: 3,
                    max: 64
                })) {
                throw Error("Length of the name should be between 3-64");
            }
        },
        trim: true
    },
    n_Mobile: {
        type: Number,
        index: true,
        unique: true,
        required: [true, 'Mobile number required'],
        validate: {
            validator: function(v) {
                return /^[6789]\d{9}$/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        trim: true
    },
    c_Email: {
        type: String,
        index: true,
        required: false,
        validate: {
            validator: function(v) {
                return /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: '{VALUE} is not a valid email id'
        },
        trim: true
    },
    c_AuthKey: {
        type: String,
        required: [true, 'Auth key is required'],
        validate(value) {
            if (!validator.isLength(value, {
                    min: 10,
                    max: 64
                })) {
                throw Error("Length of the name should be between 3-64");
            }
        },
        trim: true
    },
    n_Status: {
        type: Number,
        default: 1
    },
    n_Deleted: {
        type: Number,
        default: 1
    },
    dt_CreatedOn: {
        type: Date,
        default: Date.now
    },
    dt_LastUpdatedOn: {
        type: Date,
        default: null
    },
    dt_LastLogin: {
        type: Date,
        default: null
    }
}, {
    strict: false,
    versionKey: false // You should be aware of the outcome after set to false
});

//This For Select 
const  FindUserSchema= new Schema({}, {
    strict: false,
    versionKey: false
});

//Database created
const User = mongoose.model('User', UserSchema, 'ds_users');
const FindUser = mongoose.model('FindUser', FindUserSchema, 'ds_users');
module.exports = {
    User,
    FindUser
};