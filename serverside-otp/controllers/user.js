const {
    User,
    FindUser,
} = require('../models/user');

const {
    Otp,
    FindOtp
} = require('../models/otp');
var moment = require('moment');
var utilities = require('../helper/utilities');
var mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "dineshkumarvadg@gmail.com", //Add Your mail
      pass: "gfdozpqkyczvmsch", //Add App Account Password
    },
  });
var appData = {
    "status": 0,
    "message": "",
    "data": [],
    "error": []
}
//Simple version, without validation or sanitation
exports.test = function(req, res) {
    res.send('Greetings from the Test!');
};

 async function MailSend(data,callBack){
  if(data.process==1){
     await transporter.sendMail({
        from: 'dineshkumarvadg@gmail.com', //Add Sender Mail
        to: `${data.c_Email}`, 
        subject: `Your One Time Password`, 
        text: "Don't Share to everyone", 
        html:` <b>OTP ${data.c_Otp}</b>`, 
      }).then((result)=>{

        return callBack(result)
    }).catch((err)=>{
      
        return callBack(err)
    }
    );
   
  }else{
    await  transporter.sendMail({
        from: 'dineshkumarvadg@gmail.com', //Add Sender Mail
        to: `${data.c_Email}`, 
        subject: "Thanks For The Registration", 
        text: "Here is Your Authentication Key", 
        html: `<h6>Authentication key</h6><strong>${data.c_Otp}</strong>`, 
      }).then((result)=>{
        return callBack(result)
    }).catch((err)=>{
        return callBack(err)
    }
    );
  }
   
}
function sendOtp(data, cb) {
    var returnVal = true;
    FindOtp.findOne({
        c_Email: data.c_Email
    }, function(err, result) {
        try{
            if (result != '' && result != null) {
                FindOtp.findOneAndUpdate({
                    c_Email: data.c_Email
                }, {
                    $set: {
                        c_Otp: data.c_Otp.toString(),
                        n_Status : 1
                    }
                },function(errr, result) {
                    if (result != '' && result != null) {
                        returnVal = true;
                    } else {
                        returnVal = false;
                    }
                    cb(returnVal);
                })
            } else {
                 new Otp({
            c_Email: data.c_Email,
            c_Otp: data.c_Otp
        }).save(function(err, result) {
            if (result != '' && result != null) {
                returnVal = true;
            } else {
                returnVal = false;
            }
            cb(returnVal);
        });
            }
        }catch{

        }
    });
    

   
}

exports.sendOtp = function(req, res) {
    const data = req.body;
    const errors = {};
    if (data.c_Email.includes(null,undefined) || data.c_Email == "") {
        errors.c_Email = ['Email is required'];
    }
  
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        var randomNumber = utilities.randomNumber(4);
        sendOtp({
            c_Email: data.c_Email,
            c_Otp: randomNumber,
            dt_CreatedOn: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }, function(sentOtp) {
            if(sentOtp){
                MailSend({
                    c_Email: data.c_Email,
                    c_Otp: randomNumber,process:1},function(result){
                    if (result) {
                        appData["status"] = 1
                        appData["message"] = "OTP Sent Successfully"
                        appData["error"] = [];
                        appData["data"] = []
                        res.send(appData)
                        return
                    } else {
                        appData["status"] = 0
                        appData["message"] = []
                        appData["error"] = [];
                        appData["data"] = []
                        res.send(appData)
                        return
                    }
                });
            } else {
                appData["status"] = 0
                appData["message"] = "OTP is Not Send"
                appData["error"] = [];
                appData["data"] = []
                res.send(appData)
                return
            }
            
           
        });
    }
};

