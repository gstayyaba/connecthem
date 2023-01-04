const router = require('express').Router()
const { companyModel, studentModel, internshipJobsModel } = require('../../db/model')
const { send, composeEmailForSuccessInternship } = require('../../mailer/mailer')


router.post('/signup', async (req, res) => {
  const results = await companyModel.addOne(req.body)
  if (results.success) {
    res.json({ status: true, reason: '' })
  } else {
    res.json({ status: false, reason: "write" })
  }
})

router.post('/login', (req, res) => {
  companyModel.getOne(req.body.email, 'email').then((data) => {
    if (data.success) {
      if (req.body.password == data.data.password) {
        if (req.query.token == data.data.token) {
          res
            .cookie('company', data.data._id.valueOf())
            .json({ status: data.success, reason: '' })
        } else {
          throw Error('token')
        }
      } else {
        throw Error('password')
      }
    } else {
      throw Error('ghost')
    }
  }).catch(e => res.json({ status: false, reason: e.message }))
})

router.post('/update', (req, res) => {
  // console.log(req.body);
  if (req.body.changepassword) {
    req.body.password = req.body.newpassword
  }

  companyModel.updateOne(req.cookies.company, req.body).then((data) => {
    if (data.success) {
      res.render('company/index', data.data)
    } else {
      res.json({ status: false, reason: 'update' })
    }
  }).catch(err => {
    res.json({ status: false, reason: 'server' })
  })
})
router.post('/post-job', (req, res) => {
  req.body.company_id = req.cookies.company
  console.log(req.body);
  internshipJobsModel.addOne(req.body).then((data) => {
    if (data.success) {
      res.json({ status: true, reason: data})
    } else {
      res.json({ status: false, reason: data.reason})
    }
  }).catch(err => {
    res.json({ status: false, reason: 'server' })
  })
  // if (req.body.changepassword) {
  //   req.body.password = req.body.newpassword
  // }

  // companyModel.updateOne(req.cookies.company, req.body).then((data) => {
  //   if (data.success) {
  //     res.render('company/index', data.data)
  //   } else {
  //     res.json({ status: false, reason: 'update' })
  //   }
  // }).catch(err => {
  //   res.json({ status: false, reason: 'server' })
  // })
})

router.post('/edit', (req, res) => {
  // console.log(req.body)
  if (req.body.changepassword) {
    req.body.password = req.body.newpassword
  }

  // console.log(req.body)
  companyModel.updateOne(req.cookies.company, req.body).then((data) => {
    if (data.success) {
      res.status(304).redirect('/company/profile')
    } else {
      res.render('index/error', {
        message: "Failure",
        error: {}
      })
    }
  }).catch((e) => res.render('index/error', {
    message: "Failure",
    error: {}
  }))
})

// route to accept intern in company
router.post('/accept-intern', async (req, res) => {
  let studentDetail = await studentModel.getOne(req.body.id)

  companyModel.approveIntern(
    req.body.id
  ).then(() => {
    send(composeEmailForSuccessInternship(studentDetail.data.email, studentDetail.data.name))
    res.json({ status: true, reason: '' })
  })
    .catch((e) => {
      console.log("not working");
      res.json({ status: false, reason: e })
    })

})

// route to reject intern in company
router.post('/reject-intern', (req, res) => {
  console.log(req.body)
  companyModel.rejectIntern(
    req.body.id, req.body.msg
  ).then(() => {
    res.json({ status: true, reason: '' })
  })
    .catch((e) => res.json({ status: false, reason: e }))

})
// remove job
router.post('/remove-job', (req, res) => {
  // console.log(req.body)
  internshipJobsModel.removeOne({_id:
    req.body.id
  }).then((data) => {
    console.log(data);
    res.json({ status: true, reason: '' })
  })
    .catch((e) => res.json({ status: false, reason: e }))

})

module.exports = router
