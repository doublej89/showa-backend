var express = require('express');
var router = express.Router();
const User = require('../models/User');


router.get('/get-my-showa-contact', async function(req, res, next) {
    try {
      const phones = req.query.phones.split(',');
      const usersByphone = [];

      for (const phone of phones) {
        if (phone === '' || phone === ' ') {
          continue;
        }
        const users = await User.find({ phone: { $regex: phone } });

        if (users.length > 0) {
          usersByphone.push(...users);
        }
      }
      res.status(200).json(usersByphone);
    } catch (error) {
      res.status(422).json({ message: 'error', error: error.toString() })
    }
  });

module.exports = router;