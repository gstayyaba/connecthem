const mongoose = require('mongoose')

const student = {
  name: String,
  cnic: String,
  city: String,
  phone: String,
  email: String,
  university: String,
  password: String,
  status: {
    type: Number, enum : [1, 2, 3]
  },
  progress: Number,
  msg: String,
  grant: {
    type: Number, enum : [1, 2, 3]
  },
  internship: {
    type: Number, enum : [1, 2, 3]
  },
  skills: [String],
  jobs: [String],
  imgcnic: String,
  imgres: String,
  imguni: String,
  imgbill: String,
  imgcv: String,
  imgpic: String,
  imgfee: String,
  imgtranscript: String,
}

const ngo = {
  name: String,
  applicant: String,
  facebook: String,
  organization: String,
  phone: String,
  email: String,
  website: String,
  designation: String,
  cnic: String,
  password: String,
  token: {
    type: String,
    default: ()=>Math.floor(Math.random()*1e9).toString()
  }
}

const company = {
  name: String,
  applicant: String,
  phone: String,
  email: String,
  website: String,
  salary: {
    type: String,
    default: "15-20",
  },
  linkedin: String,
  skills: [String],
  candidate: [String],
  password: String,
  designation: String,
  cnic: String,
  token: {
    type: String,
    default: ()=>Math.floor(Math.random()*1e9).toString()
  }
}

const admin = {
  name: String,
  cnic: String,
  phone: String,
  email: String,
  status: Boolean,
  password: String,
  token: {
    type: String,
    default: ()=>Math.floor(Math.random()*1e9).toString()
  }
}

const internshipJobs = {
  job_title: String,
  company_id: String,
  company_name: String,
  description: String,
  skills: [String],
  candidates: [String],
}


module.exports.student = mongoose.model('student', new mongoose.Schema(student))

module.exports.admin = mongoose.model('admin', new mongoose.Schema(admin))

module.exports.ngo = mongoose.model('ngo', new mongoose.Schema(ngo))

module.exports.company = mongoose.model('company', new mongoose.Schema(company))

module.exports.internship_jobs = mongoose.model('internship_jobs', new mongoose.Schema(internshipJobs))
