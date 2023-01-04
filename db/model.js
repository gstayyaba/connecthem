const db = require('./db')
const constants = require('../constants')

module.exports.studentModel = {
  getOne: async (...arguments)=>{
    return await db.getOne(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  auth: async (...arguments)=>{
    return await db.getOne(constants.CODE_IDTF_AUTH, ...arguments)
  },
  addOne: async (...arguments)=>{
    return await db.addOne(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  requestGrant: async (...arguments)=>{
    return await db.updateOne(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  requestInternship: async (...arguments)=>{
    return await db.updateOne(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  updateOne: async (...arguments)=>{
    return await db.updateOne(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  getAll: async (...arguments)=>{
    return await db.getAllFiltered(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  getIds: async (...arguments)=>{
    return await db.getAllIds(constants.CODE_IDTF_STUDENT, ...arguments)
  },
}

module.exports.adminModel = {
  getOne: async (...arguments)=>{
    return await db.getOne(constants.CODE_IDTF_ADMIN, ...arguments)
  },
  getAllFiltered: async (...arguments)=>{
    return await db.getAllFiltered(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  auth: async (...arguments)=>{
    return await db.getOne(constants.CODE_IDTF_AUTH, ...arguments)
  },
  addOne: async (...arguments)=>{
    return await db.addOne(constants.CODE_IDTF_ADMIN, ...arguments)
  },
  verifyStudent: async (...arguments)=>{
    return await db.verify(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  rejectStudent: async (...arguments)=>{
    return await db.reject(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  verifyNgo: async (...arguments)=>{
    return await db.updateOne(constants.CODE_IDTF_NGO, ...arguments)
  },
  rejectNgo: async (...arguments)=>{
    return await db.reject(constants.CODE_IDTF_NGO, ...arguments)
  },
  verifyCompany: async (...arguments)=>{
    return await db.updateOne(constants.CODE_IDTF_COMPANY, ...arguments)
  },
  rejectCompany: async (...arguments)=>{
    return await db.reject(constants.CODE_IDTF_COMPANY, ...arguments)
  },
  getAll: async (...arguments)=>{
    return await db.getAllFiltered(constants.CODE_IDTF_COMPANY, ...arguments)
  },
}


module.exports.ngoModel = {
  getOne: async (...arguments)=>{
    return await db.getOne(constants.CODE_IDTF_NGO, ...arguments)
  },
  addOne: async (...arguments)=>{
    return await db.addOne(constants.CODE_IDTF_NGO, ...arguments)
  },
  getAll: async (...arguments)=>{
    return await db.getAllFiltered(constants.CODE_IDTF_NGO, ...arguments)
  },
}


module.exports.internshipJobsModel = {
  getOne: async (...arguments)=>{
    return await db.getOne(constants.CODE_IDTF_INTERNSHIP, ...arguments)
  },
  addOne: async (...arguments)=>{
    // console.log('w');
    return await db.addOne(constants.CODE_IDTF_INTERNSHIP, ...arguments)
  },
  getAll: async (...arguments)=>{
    return await db.getAllFiltered(constants.CODE_IDTF_INTERNSHIP, ...arguments)
  },
  removeOne: async (...arguments)=>{
    return await db.removeOne(constants.CODE_IDTF_INTERNSHIP, ...arguments)
  },
  updateOne: async (...arguments)=>{
    return await db.updateOne(constants.CODE_IDTF_INTERNSHIP, ...arguments)
  },
}

module.exports.companyModel = {
  getOne: async (...arguments)=>{
    return await db.getOne(constants.CODE_IDTF_COMPANY, ...arguments)
  },
  addOne: async (...arguments)=>{
    return await db.addOne(constants.CODE_IDTF_COMPANY, ...arguments)
  },
  approveIntern: async (...arguments)=>{
    return await db.internAccept(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  rejectIntern: async (...arguments)=>{
    return await db.internReject(constants.CODE_IDTF_STUDENT, ...arguments)
  },
  updateOne: async (...arguments)=>{
    return await db.updateOne(constants.CODE_IDTF_COMPANY, ...arguments)
  },
  getAll: async (...arguments)=>{
    return await db.getAllFiltered(constants.CODE_IDTF_COMPANY, ...arguments)
  },
}
