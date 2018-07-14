const jwt = require("jsonwebtoken");
const secretKey = "1234-5678-0987-6543"

exports.getToken = function (user) {
    return jwt.sign(user, secretKey, {
        expiresIn: 3600 * 25 
    });
};


exports.verifyUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.userId = decoded.id;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.checkToken = (req, res) => {
    var token = req.query.token;
    var payload = jwt.decode(token);
    var exp = payload.exp;
    var expDate = new Date(exp * 1000);
    var currentDate = new Date();
    expDate.setDate(expDate.getDate() - 1)
    if (expDate < currentDate)
        res.send({success:true , data:{ validToken: false} })
    else
        res.send({ success: true , data:{ validToken: true} })
}

