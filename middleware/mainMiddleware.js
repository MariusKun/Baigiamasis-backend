const { userSchema } = require('../schemas/userSchema')
module.exports = {
    checkInputsOnRegister: async (req, res, next)=>{
        const check = await userSchema.find({username: req.body.username})
        if (check.length >= 1) {
            if (check.length > 1) console.log('douplicate usernames in db. username ' + req.body.username)
            return res.send({error: true, status: ' This username is allready taken'})
        }
        if (!RegExp('^(?=.*?[A-Z])').test(req.body.username)) 
            return res.send({error: true, status: `Username must include at least one Capital letter`})
        if (req.body.username.length < 5) 
            return res.send({error: true, status: 'Username is too short'})
        if (!(req.body.password.length <= 30)) 
            return res.send({error: true, status: 'Password is too long'})
        if (!(req.body.password.length > 5))
            return res.send({error: true, status: 'Password is too short'})
        let cities = ['Vilnius', 'Palanga', 'Plungė', 'Rietavas', 'Linkuva', 'Babrungėnai', 'Kitas kaimas']
        if (!(cities.includes(req.body.city)))
            return res.send({error: true, status: 'Please select nearest city from list'})
        if (!(req.body.gender==='male' || req.body.gender==='female'))
            return res.send({error: true, status: 'Wrong gender'})
        if (!(18 <= req.body.age && req.body.age <= 100))
            return res.send({error: true, status: 'Wrong age'})
        next()
    },
    imageUploadCheck: async (req, res, next) => {
        if (!req.body.user) return res.send({error: true, status: 'You are not logged in'})
        if (!(req.body.image.length > 0)) return res.send({error: true, status: 'Ooops, looks like you forgot to add image url'})
        if (req.body.user.images.includes(req.body.image)) return res.send({error: true, status: 'You are trying to add same picture'})
        next()
    }
}