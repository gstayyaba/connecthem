const router = require('express').Router()
const constants = require('../../constants')
const {adminModel} = require('../../db/model')
const {composeEmailForSuccessSignup,composeEmailForUnSuccessSignup,send} = require('../../mailer/mailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res, next)=>{
  bcrypt.hash(req.body.password, 10).then(hash=>{
    req.body.password = hash
    next()
  }).catch(e=> res.json({status: false, reason: "error"}))
},async (req, res)=>{
  let result = await adminModel.addOne(req.body)
  if (result.success)
  {
    res
      //.cookie('id', jwt.sign(req.admin.cnic, constants.secret))
      .json({status: true, reason: ""})
  }
  else res.json({status: false, reason: 'dup'})
})

router.post('/login', async (req, res, next)=>{
  let admin = await adminModel.getOne( req.body.cnic, 'cnic')
  if (admin.success && admin.data){
    req.admin = admin.data
    next()
  } else {
    res.json({status: false, reason: 'ghost'})
  }
}, async (req, res, next)=>{
  bcrypt.compare(req.body.password, req.admin.password).then((matched)=>{
    if (matched) next()
    else res.json({status: false, reason: 'password'})
  }).catch(e=>res.json({status: false, reason: 'error'}))
}, async (req, res)=>{
  res
    .cookie('id', jwt.sign(req.admin.cnic, constants.secret))
    .json({status: true, reason: ''})
  
})

router.post('/accept', async (req, res)=>{
  // console.log(req.body);
  adminModel.verifyStudent(
    req.body.id
  ).then(()=>{
    send(composeEmailForSuccessSignup(req.body.email, req.body.name))
    res.json({status: true,reason: ''})
  })
  .catch((e)=>res.json({status: false, reason: e}))
  
})

router.post('/reject', (req, res)=>{
  adminModel.rejectStudent(
    req.body.id, req.body.msg
  ).then(()=>{
    send(composeEmailForUnSuccessSignup(req.body.email, req.body.name, req.body.msg))
    res.json({status: true,reason: ''})
  })
  .catch((e)=>res.json({status: false, reason: e}))
})

module.exports = router
