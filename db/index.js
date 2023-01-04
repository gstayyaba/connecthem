const mongoose = require('mongoose')

const uri = "mongodb+srv://dbuser:OWMgBSSbIihYbbPX@cluster0.m01fkuo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch((e) => {
  console.log(e)
  process.exit(-1)
})



