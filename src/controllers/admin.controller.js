const Admin = require('../models/admin.models')
const {
  generateSalt,
  hashPassword,
  decodePassword
} = require('../services/password.services')

const signup = async (req, res) => {
  try {
    const users = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Email: req.body.Email,
      contact: req.body.contact
    }

    const salt = generateSalt()
    users.password = hashPassword(req.body.password, salt)
    const user = await Admin.create(users)
    res.json({
      message: user
    })
  } catch (error) {
    res.json({
      message: 'internal server error'
    })
  }
}

const getAllAdmins = async (req, res) => {
  try {
    const users = await Admin.find()
    res.json({
      message: users
    })
  } catch (error) {
    res.json({
      message: 'internal server error'
    })
  }
}

const login = async (req, res) => {
  const checkuser = await Admin.findOne({ Email: req.body.Email })
  if (checkuser) {
    const checkPassword = decodePassword(req.body.password, checkuser.password)

    if (checkPassword) {
      return res.json({ Message: 'You are now logged in' })
    } else {
      return res.json({ Message: 'Your password is incorrect' })
    }
  } else {
    return res.json({ Message: 'user/emailId not found' })
  }
}

module.exports = {
  signup,
  getAllAdmins,
  login
}
