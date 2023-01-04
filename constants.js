module.exports.CODE_IDTF_STUDENT        = 's'
module.exports.CODE_IDTF_NGO            = 'n'
module.exports.CODE_IDTF_COMPANY        = 'c'
module.exports.CODE_IDTF_ADMIN          = 'a'
module.exports.CODE_IDTF_GRANT          = 'g'
module.exports.CODE_IDTF_INTERNSHIP     = 'i'
module.exports.CODE_IDTF_AUTH           = 'h'
module.exports.CODE_IDTF_APP_GRANT      = 'q'
module.exports.CODE_IDTF_APP_INTERNSHIP = 'w'
module.exports.CODE_IDTF_APP_STUDENT    = 'e'
module.exports.CODE_IDTF_APP_NGO        = 'r'
module.exports.CODE_IDTF_APP_COMPANY    = 't'

module.exports.CODE_DOMAIN_COMPANY      = 'companies'
module.exports.CODE_DOMAIN_STUDENT      = 'students'
module.exports.CODE_DOMAIN_NGO          = 'ngos'
module.exports.CODE_DOMAIN_GRANT        = 'grants'
module.exports.CODE_DOMAIN_INTERNSHIP   = 'internships'
module.exports.CODE_DOMAIN_APP_COMPANY  = 'applications/companies'
module.exports.CODE_DOMAIN_APP_STUDENT  = 'applications/students'
module.exports.CODE_DOMAIN_APP_NGO      = 'applications/ngos'
module.exports.CODE_DOMAIN_APP_GRANTS   = 'applications/grants'
module.exports.CODE_DOMAIN_APP_INTERNSIPS = 'applications/internships'

module.exports.allowedFilters = ['UNIVERSITY', 'PAGE', 'STATUS']

module.exports.UNIVERSITIES = {
  ITU: 'Information Technology University',
  UET: 'University of Engineering Technology',
}
module.exports.STATUS = {
  verified: 1, blacked: 2, pending: 3
}
module.exports.GRANT = {
  accepted: 1, blacked: 2, pending: 3
}
module.exports.INTERN = {
  accepted: 1, blacked: 2, pending: 3
}

module.exports.progress_codes = {
  name: 1, cnic: 2, university: 4, imgcnic: 8, imgpic: 16, imguni: 32, imgres: 64, city: 128, imgbill: 256, email: 512, phone: 1024
}

module.exports.allskills = {
  IT: ['oop', 'java', 'cpp'],
  OTHERS: ['biochem', 'app dev', 'game dev'],
}

module.exports.secret = "secret"
