const mongoose = require('mongoose')

const WashingMachineSchema = new mongoose.Schema(
    {
        uid: {type: String },
        shopCompanyName: { type: String },
        typeOfShop: { type: String },
        address: { type: String },
        typeOfWashingMachine: { type: String },
        brand: { type: String },
        model: { type: String },
        status: { type: String },
    },
    {
        timestamps: true,
        collection: 'WashingMachine'
    },
)

const WashingMachine = mongoose.model('WashingMachine', WashingMachineSchema)

module.exports = WashingMachine;