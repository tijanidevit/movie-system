const express = require('express');
const { Category, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

const router = express.Router();


router.post('/', async (req, res) => {
    const data = {
        category: req.body.category,
    }
    if (!data.category || data.category == undefined || data.category == "" || data.category == null) {
        res.status(400).json({
            success: false,
            message: "Category is required and cannot be empty",
        })
    }
    const check_category = await _check_category(data.category)

    if (check_category > 0) {
        res.status(400).json({
            success: false,
            message: data.category + " Category Already Exist",
        })
    }
    else {
        try {
            const category = await Category.create(data);
            return res.status(201).json({
                success: true,
                message: "Category Creation Successful",
                data: category
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Category Creation Failed" + err,
                error: err
            })
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json({
            success: true,
            message: "Categories Fetch Successful",
            data: categories
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Categories Not Fetched",
            error: err
        })
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        category = await Category.findOne({ where: { id: id } })
        if (!category) {
            res.status(200).json({
                success: false,
                message: "Category Not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Category Fetch Successful",
                data: category
            })
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Category Not Fetched" + err,
            error: err
        })
    }

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const category = await Category.findOne({ where: { id: id } })
    if (!category) {
        res.status(200).json({
            success: false,
            message: "Category Not Found",
        })
    }
    else {
        try {
            category.destroy()
            return res.status(201).json({
                success: true,
                message: "Category Deleted Successful",
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Category Deletion Failed" + err,
                error: err
            })
        }
    }
})

router.patch('/', async (req, res) => {
    const { id, category } = req.body
    const fetched_category = await Category.findOne({ where: { id: id } })
    if (!fetched_category) {
        res.status(200).json({
            success: false,
            message: "Category Not Found",
        })
    }
    else {
        try {
            const check_update_category = await _check_update_category(category, id)

            if (Number(check_update_category) > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Category already exist"
                })
            }
            else {
                fetched_category.category = category
                const new_category = await fetched_category.save()
                return res.status(200).json({
                    success: true,
                    message: "Category updated successfully",
                    data: new_category
                })
            }
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Category updation Failed" + err,
                error: err
            })
        }
    }
})
async function _check_category(category) {
    aaa = await Category.count({ where: { category: category } })
    return aaa;
}
async function _check_update_category(category, id) {
    aaa = await sequelize.query("SELECT COUNT(id) FROM categories WHERE category = ? AND id <> ?",
        { type: QueryTypes.SELECT, replacements: [category, id] });
    return aaa[0].count;
}
module.exports = router