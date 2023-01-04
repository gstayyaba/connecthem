const router = require('express').Router()
const {adminModel, ngoModel, companyModel} = require('../../db/model')


router.post("/admin", (req, res)=>{
  adminModel.addOne({
    ...req.body
  }).then(data=>{
    if (data.success) res.json({status: true, reason: ''})
    else throw Error('failed')
  }).catch(e=>res.json({status: true, reason: e.message}))
})

router.post("/ngo", (req, res)=>{
  ngoModel.addOne({
    ...req.body
  }).then(data=>{
    if (data.success) res.json({status: true, reason: ''})
    else throw Error('failed')
  }).catch(e=>res.json({status: true, reason: e.message}))
})


router.post("/company", (req, res)=>{
  companyModel.addOne({
    ...req.body
  }).then(data=>{
    if (data.success) res.json({status: true, reason: ''})
    else throw Error('failed')
  }).catch(e=>res.json({status: true, reason: e.message}))
})


module.exports = router
