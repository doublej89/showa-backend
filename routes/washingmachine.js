var express = require('express');
var router = express.Router();
const WashingMachine = require('../models/WashingMachine');

router.post('/', async function(req, res, next) {
  const errorMessages = [];

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

  if (!uid) {
    errorMessages.push({ 'uid': 'Must provide a user id'});
  } if (!shopCompanyName) {
    errorMessages.push({ 'shopCompanyName': 'Must provide a shop company name'});
  } if (!typeOfShop) {
    errorMessages.push({ 'typeOfShop': 'Must provide a shop type'});
  } if (!address) {
    errorMessages.push({ 'address': 'Must provide an address'});
  } if (!typeOfWashingMachine) {
    errorMessages.push({ 'typeOfWashingMachine': 'Must provide a washing machine type'});
  } if (!brand) {
    errorMessages.push({ 'brand': 'Must provide a brand'});
  } if (!model) {
    errorMessages.push({ 'model': 'Must provide a model'});
  } if (!status) {
    errorMessages.push({ 'uuid': 'Must provide status'});
  }

  if (errorMessages.length > 0) {
    return res.status(420).json({ message: 'error', errorMessages });
  }

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

router.get('/:uid', async function(req, res, next) {
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

module.exports = router;