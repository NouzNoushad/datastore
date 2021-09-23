const Login = require("../models/Login");
const jwt = require('jsonwebtoken');

const jwtAuth = async (req, res, next) => {

    try {
        const token = req.cookies.jwttoken;

        if (token == 'undefined') {
            req.flash('error_msg', 'Please login first.')
            return res.redirect('/');
            
        } else {
            const verify = jwt.verify(token, process.env.SECRET_KEY);
            const user = await Login.findOne({ _id: verify._id, 'tokens.token': token });

            if (user) {
                req.user = user;
                return next();
                
            } else {
                req.flash('error_msg', 'Invalid User')
                return res.redirect('/');
            }
        }
        
    } catch (err) {
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = jwtAuth;