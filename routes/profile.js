var express = require('express');
var router = express.Router();
const User = require('../models/User');


router.get('/:uid', async function(req, res, next) {
    if (!req.params.id) {
      return res.status(422).json({ message: 'error', errorMessage: 'Must provide an user id' });
    }
    try {
      const user = await User.findById(req.params.uid);
      if (!user) {
        return res.status(422).json({ message: 'no-user-in-db', errorMessage: 'User with the given id do not exist' });
      }
      res.status(200).json({ message: 'success', user: user });
    } catch (error) {
      res.status(422).json({ message: 'error', error: error.toString() })
    }
  });




// router.post('/', async function(req, res, next) {
  
//     const { 
//       uid, 
//       shopCompanyName, 
//       typeOfShop, 
//       address, 
//       typeOfWashingMachine, 
//       brand, 
//       model, 
//       status 
//     } = req.body;
  
  
//     try {
//       const wm = await WashingMachine.create({ 
//         uid, 
//         shopCompanyName, 
//         typeOfShop, 
//         address, 
//         typeOfWashingMachine, 
//         brand, 
//         model, 
//         status 
//       });
//       res.status(200).json({ message: 'success', washingMachine: wm });
//     } catch (error) {
//       res.status(422).json({ message: 'error', error: error.toString() })
//     }
//   });
  
  

module.exports = router;