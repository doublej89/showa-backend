const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        uid: {type: String },
        email: {type: String},
        phone: {type: String},
        firstNameAlphabet: {type: String},
        middleNameAlphabet: {type: String},
        lastNameAlphabet: {type: String},
        firstNameKanji: {type: String},
        middleNameKanji: {type: String},
        lastNameKanji: {type: String},
        dob: {type: String},
        gender: {type: String},
        photoAddress : {type: String},
        postalCode : {type: String},
        prefecture : {type: String},
        cityAddress : {type: String},
        streetAddress : {type: String},
        buildingNameRoomNumber : {type: String},
        occupation : {type: String},
    },
    {
        timestamps: true,
        collection: 'User'
    },
)

const User = mongoose.model('User', UserSchema)

module.exports = User;
