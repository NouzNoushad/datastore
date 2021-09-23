const Login = require("../models/Login");
const bcrypt = require('bcrypt');

const loginUser = (req, res) => {

    try {
        let errors = [];
        return res.render('login', {errors});
    } catch (err) {
        console.log(err);
        return res.render('notFound');
    }
}

const postLoginUser = async (req, res) => {

    try {
        
        let errors = [];
        //validations
        const { email, password } = req.body;

        //check all fields
        if (!email || !password) {
            errors.push({ message: 'All fields are required' });
        }

        //password limited to 5 characters
        if (password.length > 5) {
            errors.push({ message: 'Password should not exceed 5 characters' });
        }

        if (errors.length > 0) {
            return res.render('login', { errors });

        } else {
            //check user registered
            const user = await Login.findOne({ email: email });
            if (user) {
                const matchPassword = await bcrypt.compare(password, user.password);

                //create jwt token
                const token = await user.generateAuthToken();
                //save in browser cookie
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 50000000000),
                    httpOnly: true
                });

                if (!matchPassword) {
                    errors.push({ message: 'Invalid password' });
                    return res.render('login', { errors });
                } else {
                    req.flash('success_msg', 'You are logged In');
                    return res.redirect('/data');
                }
            } else {
                errors.push({ message: 'User doesnot exist. please try again' });
                return res.render('login', { errors });
            }
        }

    } catch (err) {
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    loginUser,
    postLoginUser
}