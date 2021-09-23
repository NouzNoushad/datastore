const Login = require('../models/Login');
const File = require('../models/File');
const { v4: uuidv4 } = require('uuid');

const registerUser = (req, res) => {

    try {
        let errors = [];
        return res.render('register', {errors});

    } catch (err) {
        console.log(err);
        return res.render('notFound');
    }
}

const postRegisterUser = (req, res) => {

    req.upload(req, res, async (err) => {

        try{
            let errors = [];
            if (err) {
                errors.push({message: err.message})
            }
            
            if (req.file) {
                //save image file
                req.file.uuid = uuidv4();
                const image = await File.create(req.file);

                //validation
                const { name, email, phone, profession, password, cpassword } = req.body;

                //check all fields
                if (!name || !email || !phone || !profession || !password || !cpassword) {
                    errors.push({ message: 'All fields are required' });
                }
                //compare password
                if (password !== cpassword) {
                    errors.push({ message: 'Password doesnot Match. please try again' });
                }
                //password limited to 5 characters
                if (password.length > 5) {
                    errors.push({ message: 'Password should not exceed 5 characters' });
                }
                //check phone number upto 12 digits
                if (phone.length > 12) {
                    errors.push({ message: 'Phone number should be valid' });
                }
                //errors
                if (errors.length > 0) {
                    return res.render('register', { errors });

                } else {
                
                    //check user
                    const user = await Login.findOne({ email: email });
                    if (user) {
                        errors.push({ message: 'User already exist' });
                        return res.render('register', { errors });

                    } else {
                    
                        //register user
                        const newUser = new Login({
                            image: image.filename,
                            name,
                            email,
                            phone,
                            profession,
                            password,
                            cpassword
                        });

                        //bcrypt password in Login schema

                        //save new user
                        await newUser.save();
                        req.flash('success_msg', 'Your data is created successfully');
                        return res.redirect('/login');
                    
                    }
                }

            } else {
                errors.push({ message: 'Please upload your image' });
                return res.render('register', {errors});
            }


        } catch (err) {
            console.log(err);
            return res.render('notFound');
            
        }
    })

}

module.exports = {

    registerUser,
    postRegisterUser
}