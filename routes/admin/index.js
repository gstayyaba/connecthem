const router = require('express').Router()
const getRouter = require('./get')
const postRouter = require('./post')
const db = require('../../db/db')
const jwt = require('jsonwebtoken')
const {secret} = require('../../constants')
  
router.use((req, res, next)=>{
  if (req.method == 'POST') return next()
  if (req.cookies.id){
    jwt.verify(req.cookies.id, secret, (err, decoded)=>{
      req.admin = {cnic: decoded}
      next()
    })
  } else if (req.path == '/login' && req.query.token){
    next()
  } else {
    res.render('index/error', {
      message: "You dont have access to this page",
      error: {}
    })
  }
})

router.use('/', getRouter)
router.use('/', postRouter)

module.exports = router
