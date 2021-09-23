const createData = (req, res) => {

    try {
        let errors = [];
        return res.render('register', { errors });

    } catch (err) {
        console.log(err);
        return res.render('notFound');
    }
}

module.exports = createData;