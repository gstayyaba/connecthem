const router = require('express').Router()
const postRouter = require('./post')
const getRouter = require('./get')

router.post('*', (req, res, next)=>{
  (req.cookies.user||req.path == '/signup'||req.path=='/login')? next(): res.render('student/login', {msg: `Looks like you aren't registered!`})
})

router.use('/', postRouter)
router.use('/', getRouter)

module.exports = router
