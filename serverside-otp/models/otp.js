const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require("validator");
const OtpSchema = new Schema({
    c_Email: {
        type: String,
        required: [true, 'Email number required']
    },
    c_Otp: {
        type: String,
        required: [true, 'OTP is required'],
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
    }
}, {
    strict: false,
    versionKey: false
});
const FindOtpSchema = new Schema({}, {
    strict: false,
    versionKey: false
});
const Otp = mongoose.model('Otp', OtpSchema, 'ds_otp_codes');
const FindOtp = mongoose.model('FindOtp', FindOtpSchema, 'ds_otp_codes');
module.exports = {
    Otp,
    FindOtp
};