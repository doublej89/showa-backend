var express = require('express');
var router = express.Router();
const WashingMachine = require('../models/WashingMachine');
const WashingMachineSensor = require('../models/WashingMachineSensor');

router.post('/', async function(req, res, next) {
  // const errorMessages = [];

  const { 
    uid, 
    shopCompanyName, 
    typeOfShop, 
    address, 
    typeOfWashingMachine, 
    brand, 
    model, 
    status 
  } = req.body;


  try {
    const wm = await WashingMachine.create({ 
      uid, 
      shopCompanyName, 
      typeOfShop, 
      address, 
      typeOfWashingMachine, 
      brand, 
      model, 
      status 
    });
    res.status(200).json({ message: 'success', washingMachine: wm });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() })
  }
});

router.get('/user/:uid', async function(req, res, next) {
  if (!req.params.uid) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a user id' });
  }
  try {
    const wmachines = await WashingMachine.find({ uid: req.params.uid });
    res.status(200).json(
      wmachines.map((wm) => ({
        id: wm._id,
        uid: wm.uid, 
        shopCompanyName: wm.shopCompanyName, 
        typeOfShop: wm.typeOfShop, 
        address: wm.address, 
        typeOfWashingMachine: wm.typeOfWashingMachine, 
        brand: wm.brand, 
        model: wm.model, 
        status: wm.status
      }))
    );
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() })
  }
});


router.get('/:id', async function(req, res, next) {
  if (!req.params.id) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide an id' });
  }
  try {
    const wm = await WashingMachine.findById(req.params.id);
    if (!wm) {
      return res.status(422).json({ message: 'error', errorMessage: 'Washing machine with the given id do not exist' });
    }
    res.status(200).json({ message: 'success', washingMachine: wm });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() })
  }
});

router.get('/:uid/sensor', async function(req, res, next) {
  if (!req.params.uid) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a user id' });
  }
  try {
    const sensors = await WashingMachineSensor.find({ uid: req.params.uid });

    res.status(200).json(
      sensors.map((sensor) => ({
        id: sensor._id,
        washingMachineNickName: sensor.washingMachineNickName, 
        sensorPurpose: sensor.sensorPurpose, 
        sensorSectionName: sensor.sensorSectionName, 
        sensorMacAddress: sensor.sensorMacAddress, 
        isSwitchedOn: sensor.isSwitchedOn, 
        washingMachineId: sensor.washingMachineId,
        uid: sensor.uid
      }))
    );

  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() });
  }
});


router.get('/:wid/sensorByWid', async function(req, res, next) {
  if (!req.params.wid) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a washing machine id' });
  }
  try {
    const sensors = await WashingMachineSensor.find({ washingMachineId: req.params.wid });

    res.status(200).json(
      sensors.map((sensor) => ({
        id: sensor._id,
        washingMachineNickName: sensor.washingMachineNickName, 
        sensorPurpose: sensor.sensorPurpose, 
        sensorSectionName: sensor.sensorSectionName, 
        sensorMacAddress: sensor.sensorMacAddress, 
        isSwitchedOn: sensor.isSwitchedOn, 
        washingMachineId: sensor.washingMachineId,
        uid: sensor.uid
      }))
    );

  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() });
  }
});


router.delete('/', async function(req, res, next) {
  try {
    const wmachines = await WashingMachine.deleteMany();
    res.status(200).json(wmachines);
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() })
  }
});

router.delete('/sensor', async function(req, res, next) {
  try {
    const wmachines = await WashingMachineSensor.deleteMany();
    res.status(200).json(wmachines);
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() })
  }
});




router.post('/sensor', async function(req, res, next) {
  // const errorMessages = [];

  const { 
    washingMachineNickName, 
    sensorPurpose, 
    sensorSectionName, 
    sensorMacAddress, 
    isSwitchedOn, 
    uid,
    washingMachineId
  } = req.body;

  // if (!uid) {
  //   errorMessages.push({ 'uid': 'Must provide a uid of user'});
  // } if (!washingMachineNickName) {
  //   errorMessages.push({ 'washingMachineNickName': 'Must provide a nick name for washing machine'});
  // } if (!sensorPurpose) {
  //   errorMessages.push({ 'sensorPurpose': 'Must provide a purpose for adding sensor'});
  // } if (!sensorSectionName) {
  //   errorMessages.push({ 'sensorSectionName': 'Must provide a sensor section name'});
  // } if (!sensorMacAddress) {
  //   errorMessages.push({ 'sensorMacAddress': 'Must provide a sensor MAC address'});
  // } if (!isSwitchedOn) {
  //   errorMessages.push({ 'isSwitchedOn': 'Must provide a bolean value for switch'});
  // } if (!washingMachineId) {
  //   errorMessages.push({ 'washingMachineId': 'Must provide a washing machine ID'});
  // } 

  // if (errorMessages.length > 0) {
  //   return res.status(420).json({ message: 'error', errorMessages });
  // }
  
  try {
    const wms = await WashingMachineSensor.create({
      washingMachineNickName, 
      sensorPurpose, 
      sensorSectionName, 
      sensorMacAddress, 
      isSwitchedOn, 
      uid, 
      washingMachineId
    });
    res.status(200).json({ message: 'success', washingMachineSensor: wms });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() })
  }
});

router.put('/:id/:status/change-status', async function(req, res, next) {
  if (!req.params.id) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a washing machine id' });
  }
  if (!req.params.status) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a washing machine status' });
  }
  try {
    const wm = await WashingMachine.findById(req.params.id);
    if (!wm) {
      return res.status(422).json({ message: 'error', errorMessage: 'Washing machine with the given id do not exist' });
    }
    wm.status = req.params.status;
    const newwm = await wm.save();
    res.status(200).json({ message: 'success', washingMachine: newwm });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() });
  }
});

router.get('/:id/sensor/temperature', async function(req, res, next) {
  if (!req.params.id) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a washing machine id' });
  }
  try {
    const temperatures = [];
    const sensors = await WashingMachineSensor.find({ washingMachineId: req.params.id });
  
    for (const sensor of sensors) {
      temperatures.push(sensor.temperatureData);
    }
    res.status(200).json({ message: 'success', temperatures });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() });
  }
});

router.put('/sensor/temperature/:sensorId', async function(req, res, next) {
  if (!req.params.sensorId) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a sensor id' });
  }
  const { temperature } = req.body;
  
  try {
    const sensor = await WashingMachineSensor.findById(req.params.sensorId);
    const currentDay = new Date().getDay();
    sensor.temperatureData = {...sensor.temperatureData, [`${currentDay}`]: Number(temperature) };
    const updatedSensor = await sensor.save();
    res.status(200).json({ message: 'success', sensor: updatedSensor });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() });
  }
});


router.put('/:washingMachineId/:washingMachineSensorId/assign-sensor', async function(req, res, next) {
  if (!req.params.washingMachineId) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a washing machine id' });
  }
  if (!req.params.washingMachineSensorId) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide a washing machine sensor id' });
  }
  try {
    const wms = await WashingMachineSensor.findById(req.params.washingMachineSensorId);
    if (!wms) {
      return res.status(422).json({ message: 'error', errorMessage: 'Washing machine sensor with the given id do not exist' });
    }
    wms.washingMachineId = req.params.washingMachineId;
    const newwms = await wms.save();
    res.status(200).json({ message: 'success', washingMachineSensor: newwms });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() });
  }
})



module.exports = router;