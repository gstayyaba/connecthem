const router = require('express').Router();
const up = require('../../cloud')
const constants = require("../../constants")
const { studentModel,companyModel, internshipJobsModel } = require('../../db/model')
const {progress_codes} = require('../../constants')
const {send,composeEmailForGrant, composeEmailForInternship, composeEmailForSignup} = require('../../mailer/mailer')

const createUserData = (fields, progress) => {
  let data = {},
    set = (id) => {
      if (fields[id]) {
        if (fields[id] != '') {
          progress |= +constants.progress_codes[id];
          data[id] = fields[id]
        }
      }
    }
  set('cnic')
  set('name')
  set('email')
  set('phone')
  set('university')
  set('password')
  set('city')
  // console.log(progress)
  if (progress)
    data.progress = progress
  data.status = constants.STATUS.pending;
  return data
}

router.post('/login', async (req, res) => {
  // console.log(req.body)
  let st = await studentModel.getOne(req.body.cnic, 'cnic')
  // console.log(st)
  if (!st.success || !st.data)
    return res.json({status: false, reason: 'ghost'})
  if (req.body.password == st.data.password) {
    res
      .cookie('user', st.data.cnic)
      .json({status: true, reason: ""})
      
  } else
    res.json({status: false, reason: "password"})

})

router.post('/signup', async (req, res) => {
  
    let results = await studentModel.addOne({ ...req.body, status: constants.STATUS.pending, progress: 7 });
    
    res.cookie("user", req.body.cnic).json({ status: true, reason: '' })
  // }
})

router.post('/sendForReview', async (req, res) => {
  let nn = await studentModel.getOne( req.cookies.user, 'cnic');
  console.log(nn.data.progress);
  if(nn.data.progress ===2047 ){
    send(composeEmailForSignup(nn.data.email, nn.data.name))
    res.json({status: true, reason: ''})
  }
})

router.post('/profile', up.fields([
  {name: 'imgcnic', maxCount: 1},
  {name: 'imgbill', maxCount: 1},
  {name: 'imgres', maxCount: 1},
  {name: 'imguni', maxCount: 1},
  {name: 'imgpic', maxCount: 1},
]), async (req, res) => {
  let update = createUserData(req.body, 7)
  for (let key in req.files){
    let name = req.files[key][0].fieldname
    update[name] = req.files[key][0].path
    update.progress |= constants.progress_codes[name]
  }
  update.$bit = {
    progress: {or: update.progress}
  }
  delete update.progress
  // console.log(update)
  studentModel
    .updateOne(req.cookies.user, update ,"cnic")
    .then((data)=>{

      res.redirect(req.get('referer'));
    })
    .catch(e=>res.json({ status: false, reason: 'db' }));
})

router.post('/jobUpdate/:id', async (req, res)=>{
  let page = 0
  let company = req.body.companyId
  let companyDetail= await companyModel.getOne(company)
  let jobDetail= await internshipJobsModel.getOne(req.params.id)

  let studentDetail = await studentModel.getOne(req.body.sId)
  if(companyDetail.data.candidate){
    if(companyDetail.data.candidate.indexOf(req.body.sId) === -1)
      companyDetail.data.candidate.push(req.body.sId)
  }else{
    companyDetail.data.candidate = [req.body.sId]
  }
  if(jobDetail.data.candidates){
    if(jobDetail.data.candidates.indexOf(req.body.sId) === -1)
      jobDetail.data.candidates.push(req.body.sId)
  }else{
    jobDetail.data.candidates = [req.body.sId]
  }
  if(studentDetail.data.jobs){
    if(studentDetail.data.jobs.indexOf(req.params.id) === -1)
      studentDetail.data.jobs.push(req.params.id)
  }else{
    studentDetail.data.jobs = [req.params.id]
  }
  
  let companyUpdate = await companyModel.updateOne(company, companyDetail.data)
  let studentUpdate = await studentModel.updateOne(req.body.sId, studentDetail.data)
  let jobUpdate = await internshipJobsModel.updateOne(req.params.id, jobDetail.data)
  
    if (jobUpdate.success){
      // res.render('company/index', data.data)
      res.send({status: true, data: "working"})
    } 
})

router.post('/grant', up.single('imgfee'), async (req, res) => {
  let studentDetail = await studentModel.getOne(req.body.sId)
  // console.log(studentDetail)
  studentModel.requestGrant(
    req.cookies.user,
    {
      grant: constants.STATUS.pending,
      imgfee: req.file.path
    },
    "cnic"
  ).then((data)=>{
    send(composeEmailForGrant(studentDetail.data.email, studentDetail.data.name))
    
  })
   .catch(()=>res.json({ status: false, reason: 'write' }))
})

router.post('/internship', up.fields([
  {name: "imgcv", maxCount: 1},
  {name: "imgtranscript", maxCount: 1},
]), async (req, res) => {

  let studentDetail = await studentModel.getOne(req.body.sId)
  
  studentModel.updateOne(
    req.cookies.user, {
      internship: constants.STATUS.pending,
      skills: req.body.skills,
      imgcv: req.files.imgcv[0].path,
      imgtranscript: req.files.imgtranscript[0].path,
    },
    "cnic"
  ).then((data)=>{
    send(composeEmailForInternship(studentDetail.data.email, studentDetail.data.name))
    res.redirect('/student/profile')
    
  })
    .catch(()=>console.log("hrr") || res.json({ status: false, reason: 'write' }))
})

module.exports = router
