const mongoose = require('mongoose');

const WashingMachineSchema = new mongoose.Schema(
    {
        uid: {type: String, required: true },
        shopCompanyName: { type: String, required: true },
        typeOfShop: { type: String, required: true },
        address: { type: String, required: true },
        typeOfWashingMachine: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        status: { type: String, required: true },
        sensors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "WashingMachineSensor"
            }
        ]
    },
    {
        timestamps: true,
        collection: 'WashingMachine'
    },
)

const WashingMachine = mongoose.model('WashingMachine', WashingMachineSchema)

module.exports = WashingMachine;