const express = require('express')
const router = express.Router()
const { 
    imageUpload,
    autoLogin,
    setFilter,
    register,
    logout,
    users,
    login,
    like,
    getHistory,
    
} = require('../controlers/mainControler')
 const { checkInputsOnRegister, imageUploadCheck } = require('../middleware/mainMiddleware')

router.post('/imageUpload', imageUploadCheck, imageUpload)
router.post('/register', checkInputsOnRegister, register)
router.post('/getHistory', getHistory)
router.post('/setFilter', setFilter)
router.post('/login', login)
router.post('/users', users)
router.post('/like', like)
router.get('/autoLogin', autoLogin)
router.get('/logout', logout)



module.exports = router