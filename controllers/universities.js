
db = require("../db")

exports.getUniversityData = (req, res, next) => {

    var universityId = req.query.university_id

    qstring = "select * from university where university_id=" + universityId;

    db.query(qstring, function (err, result) {
        if (err) {
            console.log(err)
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


exports.getAllUniversities = (req, res, next) => {
    qstring = "select * from university";

    db.query(qstring, function (err, result) {
        if (err) {
            console.log(err)
            res.send({
                success: false,
                error: err
            })
        }
        else {
            res.send({
                success: true,
                data: result
            })
        }
    })
}


exports.addUserUniversityInterest = (req, res, next) => {

    var userId = req.userId ;
    var universityId = req.body.university_id ; 
    
    var currentDate = JSON.stringify( new Date().toISOString().replace("T", " ").replace("Z", ""));

    qstring = "insert into user_university_interests (user_id , university_id , interest_date ) "+ 
              " values (" + userId + ", " + universityId +", " + currentDate +");" ; 

    db.query(qstring, function (err, result) {
        if (err) {
            console.log(err)
            res.send({
                success: false,
                error: err
            })
        }
        else {
            res.send({
                success: true,
                data:{ 
                    interestAdded:true
                }
            })
        }
    })
}