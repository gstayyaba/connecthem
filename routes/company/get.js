const router = require('express').Router()
const {companyModel, studentModel, internshipJobsModel} = require('../../db/model')
const constants = require('../../constants')
const APIFeatures = require('../../utils/apifeatures')
const {student} = require("../../db/schema");

const getNormalizeFilter = (filter)=>{
  let normalizedFilter = {}
  for (const k in filter){
    if (constants.allowedFilters.includes(k.toUpperCase())){
      normalizedFilter[k] = filter[k]
    }
  }
  return normalizedFilter
}

router.get('/login', (req, res)=>{
  if (req.query.token){
    companyModel.getOne(req.query.token, 'token').then(data=>{
      if (data.success && data.data){
        res.render('company/login', data.data)
      } else {
        throw Error('Not Allowed')
      }
    }).catch(e=>{
      res.render('index/error', {
        message: "Cannot access this page", error: {}
      })
    })
  } else {
    res.render('index/error', {
      message: "Cannot access this page", error: {}
    })
  }
})

router.get('/profile', async(req, res)=>{
  let page = parseInt(req.query.page) || 0
  let internsJobs = await internshipJobsModel.getAll({page})
    internsJobs = internsJobs.data.filter(items => items.company_id=== req.cookies.company)
  
  let company = await companyModel.getOne(req.cookies.company)
  
    if (company.success && company.data){
      company.data.allskills = constants.allskills
      company.data.internsJobs = internsJobs
      console.log(company.data);
      res.render('company/index', company.data)
    } else {
      res.render('index/error',  {
        message: "Failed",
        error: {}
      })
    }
  // })
})

// student profile added to allow company to be able see student list, this was not present previously thats why it was not working
router.get('/students/:id',async (req, res)=>{
  let data = await studentModel.getOne(req.params.id)
  let jobs = await internshipJobsModel.getAll({page: 0})
  let arr= []
  if(data.data.jobs && data.data.jobs.length > 0){
  arr = jobs.data.filter(item=>    data.data.jobs.includes(item._id.toString()))
  }
  if (data.success && data.data){
    // rendering appplication pug file from comapany 
    res.render('company/application', {attrs: data.data, jobs: arr})
  } else {
    res.render('index/error', {
      message: "Seems like this record was invalid",
      error: {}
    })
  }
})

router.get('/students', async (req, res)=>{
  // console.log(req.cookies.company);
  let filterr = getNormalizeFilter(req.query)
  filterr.progress = 2047
  filterr.page = parseInt(req.query.page) || 0
  filterr.select = "name _id cnic university email phone city grant internship msg"
  // console.log(req.query.skills)
  var arr = req.query.skills === undefined ? [] : (req.query.skills.in)
  if(arr.constructor == Array)
    arr = arr.filter(element => {
      return element !== '';
    });
  let companyDetail = await companyModel.getOne(req.cookies.company)
  let page = parseInt(req.query.page) || 0
  let filter = {page}

  const features = new APIFeatures(student.find(filter), req.query)
      .filter()
      .Pagination();
  let data = await features.query
  res.locals.students = JSON.stringify(data)
  let allSkills = []
  // showing all the students that have skills in their proflile
  data = data.filter(item=> item.skills.length > 0)
  data.forEach(element => {
    allSkills = [...allSkills, ...element.skills]
  });
  
  allSkills =[ ...new Set(allSkills)]
  // console.log(allSkills);
  // showing only thos who didn't aplied already
  // console.log('students', data);
  if(companyDetail.data.candidate){
    data = data.filter(item=> companyDetail.data.candidate.indexOf(item._id.toString()) === -1)
  }
  if (data) {
    res.render('company/list', {
      students: data,
      params: arr,
      page: filterr.page,
      allSkills: allSkills
    })

  }
  
    // studentModel.getAll({
    //   status: constants.STATUS.verified,
    //   internship: constants.STATUS.pending,
    //   skills: { $in: req.query.skills.split(' ')},
    // }).then((data)=>{
    //   res.render('company/list', {
    //     students: data.data
    //   })
    // }).catch((e)=>{
    //   res.render('index/error', {
    //     message: "An error occured", error: {}
    //   })
    // })
})

router.get('/candidates', async (req, res)=>{
  // console.log(req.cookies.company);
  let filterr = getNormalizeFilter(req.query)
  filterr.progress = 2047
  filterr.page = parseInt(req.query.page) || 0
  filterr.select = "name _id cnic university email phone city grant internship msg"
  // console.log(req.query.skills)
  var arr = req.query.skills === undefined ? [] : (req.query.skills.in)
  if(arr.constructor == Array)
    arr = arr.filter(element => {
      return element !== '';
    });
  let companyDetail = await companyModel.getOne(req.cookies.company)
  let page = parseInt(req.query.page) || 0
  let filter = {page}
  let jobList = await internshipJobsModel.getAll({page})
  // getting candidates who applied for internship
  const features = new APIFeatures(student.find({"_id": companyDetail.data.candidate}), req.query)
      .filter()
      .Pagination();
  let data = await features.query
  jobList = jobList.data.filter(item=> item.company_id === req.cookies.company.toString())
  console.log(jobList);
  // res.locals.students = JSON.stringify(data)
  // showing all the students that applied for internship
  // data = data.filter(item=> item.internship)
  if (data) {
    // console.log(allJobs);
    res.render('company/candidatesList', {
      students: data,
      params: arr,
      page: filterr.page,
      allSkills: jobList
    })
  }
  
    // studentModel.getAll({
    //   status: constants.STATUS.verified,
    //   internship: constants.STATUS.pending,
    //   skills: { $in: req.query.skills.split(' ')},
    // }).then((data)=>{
    //   res.render('company/list', {
    //     students: data.data
    //   })
    // }).catch((e)=>{
    //   res.render('index/error', {
    //     message: "An error occured", error: {}
    //   })
    // })
})

module.exports = router
