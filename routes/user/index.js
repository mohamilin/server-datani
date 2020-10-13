const express = require('express');
const router = express.Router();

const {getAllUser, userRegister, userLogin} = require('./userController');
const {auth} = require('../../helper/auth');

router.get('/test', auth, (req, res) => {
    res.json({
        message: "test success",
        user: req.body
    })
})


router.get('/user', getAllUser);
router.post('/add-user', userRegister);
router.post('/login', userLogin)

module.exports = router;