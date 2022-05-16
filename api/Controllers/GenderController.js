const { Gender } = require('../models');

async function check_gender(gender) {
    aaa = await Gender.count({ where: { gender: gender } })
    return aaa;
}

function create(req, res) {
    const data = {
        gender: req.body.gender,
    }
    check_gender(data.gender).then(
        (a) => {
            if (a > 0) {
                res.status(400).json({
                    success: false,
                    message: "Gender Already Exist",
                })
            }
            else {
                Gender.create(data).then(result =>
                    res.status(201).json({
                        success: true,
                        message: "Gender Creation Successful",
                        data: result
                    })
                ).catch(err => {
                    res.status(400).json({
                        success: false,
                        message: "Gender Creation Failed",
                        error: err
                    })
                })
            }
        }
    )

}

function index(req, res) {
    Gender.findAll().then(result =>
        res.status(200).json({
            success: true,
            message: "Gender Fetch Successful",
            data: result
        })
    ).catch(err => {
        res.status(400).json({
            success: false,
            message: "Gender Not Fetched",
            error: err
        })
    })
}

function show(req, res) {
    const id = req.params.id;
    Gender.findOne({ where: { id: id } }).then(result => {
        if (!result) {
            res.status(200).json({
                success: false,
                message: "Gender Not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Gender Fetch Successful",
                data: result
            })
        }
    }
    ).catch(err => {
        res.status(400).json({
            success: false,
            message: "Gender Not Fetched" + err,
            error: err
        })
    })
}

function destroy(req, res) {
    const id = req.params.id;
    Gender.findOne({ where: { id: id } }).then((gender) =>
        gender.destroy().then(
            res.status(200).json({
                success: true,
                message: "Gender Deleted Successful",
            })
        )
    ).catch(err => {
        res.status(400).json({
            success: false,
            message: "Gender Not Deleted" + err,
            error: err
        })
    })
}

function update(req, res) {
    const { gender, id } = req.body
    var g
    Gender.findOne({ where: { id: id } }).then((_gender) =>
        g = _gender,
        g.gender = gender,
        check_gender(gender).then(
            (a) => {
                if (a > 0) {
                    res.status(400).json({
                        success: false,
                        message: "Gender Already Exist",
                    })
                }
                else {
                    g.save().then(
                        res.status(200).json({
                            success: true,
                            message: "Gender Updated Successful",
                            data: g
                        })
                    )
                }
            }
        )
    ).catch(err => {
        res.status(400).json({
            success: false,
            message: "Gender Not Updated" + err,
            error: err
        })
    })
}
module.exports = {
    create: create,
    index: index,
    show: show,
    destroy: destroy,
    update: update,
}