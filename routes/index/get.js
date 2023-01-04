const router = require('express').Router()
const constants = require('../../constants')
const db = require('../../db/db')

router.get('/', function(req, res, next) {
  if (req.cookies.user){
    res.render('index/index', { title: 'App', bodyClass :"homepage", u:{
      text: req.cookies.user,
      href: req.cookies.type == "admin"? "admin": '/student/profile'
    }});
  }
  else
    res.render('index/index', {title: 'App', bodyClass :"homepage"})
});

module.exports = router
