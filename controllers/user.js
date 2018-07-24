
db = require("../db")
var verify = require("./verify")

exports.login = (req, res, next) => {
    var userEmail = JSON.stringify(req.body.user_email);
    var password = JSON.stringify(req.body.password);
    var qstring = "select user_id from user where user_email=" + userEmail +
        " and password=" + password;
    db.query(qstring, function (err, result) {
        if (err) {
            console.log(err)
            res.send({
                success: false,
                error: err
            })
        }
        else {
            if (result.length == 0) {
                res.send({
                    success: true,
                    data: {
                        msg: "wrong email or password",
                        successfulLogin: false
                    }
                })
            }
            else {

                var token = verify.getToken({ id: result[0].user_id })
                res.send({
                    success: true,
                    data: {
                        successfulLogin: true,
                        token: token
                    }
                })
            }
        }
    })
}


exports.userInfo = (req, res, next) => {
    var userId = req.userId
    var qstring = "select *  from user where user_id=" + userId;
    db.query(qstring, function (err, result) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        }
        else {
            res.send({
                success: true,
                data: result[0]
            })
        }
    })
}



exports.updateUserInfo = (req, res, next) => {
    var userId = req.userId;
    var userName = req.body.user_name;
    var password = req.body.password;
    var degree = req.body.degree;
    var major = req.body.major;
    var user_email = req.body.user_email;
    var school = req.body.school;
    var phone = req.body.phone;
    var birthDate = req.body.birth_date;

    birthDate = birthDate.replace("T", " ").replace("Z", "")
    var qstring = "UPDATE  user SET user_name ='" + userName +
        "', degree = '" + degree +
        "', user_email='" + user_email +
        "', school ='" + school +
        "', phone_no='" + phone +
        "', password='" + password +
        "', major='" + major +
        "', birth_date='" + birthDate +
        "' where user_id =" + userId;

    console.log("the query: " + qstring + "\n");
    db.query(qstring, function (err, result) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        }
        else {
            res.send({
                success: true,
                data: result[0]
            })
        }
    })
}



exports.register = (req, res, next) => {

    var UserName = req.body.user_name;
    var password = req.body.password;
    var degree = req.body.degree;
    var user_email = req.body.user_email;
    var school = req.body.school;
    var birthDate = req.body.birth_date;
    var phone = req.body.phone;
    var major = req.body.major;
    var RegisterationDate = new Date().toISOString().replace("T", " ").replace("Z", "");
    var qstring = "INSERT INTO user ( user_name, password, birth_date,major, degree," +
        " user_email , school , phone_no,  registeration_date ) VALUES('"
        + UserName + "','" + password + "','" + birthDate + "','" + major + "','" + degree + "', '" + user_email
        + "','" + school + "','" + phone + "','" + RegisterationDate + "');"

    console.log("the query: " + qstring + "\n");

    db.query(qstring, function (err, result) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        }
        else {
            var id = result.insertId;
            var token = verify.getToken({ id: id })
            console.log(id)
            res.send({
                success: true,
                data: {
                    token: token,
                    successfulRegisteration: true
                }
            })
        }
    })
}




exports.emailData = (req, res, next) => {
    var userEmail = JSON.stringify(req.query.user_email)
    var qstring = "select degree , phone_no  , birth_date , password from user where user_email=" + userEmail;
    db.query(qstring, function (err, result) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        }
        else {
            res.send({
                success: true,
                data: result[0]
            })
        }
    })
}



exports.contactCheck = (req, res, next) => {
    var userEmail = JSON.stringify(req.body.user_email)
    var phone = JSON.stringify(req.body.phone)
    var qstring = "select user_email , phone_no  from user where user_email=" + userEmail
        + " or phone_no =" + phone;
    db.query(qstring, function (err, result) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        }
        else {
            if (result.length == 0)
                res.send({
                    success: true,
                    data: {
                        validContact: true
                    }
                })
            else if (JSON.stringify(result[0].user_email) == userEmail)
                res.send({
                    success: true,
                    data: {
                        validContact: false,
                        msg: "this email is already used"
                    }
                })
            else
                res.send({
                    success: true,
                    data: {
                        validContact: false,
                        msg: "this mobile number is already used"
                    }
                })
        }
    })
}


exports.emailCheck = (req, res, next) => {
    var userEmail = JSON.stringify(req.query.user_email)
    // var phone = JSON.stringify(req.body.phone)
    console.log("hopa" , userEmail)
    var qstring = "select user_email , phone_no  from user where user_email=" + userEmail
    db.query(qstring, function (err, result) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        }
        else {
            if (result.length == 0)
                res.send({
                    success: true,
                    data: {
                        emailExist: false,
                        msg: "this email is not registered!"

                    }
                })
            else
                res.send({
                    success: true,
                    data: {
                        emailExist: true,
                    }
                })
        }
    })
}