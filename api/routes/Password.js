const express = require('express');
const { Tourist, PasswordReset, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const { auth } = require('../middlewares/auth');


router.post('/request', async (req, res) => {
    let email = req.body.email;
    tourist = await Tourist.findOne({ where: { email: email } })
    if (!tourist) {
        res.status(400).json({
            success: false,
            message: "Account not found with the specified email address",
        })
    }
    else {
        try {
            data = {
                tourist_id: tourist.id,
                token: Math.floor(Math.random() * (999999 - 111111) + 111111),
                expires_at: Date.now() + 36 * 1000
            }
            password_reset = await PasswordReset.create(data);
            return res.status(201).json({
                success: true,
                message: "Tourist Creation Successful",
                data: password_reset
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Tourist Creation Failed" + err,
                error: err
            })
        }
    }
})

router.post('/token/verify', async (req, res) => {
    let token = req.body.token;
    let email = req.body.email;
    try {
        let password_reset = await PasswordReset.findOne({ where: { token: token } })
        if (!password_reset) {
            res.status(200).json({
                success: false,
                message: "Token is not recognised",
            })
        }

        if (password_reset.expires_at > Date.now()) {
            await password_reset.destroy()
            res.status(200).json({
                success: false,
                message: "Token Expired",
            })
        }

        tourist = await Tourist.findByPk(password_reset.tourist_id)

        if (tourist.email == email) {
            await password_reset.destroy()
            res.status(200).json({
                success: true,
                message: "Token is valid! Proceed to reset password",
                data: tourist
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Token is invalid!",
            });
        }


    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "An error occured " + err,
            error: err
        })
    }

});

router.post('/reset', async (req, res) => {
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;
    let tourist_id = req.body.tourist_id;
    try {
        if (password != confirm_password) {
            res.status(200).json({
                success: true,
                message: "Both Passwords Must Be The Same",
            });
        }

        tourist = await Tourist.findByPk(tourist_id)
        tourist.password = bcrypt.hashSync(password, salt)
        await tourist.save()

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully! Proceed to login",
            data: tourist
        });

        // let token = jwt.sign({
        //     email: tourist.email,
        //     id: tourist.id
        // }, 'secret', { expiresIn: '120 Days' })

        // res.status(200).json({
        //     success: true,
        //     message: "Authentication successful!",
        //     token: token
        // });

        res.status(400).json({
            success: false,
            message: "Token is invalid!",
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "An error occured " + err,
            error: err
        })
    }

});

async function _check_tourist_email(email) {
    aaa = await Tourist.count({ where: { email: email } })
    return aaa;
}

module.exports = router