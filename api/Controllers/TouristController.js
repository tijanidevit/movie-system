const { Tourist } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function register(req, res) {
    const user = {
        firstname: req.body.firstname,
        othernames: req.body.othernames,
        phone: req.body.phone,
        state_id: req.body.state_id,
        password: req.body.password,
        profile_image: req.body.profile_image,
        gender_id: req.body.gender_id,
        email: req.body.email,
        date_of_birth: req.body.date_of_birth,
    }

    Tourist.create(user).then(result =>
        res.status(201).json({
            success: true,
            message: "Registration Successful",
            data: result
        })
    ).catch(err => {
        res.status(400).json({
            success: false,
            message: "Registration Failed",
            error: err
        })
    })
}

module.exports = {
    register: register
}