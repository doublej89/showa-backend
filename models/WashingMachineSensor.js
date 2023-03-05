const mongoose = require('mongoose')

const WashingMachineSensorSchema = new mongoose.Schema(
    {
        washingMachineNickName: {type: String, required: true },
        sensorPurpose: { type: String, required: true },
        sensorSectionName: { type: String, required: true },
        sensorMacAddress: { type: String, required: true },
        isSwitchedOn: { type: Boolean, required: true },
        uid: { type: String, required: true },
        washingMachineId: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'Sensor'
    },
)

const WashingMachineSensor = mongoose.model('WashingMachineSensor', WashingMachineSensorSchema)

module.exports = WashingMachineSensor;