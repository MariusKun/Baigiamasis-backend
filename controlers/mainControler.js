const { userSchema } = require('../schemas/userSchema')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const newUser = new userSchema
        newUser.username = req.body.username
        newUser.password = await bcrypt.hash(req.body.password, 10)
        newUser.city = req.body.city
        newUser.gender = req.body.gender
        newUser.age = req.body.age
        try {newUser.save()}
        catch (e){console.log(e)}
        res.send({error: false, status: 'Your on your way to success'})
    },
    login: async (req, res) => {
        const user = await userSchema.findOne({username: req.body.username})
        if (!user) return res.send({error: true, status: 'No such user'})
        const passMatch = await bcrypt.compare(req.body.password, user.password)
        if (passMatch){
            if (req.body.checkbox) req.session.user = user
            res.send({error: false, status: 'Loged in successfully', user})
        } else res.send({error: true, status: 'Wrong password'})
    },
    autoLogin: (req, res) => {
        if (req.session.user) return res.send({error: false, user: req.session.user}) 
        else res.send({error: true, status: 'No user'})
    },
    logout: (req, res) => {
        delete req.session.user
        res.send({error: false, status: 'You are logged out'})
    },
    imageUpload: async (req, res) => {
        if (req.body.user.images.length===1 &&
            req.body.user.images[0]==='hhttps://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg') req.session.user.images = [req.body.image]
        else req.body.user.images.push(req.body.image)
        const user = await userSchema.findByIdAndUpdate(req.body.user._id, {images: req.body.user.images}, {new: true})
        res.send({error: false, status: 'You are one step closer finding your love', user})
    },
    users: async (req, res) => {
        const users = await userSchema.find({_id:{$ne:req.body.user._id}})
        res.send({users})
    },
    setFilter: async (req, res) => {
        const user = await userSchema.findByIdAndUpdate(req.body.user._id, {filterCity: req.body.city, filterGender: req.body.gender, filterAgeMax: req.body.ageMax}, {new: true})
        res.send({error: false, status: 'Filter uploaded successfully', user})
    },
    like: async (req, res) => {
        const loggedInUser = await userSchema.findById(req.body.loggedInUser._id)
        const currentUser = await userSchema.findById(req.body.currentUser._id)
        if (!loggedInUser.likesGiven.includes(currentUser._id)) await userSchema.findByIdAndUpdate(loggedInUser._id, {$push: {likesGiven: currentUser._id}})
        if (!currentUser.likesGot.includes(loggedInUser._id)) await userSchema.findByIdAndUpdate(currentUser._id, {$push: {likesGot: loggedInUser._id}})
        //sockets alert other user that he just got liked.
        const users = await userSchema.find({_id:{$ne:loggedInUser._id}})
        const user = await userSchema.findOne({_id: loggedInUser._id})
        res.send({error: false, status:'user liked successfully', user, users})
    },
    getHistory: async (req, res) => {
        let users = await userSchema.find({_id: req.body.list})
        res.send({error: false, status: 'users found', users})
    }
}