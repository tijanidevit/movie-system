const express = require('express');
const { Gender, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    const data = {
        gender: req.body.gender,
    }
    if (!data.gender || data.gender == undefined || data.gender == "" || data.gender == null) {
        res.status(400).json({
            success: false,
            message: "Gender is required and cannot be empty",
        })
    }
    const check_gender = await _check_gender(data.gender)

    if (check_gender > 0) {
        res.status(400).json({
            success: false,
            message: data.gender + " Gender Already Exist",
        })
    }
    else {
        try {
            const gender = await Gender.create(data);
            return res.status(201).json({
                success: true,
                message: "Gender Creation Successful",
                data: gender
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Gender Creation Failed" + err,
                error: err
            })
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const genders = await Gender.findAll()
        res.status(200).json({
            success: true,
            message: "Genders Fetch Successful",
            data: genders
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Genders Not Fetched",
            error: err
        })
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        gender = await Gender.findOne({ where: { id: id } })
        if (!gender) {
            res.status(200).json({
                success: false,
                message: "Gender Not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Gender Fetch Successful",
                data: gender
            })
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Gender Not Fetched" + err,
            error: err
        })
    }

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const gender = await Gender.findOne({ where: { id: id } })
    if (!gender) {
        res.status(200).json({
            success: false,
            message: "Gender Not Found",
        })
    }
    else {
        try {
            gender.destroy()
            return res.status(201).json({
                success: true,
                message: "Gender Deleted Successful",
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Gender Deletion Failed" + err,
                error: err
            })
        }
    }
})

router.patch('/', async (req, res) => {
    const { id, gender } = req.body
    const fetched_gender = await Gender.findOne({ where: { id: id } })
    if (!fetched_gender) {
        res.status(200).json({
            success: false,
            message: "Gender Not Found",
        })
    }
    else {
        try {
            const check_update_gender = await _check_update_gender(gender, id)

            if (Number(check_update_gender) > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Gender already exist"
                })
            }
            else {
                fetched_gender.gender = gender
                const new_gender = await fetched_gender.save()
                return res.status(200).json({
                    success: true,
                    message: "Gender updated successfully",
                    data: new_gender
                })
            }
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Gender updation Failed" + err,
                error: err
            })
        }
    }
})
async function _check_gender(gender) {
    aaa = await Gender.count({ where: { gender: gender } })
    return aaa;
}
async function _check_update_gender(gender, id) {
    aaa = await sequelize.query("SELECT COUNT(id) FROM genders WHERE gender = ? AND id <> ?",
        { type: QueryTypes.SELECT, replacements: [gender, id] });
    return aaa[0].count;
}
module.exports = router