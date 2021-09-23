const userData = async (req, res) => {

    try {
        const user = req.user;
        return res.render('userinfo', {user});

    } catch (err) {
        console.log(err);
        return res.render('notFound');
    }
}

const postUserData = async (req, res) => {

    try {
        
        let errors = [];
        //validations
        const { fullname, dob, email, phone, address } = req.body;

        //check all fields
        if (!fullname || !dob || !email || !phone || !address) {
            errors.push({ message: 'All fields are required' });
        }

        //phone number limited to 10 digits
        if (phone.length > 10) {
            errors.push({ message: 'Invalid phone number' });
        }

        //errors
        if (errors.length > 0) {
            return res.render('index', { errors });

        } else {
            
            //create new user data
            await Data.create(req.body);
            return res.redirect('/data');
        }

    } catch (err) {
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = {

    userData,
    postUserData
}