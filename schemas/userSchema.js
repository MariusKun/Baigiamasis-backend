const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true,
        default: ['hhttps://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg']
    },
    likesGot: {
        type: Array,
        required: true
    },
    likesGiven: {
        type: Array,
        required: true
    },
    filterCity: {
        type: String,
        required: true,
        default: 'Vilnius'
    },
    filterGender: {
        type: String,
        required: true,
        default: 'male'
    },
    
    filterAgeMax: {
        type: Number,
        required: true, 
        default: 100
    }
})

module.exports = {
    userSchema: mongoose.model('profile', userSchema)
}