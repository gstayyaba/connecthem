const router = require('express').Router()
const postRouter = require('./post')
const getRouter = require('./get')
const {companyModel} = require('../../db/model')

// router.get((req, res, next)=>{
//   if (req.cookies.company){
//     next()
//   } else if (req.path == '/login' && req.query.token){
//     next()
//   }  else {
//     res.render('index/error', {
//       message: "You dont have access to this page",
//       error: {}
//     })
//   }
// })

router.use('/', postRouter)
router.use('/', getRouter)

module.exports = router
