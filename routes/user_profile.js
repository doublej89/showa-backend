var express = require('express');
var router = express.Router();
const User = require('../models/User');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'assets/user_image');
  },
  filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });


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
  
  
  router.route('/add-user-with-image').post(upload.single('image'), async function(req, res, next) {
  
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
        photoAddress : "test address",
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