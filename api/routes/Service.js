const express = require('express');
const { Service, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

const router = express.Router();


router.post('/', async (req, res) => {
    const data = {
        service: req.body.service,
    }
    if (!data.service || data.service == undefined || data.service == "" || data.service == null) {
        res.status(400).json({
            success: false,
            message: "Service is required and cannot be empty",
        })
    }
    const check_service = await _check_service(data.service)

    if (check_service > 0) {
        res.status(400).json({
            success: false,
            message: data.service + " Service Already Exist",
        })
    }
    else {
        try {
            const service = await Service.create(data);
            return res.status(201).json({
                success: true,
                message: "Service Creation Successful",
                data: service
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Service Creation Failed" + err,
                error: err
            })
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll()
        res.status(200).json({
            success: true,
            message: "Services Fetch Successful",
            data: services
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Services Not Fetched",
            error: err
        })
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        service = await Service.findOne({ where: { id: id } })
        if (!service) {
            res.status(200).json({
                success: false,
                message: "Service Not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Service Fetch Successful",
                data: service
            })
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Service Not Fetched" + err,
            error: err
        })
    }

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const service = await Service.findOne({ where: { id: id } })
    if (!service) {
        res.status(200).json({
            success: false,
            message: "Service Not Found",
        })
    }
    else {
        try {
            service.destroy()
            return res.status(201).json({
                success: true,
                message: "Service Deleted Successful",
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Service Deletion Failed" + err,
                error: err
            })
        }
    }
})

router.patch('/', async (req, res) => {
    const { id, service } = req.body
    const fetched_service = await Service.findOne({ where: { id: id } })
    if (!fetched_service) {
        res.status(200).json({
            success: false,
            message: "Service Not Found",
        })
    }
    else {
        try {
            const check_update_service = await _check_update_service(service, id)

            if (Number(check_update_service) > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Service already exist"
                })
            }
            else {
                fetched_service.service = service
                const new_service = await fetched_service.save()
                return res.status(200).json({
                    success: true,
                    message: "Service updated successfully",
                    data: new_service
                })
            }
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Service updation Failed" + err,
                error: err
            })
        }
    }
})
async function _check_service(service) {
    aaa = await Service.count({ where: { service: service } })
    return aaa;
}
async function _check_update_service(service, id) {
    aaa = await sequelize.query("SELECT COUNT(id) FROM services WHERE service = ? AND id <> ?",
        { type: QueryTypes.SELECT, replacements: [service, id] });
    return aaa[0].count;
}
module.exports = router