exports.resendOtp = function(req, res) {
    const data = req.body;
    const errors = {};
    // /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
    if (data.c_Email .includes(null,undefined) || data.c_Email == "") {
        errors.c_Email = ['Email is required'];
    }
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        var randomNumber = utilities.randomNumber(4);
        sendOtp({
            c_Email: data.c_Email,
            c_Otp: randomNumber,
            dt_CreatedOn: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }, function(sentOtp) {
            MailSend({
                c_Email: data.c_Email,
                c_Otp: randomNumber,process:1},function(result){
                if (result) {
                    appData["status"] = 1
                    appData["message"] ="OTP Sent Successfully"
                    appData["error"] = [];
                    appData["data"] = []
                    res.send(appData)
                    return
                } else {
                    appData["status"] = 0
                    appData["message"] = []
                    appData["error"] = [];
                    appData["data"] = []
                    res.send(appData)
                    return
                }
            })
            
        });
    }
};
exports.verifyOtp = function(req, res) {
    const data = req.body;
    const errors = {};
    // /^[\-0-9a-zA-Z\.\+]+@[\-0-9a-zA-Z\.\+]+\.[a-zA-Z]{2,}$/
    
    if (!(/^[0-9]\d{3}$/).test(String(data.n_Otp).trim())) {
        errors.n_Otp = ['Otp is not valid.'];
    }
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        try {
            // ,n_Status:1
            FindOtp.findOne({
                c_Email: data.c_Email,
                c_Otp: data.n_Otp
            }, function(err, result) {
                if (result) {
                    var inputs = JSON.parse(JSON.stringify(result))
                    var status;
                    let startTime = new Date();
                    let endTime = moment(inputs.dt_CreatedOn).add(15, 'm').toDate();
                    if (startTime.getTime() < endTime.getTime()) {
                        //
                        FindOtp.findOneAndUpdate({
                            c_Email: data.c_Email,
                            c_Otp: data.n_Otp,
                            n_Status: 1
                        }, {
                            $set: {
                                n_Status: 2,
                                dt_LastUpdatedOn: new Date()
                            }
                        }, function(errr, _alreadyupdate) {
                            
                             if(_alreadyupdate){
                                appData["status"] = 1
                                appData["message"] = "OTP is verified"
                                appData["data"] = []
                                appData["error"] = []
                                res.send(appData)
                             }else{
                                appData["status"] = 0
                                appData["message"] = "OTP is already verified"
                                appData["data"] = []
                                appData["error"] = []
                                res.send(appData) 
                             }
                        
                        })
                    } else {
                        appData["status"] = 0
                        appData["message"] = "OTP was expired"
                        appData["data"] = []
                        appData["error"] = []
                        res.send(appData)
                    }
                } else {
                    appData["status"] = 0
                    appData["message"] = "Invalid OTP"
                    appData["data"] = []
                    appData["error"] = []
                    res.send(appData)
                }
            })
        } catch (err) {
            appData["status"] = 0
            appData["message"] = ["Getting an error"]
            appData["data"] = []
            appData["error"] = [err]
            res.send(appData)
        }
    }
};
exports.register = function(req, res) {
    const data = req.body;
    const errors = {};
    let c_ReferralCode = '';
    if (data.c_Name == null || data.c_Name == '') {
        errors.c_Name = ['Name is required'];
    } else if (data.c_Name && !(/^(?=.*[A-Za-z]).{3,}$/).test(String(data.c_Name).trim())) {
        errors.c_Name = ['Name is not valid'];
    }
    if (data.n_Mobile == null || data.n_Mobile == '') {
        errors.n_Mobile = ['Mobile number is required'];
    } else if (data.n_Mobile && !(/^[6789]\d{9}$/).test(String(data.n_Mobile).trim())) {
        errors.n_Mobile = ['Mobile number is not valid.'];
    }
    if (data.c_Email == null || data.c_Email == '') {
        errors.c_Email = ['Email number is required'];
    }
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        return res.send(appData);
    }
   
    else {
            FindUser.findOne({
                n_Mobile: Number(data.n_Mobile),
                n_Status: 1,
                n_Deleted: 1
            }, {
                n_Mobile: 1
            }, function(err, result) {
                if (err) {
                    appData["status"] = 0
                    appData["message"] = [];
                    appData["data"] = []
                    appData["error"] = ["Getting an error."]
                    return res.send(appData);
                } else {
                    if (result != '' && result != null) {
                        appData["status"] = 0
                        appData["message"] = "Mobile number already exists";
                        appData["data"] = []
                        appData["error"] = []
                        return res.send(appData);
                    } else {
                        var AuthKey = utilities.generateString(10,function(resullt){
                            return resullt;
                        });
                        let insData = {
                            n_Mobile: Number(data.n_Mobile),
                            c_Name: data.c_Name,
                            c_Email: data.c_Email,
                            c_AuthKey : AuthKey,
                            dt_CreatedOn: new Date()
                        }
                        var insertUser = new User(insData);
                        insertUser.save(function(err, next) {
                            if (err) {
                                appData["status"] = err
                                appData["message"] = []
                                appData["data"] = []
                                return res.send(appData);
                            } else {
                                MailSend({
                                    c_Email: data.c_Email,
                                    c_Otp: AuthKey,process:2,}, function(result){
                                    if (result) {
                                        appData["status"] = 1
                                        appData["message"] = "User added successfully"
                                        appData["data"] = []
                                        appData["error"] = []
                                        return res.send(appData);
                                    } else {
                                        appData["status"] = 0
                                        appData["message"] = []
                                        appData["error"] = [];
                                        appData["data"] = []
                                        res.send(appData)
                                        return
                                    }
                                })
                                
                            }
                        });
                    }
                }
            });
        }

};
exports.verifyAuth = function(req, res) {
    const data = req.body;
    const errors = {};
    // /^[\-0-9a-zA-Z\.\+]+@[\-0-9a-zA-Z\.\+]+\.[a-zA-Z]{2,}$/
    
  
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        try {
            // ,n_Status:1
            FindUser.findOne({
                c_Email: data.c_Email,
                c_AuthKey: data.c_AuthKey
            }, function(err, result) {
                if (result) {
                    appData["status"] = 1
                    appData["message"] = "Auth Key Verified Successfuly"
                    appData["data"] = []
                    appData["error"] = []
                    res.send(appData)
                } else {
                    appData["status"] = 0
                    appData["message"] = "Invalid Auth Key"
                    appData["data"] = []
                    appData["error"] = 
                    res.send(appData)
                }
            })
        } catch (err) {
            appData["status"] = 0
            appData["message"] = "Getting an error"
            appData["data"] = []
            appData["error"] = [err]
            res.send(appData)
        }
    }
};
