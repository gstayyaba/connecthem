# connecthem

### Disclaimer
This project is done by Abdullah Qureshi, Muhammad Omer Irfan, Amna Irfan, and me under the supervision of Mr. Sarfraz Raza. This is an ITU project. If anyone want to contribute or continue working on this project He\She can but it needs to be free for use for anyone.

#Introduction
This projects helps to connect students with NGOs and companies. Companies can make job posts and these will be visible to students. Students can make profile by adding relevant data and then this goes to Admin. Admin will review the profile of student and will accept or reject the student profile. 

### How to run

Do install Nodejs and npm 

Create a new cluster in mongodb and connect it by replacing the connecting link in @gstayyaba/connecthem/db/index.js.  
`(const uri = "mongodb+srv://dbuser:OWMgBSSbIihYbbPX@cluster0.m01fkuo.mongodb.net/?retryWrites=true&w=majority";).  `  
Add your username and password where the link says.

Do make account on cloudinary and attach relevant data in app.js.  
`cloudinary.config({ 
  cloud_name: "dskqknnla",
  api_key: "815317365562651",
  api_secret: "mvZ1TW70xrw4CGLSLmXGT0ckIXU"
});`  
