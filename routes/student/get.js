const router = require('express').Router()
const {studentModel, companyModel, internshipJobsModel} = require('../../db/model')
const {progress_codes} = require('../../constants')

router.get('/profile', async (req, res, next) =>{
  let page = parseInt(req.query.page) || 0
  let select = 'name skills _id candidate'
  if (!req.cookies.user){
    res.render('student/login')
  } else {
    let nn = await studentModel.getOne( req.cookies.user, 'cnic');
    let companiesList= await companyModel.getAll({page, select})
    let jobList = await internshipJobsModel.getAll({page})
    // console.log({...nn.data});
    res.render('student/profile', {
      ...nn.data,
      code: {...(Object.keys(progress_codes).reduce((r, k)=>{
        if (k.startsWith('img')){
          r[k] = progress_codes[k]
          return r
        }
        return r
      }, {}))},
      companies: companiesList.data,
      jobList: jobList.data,
    });
  }
});

router.get('/signup', function(req, res, next) {
  res.render('student/signup');
});

router.get('/login', function(req, res, next) {
  res.render('student/login');
});

module.exports = router
