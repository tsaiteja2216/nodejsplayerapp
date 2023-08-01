const express = require('express')
const AdminController = require('../controllers/admin.controller')

const AdminRouter = express.Router()

AdminRouter.post('/admin/signup', AdminController.signup)

// AdminRouter.post('/admin/login', AdminController.login)

AdminRouter.post('/admin/login', AdminController.login)

AdminRouter.get('/admin/signup', AdminController.getAllAdmins)

module.exports = AdminRouter
