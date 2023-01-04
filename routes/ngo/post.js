const router = require('express').Router()
//const path = require('path')
//const multer = require('multer')({dest: path.join(__dirname, '..', '..', 'public', 'uploads')})
const { ngoModel } = require('../../db/model')

router.post('/signup', (req, res)=>{
  ngoModel.addOne(req.body).then(data=>{
    if (data.success && data.data){
      res.json({status: true, reason: ''})
    } else throw Error('failed')
  }).catch(e=>res.json({status: false, reason: 'write'}))
})

module.exports = router
