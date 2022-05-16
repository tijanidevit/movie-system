const express = require('express');
const bodyParser = require('body-parser');
const { Landmark, Category, sequelize, Tourist, LandmarkVisit, LandmarkService, Service } = require('../models');
const { QueryTypes } = require('sequelize');
const { auth } = require('../middlewares/auth');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: storage });
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());


router.post('/', upload.single('image'), async (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: req.file.path,
        category_id: req.body.category_id,
    }
    if (!data.title || data.title == undefined || data.title == "" || data.title == null) {
        res.status(400).json({
            success: false,
            message: "Title is required and cannot be empty",
        })
    }
    const check_title = await _check_title(data.title)

    if (check_title > 0) {
        res.status(400).json({
            success: false,
            message: data.title + " Already Exist",
        })
    }
    else {
        try {
            const landmark = await Landmark.create(data);
            return res.status(201).json({
                success: true,
                message: "Landmark Creation Successful",
                data: landmark
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Landmark Creation Failed" + err,
                error: err
            })
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const landmarks = await Landmark.findAll()
        res.status(200).json({
            success: true,
            message: "Landmarks Fetch Successful",
            data: landmarks
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Landmarks Not Fetched",
            error: err
        })
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        landmark = await Landmark.findByPk(id, { include: [{ model: Category, as: 'category' }] })
        if (!landmark) {
            res.status(200).json({
                success: false,
                message: "Landmark Not Found",
            })
        }
        else {
            landmark.services = await _fetch_landmark_services(id);
            res.status(200).json({
                success: true,
                message: "Landmark Fetch Successful",
                data: landmark
            })
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Landmark Not Fetched" + err,
            error: err
        })
    }

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const landmark = await Landmark.findOne({ where: { id: id } })
    if (!landmark) {
        res.status(200).json({
            success: false,
            message: "Landmark Not Found",
        })
    }
    else {
        try {
            landmark.destroy()
            return res.status(201).json({
                success: true,
                message: "Landmark Deleted Successful",
            })
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Landmark Deletion Failed" + err,
                error: err
            })
        }
    }
})

router.patch('/', async (req, res) => {
    const { id, landmark } = req.body
    const fetched_landmark = await Landmark.findOne({ where: { id: id } })
    if (!fetched_landmark) {
        res.status(200).json({
            success: false,
            message: "Landmark Not Found",
        })
    }
    else {
        try {
            const check_update_title = await _check_update_title(landmark, id)

            if (Number(check_update_title) > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Landmark already exist"
                })
            }
            else {
                fetched_landmark.landmark = landmark
                const new_landmark = await fetched_landmark.save()
                return res.status(200).json({
                    success: true,
                    message: "Landmark updated successfully",
                    data: new_landmark
                })
            }
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: "Landmark updation Failed" + err,
                error: err
            })
        }
    }
})

router.post('/:id/visits', auth, async (req, res) => {
    const tourist_id = req.token_data.id;
    const landmark_id = req.params.id
    try {
        landmark = await Landmark.findByPk(landmark_id)
        if (!landmark) {
            res.status(200).json({
                success: false,
                message: "Landmark Not Found",
            })
        }
        landmark_visit = await LandmarkVisit.create({ 'tourist_id': tourist_id, 'landmark_id': landmark_id })
        landmark.visits += 1;
        await landmark.save();
        res.status(200).json({
            success: true,
            message: "Visitation Added Successfully",
            data: landmark_visit
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Landmark Not Fetched" + err,
            error: err
        })
    }

});

router.get('/:id/visits', async (req, res) => {
    const landmark_id = req.params.id
    try {
        landmark = await Landmark.findByPk(landmark_id)
        if (!landmark) {
            res.status(200).json({
                success: false,
                message: "Landmark Not Found",
            })
        }
        const landmark_visits = await LandmarkVisit.findAll({ where: { landmark_id: landmark_id }, include: [{ model: Tourist, as: 'tourist' }] })
        res.status(200).json({
            success: true,
            message: "Landmark Visits Fetch Successful",
            data: landmark_visits
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Landmark Visits Not Fetched" + err,
            error: err
        })
    }

});


// router.post('/:id/services', upload('image'), auth, async (req, res) => {
//     const data = {
//         landmark_id: req.body.landmark_id,
//         service_id: req.body.service_id,
//         image: req.file.path,
//         price: req.body.price,
//     }
//     try {
//         landmark = await Landmark.findByPk(data.landmark_id)
//         if (!landmark) {
//             res.status(200).json({
//                 success: false,
//                 message: "Landmark Not Found",
//             })
//         }
//         check_landmark_service = LandmarkService.findOne({ where: { landmark_id: data.landmark_id, service_id: data.service_id } })
//         if (check_landmark_service) {
//             res.status(200).json({
//                 success: false,
//                 message: "Landmark Services already added",
//             })
//         }

//         landmark_service = await LandmarkService.create(data)
//         res.status(200).json({
//             success: true,
//             message: "Landmark Services Added Successful",
//             data: landmark_service
//         })
//     }
//     catch (err) {
//         res.status(400).json({
//             success: false,
//             message: "Landmark  Services Not Added" + err,
//             error: err
//         })
//     }

// });

router.get('/:id/services', async (req, res) => {
    const landmark_id = req.params.id
    try {
        landmark = await Landmark.findByPk(landmark_id)
        if (!landmark) {
            res.status(200).json({
                success: false,
                message: "Landmark Not Found",
            })
        }
        const landmark_services = await _fetch_landmark_services(landmark_id);
        res.status(200).json({
            success: true,
            message: "Landmark Services Fetch Successful",
            data: landmark_services
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Landmark Services Not Fetched" + err,
            error: err
        })
    }

});


router.get('/search/:key', auth, async (req, res) => {
    const tourist_id = req.token_data.id;
    const key = req.params.key
    try {
        landmarks = await _search_landmark(key)
        res.status(200).json({
            success: true,
            message: "Landmark Search Results",
            data: landmarks
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Landmark Not Fetched" + err,
            error: err
        })
    }
});

async function _check_title(title) {
    aaa = await Landmark.count({ where: { title: title } })
    return aaa;
}
async function _check_update_title(landmark, id) {
    aaa = await sequelize.query("SELECT COUNT(id) FROM landmarks WHERE title = ? AND id <> ?",
        { type: QueryTypes.SELECT, replacements: [title, id] });
    return aaa[0].count;
}
async function _search_landmark(key) {
    aaa = await sequelize.query("SELECT * FROM landmarks WHERE title like '%" + key + "%' ",
        { type: QueryTypes.SELECT });
    return aaa;
}

async function _fetch_landmark_services(landmark_id) {
    aaa = await sequelize.query("SELECT * FROM landmark_services LEFT OUTER JOIN services ON services.id = landmark_services.service_id WHERE landmark_id = ? ",
        { type: QueryTypes.SELECT, replacements: [landmark_id] });
    return aaa;
}
module.exports = router