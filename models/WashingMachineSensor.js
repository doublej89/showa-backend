const mongoose = require('mongoose')

const WashingMachineSensorSchema = new mongoose.Schema(
    {
        washingMachineNickName: {type: String, },
        sensorPurpose: { type: String, },
        sensorSectionName: { type: String, },
        sensorMacAddress: { type: String, },
        isSwitchedOn: { type: Boolean, },
        uid: { type: String, },
        washingMachineId: { type: String, },
    },
    {
        timestamps: true,
        collection: 'Sensor'
    },
)

const WashingMachineSensor = mongoose.model('WashingMachineSensor', WashingMachineSensorSchema)

module.exports = WashingMachineSensor;