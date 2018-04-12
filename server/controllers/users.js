const User = require('../models/users')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

module.exports = {
  register (req, res) {
    const hash = bcrypt.hashSync(req.body.password, saltRounds)
    const user = new User()
    user.email = req.body.email
    user.password = hash
    user.save()
    .then(data => {
      res.status(201).json({
        message: 'Created new user',
        data
      })
    })
  },
  login (req, res) {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
      if(user){
        const check = bcrypt.compareSync(req.body.password, user.password)
        const token = jwt.sign({email: user.email}, process.env.SECRET)
        if(check){
          res.status(200).json({
            message: 'Login success',
            token
          })
        } else {
          res.status(409).json('Wrong password')
        }
      } else {
        res.status(409).json('Email not found')
      }
    })
  }
}