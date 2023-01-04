const router = require('express').Router()

const getRoutes = require('./get')
const postRoutes = require('./post')

router.use('/', getRoutes)
router.use('/', postRoutes)

module.exports = router
