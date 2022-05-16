const express = require('express');
const { State, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

const router = express.Router();


router.post('/', async (req, res) => {
    const data = {
        state: req.body.state,
    }
    const check_state = await _check_state(data.state)

    if (check_state > 0) {
        res.status(400).json({
            success: false,
            message: data.state + " State Already Exist",
        })
    }
    else {
        try {
            const state = await State.create(data);
            return res.status(201).json({
                success: true,
                message: "State Creation Successful",
                data: state
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "State Creation Failed" + err,
                error: err
            })
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const states = await State.findAll()
        res.status(200).json({
            success: true,
            message: "States Fetch Successful",
            data: states
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "States Not Fetched",
            error: err
        })
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        state = await State.findOne({ where: { id: id } })
        if (!state) {
            res.status(200).json({
                success: false,
                message: "State Not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "State Fetch Successful",
                data: state
            })
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "State Not Fetched" + err,
            error: err
        })
    }

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const state = await State.findOne({ where: { id: id } })
    if (!state) {
        res.status(200).json({
            success: false,
            message: "State Not Found",
        })
    }
    else {
        try {
            state.destroy()
            return res.status(201).json({
                success: true,
                message: "State Deleted Successful",
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "State Deletion Failed" + err,
                error: err
            })
        }
    }
})

router.patch('/', async (req, res) => {
    const { id, state } = req.body
    const fetched_state = await State.findOne({ where: { id: id } })
    if (!fetched_state) {
        res.status(200).json({
            success: false,
            message: "State Not Found",
        })
    }
    else {
        try {
            const check_update_state = await _check_update_state(state, id)

            if (Number(check_update_state) > 0) {
                return res.status(200).json({
                    success: true,
                    message: "State already exist"
                })
            }
            else {
                fetched_state.state = state
                const new_state = await fetched_state.save()
                return res.status(200).json({
                    success: true,
                    message: "State updated successfully",
                    data: new_state
                })
            }
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "State updation Failed" + err,
                error: err
            })
        }
    }
})
async function _check_state(state) {
    aaa = await State.count({ where: { state: state } })
    return aaa;
}
async function _check_update_state(state, id) {
    aaa = await sequelize.query("SELECT COUNT(id) FROM states WHERE state = ? AND id <> ?",
        { type: QueryTypes.SELECT, replacements: [state, id] });
    return aaa[0].count;
}
module.exports = router