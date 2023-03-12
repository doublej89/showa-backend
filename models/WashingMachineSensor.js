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
        temperatureData: {
            type: mongoose.Schema.Types.Mixed,
            default: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 }
        }
    },
    {
        timestamps: true,
        collection: 'Sensor'
    },
)

const WashingMachineSensor = mongoose.model('WashingMachineSensor', WashingMachineSensorSchema)

module.exports = WashingMachineSensor;