var express = require('express');
var router = express.Router();
const User = require('../models/User');


router.get('/:uid', async function(req, res, next) {
    if (!req.params.uid) {
      return res.status(422).json({ message: 'error', errorMessage: 'Must provide an user id' });
    }
    try {
      const user = await User.findOne({uid: req.params.uid});
      if (!user) {
        return res.status(422).json({ message: 'no-user-in-db', errorMessage: 'User with the given id do not exist' });
      }
      res.status(200).json({ message: 'success', user: user });
    } catch (error) {
      res.status(422).json({ message: 'error', error: error.toString() })
    }
  });

router.get('/', async function(req, res, next) {
  if (!req.query.phones) {
    return res.status(422).json({ message: 'error', errorMessage: 'Must provide at least one phone number' });
  }
  try {
    const phones = req.query.phones.split(',');
    const usersByphone = [];
    for (const phone of phones) {
      const users = await User.find({ phone: { $regex: phone } });
      if (users.length > 0) {
        usersByphone.push(...users);
      }
    }
    res.status(200).json({ message: 'success', usersByphone });
  } catch (error) {
    res.status(422).json({ message: 'error', error: error.toString() })
  }
});



router.post('/add-user-without-image', async function(req, res, next) {
  
    const { 
        uid,
        email,
        phone,
        firstNameAlphabet,
        middleNameAlphabet,
        lastNameAlphabet,
        firstNameKanji,
        middleNameKanji,
        lastNameKanji,
        dob,
        gender,
        photoAddress,
        postalCode,
        prefecture,
        cityAddress,
        streetAddress,
        buildingNameRoomNumber,
        occupation
    } = req.body;
  
  
    try {
      const user = await User.create({ 
        uid,
        email,
        phone,
        firstNameAlphabet,
        middleNameAlphabet,
        lastNameAlphabet,
        firstNameKanji,
        middleNameKanji,
        lastNameKanji,
        dob,
        gender,
        photoAddress,
        postalCode,
        prefecture,
        cityAddress,
        streetAddress,
        buildingNameRoomNumber,
        occupation
      });
      res.status(200).json({ message: 'success', user: user });
    } catch (error) {
      res.status(422).json({ message: 'error', error: error.toString() })
    }
  });
  
  
  router.put('/user-address-info', async function(req, res, next) {
    
    const { 
        uid,
        email,
        phone,
        firstNameAlphabet,
        middleNameAlphabet,
        lastNameAlphabet,
        firstNameKanji,
        middleNameKanji,
        lastNameKanji,
        dob,
        gender,
        photoAddress,
        postalCode,
        prefecture,
        cityAddress,
        streetAddress,
        buildingNameRoomNumber,
        occupation
    } = req.body;
  
  
    try {
      const user = await User.findOne({uid: uid});
      if (!user) {
        return res.status(422).json({ message: 'error', errorMessage: 'User with the given id do not exist' });
      }

      user.postalCode = postalCode;
      user.prefecture = prefecture;
      user.cityAddress = cityAddress;
      user.streetAddress = streetAddress;
      user.buildingNameRoomNumber = buildingNameRoomNumber;
      user.occupation = occupation;
    

      const newuser = await user.save();
      res.status(200).json({ message: 'success', user: newuser });
    } catch (error) {
      res.status(422).json({ message: 'error', error: error.toString() });
    }
  });


  


module.exports = router;