const router = require('express').Router()
const postRouter = require('./post')
const getRouter = require('./get')

router.use('/', postRouter)
router.use('/', getRouter)

module.exports = router
