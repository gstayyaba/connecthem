# connecthem

### Disclaimer
This project is done by Abdullah Qureshi, Muhammad Omer Irfan, Amna Irfan, and me under the supervision of Mr. Sarfraz Raza. This is an ITU project. If anyone want to contribute or continue working on this project He\She can but it needs to be free for use for anyone.

## Overview
This projects helps to connect students with NGOs and companies. 
=>Company admin can make job posts and these will be visible to students. From Applicant button, company admin can see all student that have applied to the job. Company admin can also search based on job title. From student button, company can see all students profile who have mentioned their own skill. Comapny admin can search here also based on skills that students mentioned in their profile.

=>Students can make profile by adding relevant data,submit his\her profile, then this goes to Admin and student will receive an email of application submitted. .In case of acceptance from admin, the student will get acceptance email and can see Grant and Internship button. In case of rejection, student will get rejection email with reason mentioned by admin and the reason will also appears on student profile. The student can make changes and resubmit his\her profile that will go to Admin for review. After Acceptance from Admin, The student can apply for grant by clicking on grant button and uploading university fees slip. The Student when click on Internship button can apply based on company specific jobs or if he\she doesnot have that skills then can enter his\her own skill in skill base apply. In company base, the profile will be visible to specific company and in skill base, the profile will visible to all regisetered companies.

=>Admin will review the profile of student and will accept or reject the student profile. For rejection admin have to give reason. 

=>Boss will register companies, admin profile and a token will be generated that will be allow company admin and Admins to login to their profile. 
for example: https://connecthem.tayyabashoukat.repl.co/company/login?token=333948356 for company login
             https://connecthem.tayyabashoukat.repl.co/admin/login?token=333948356   for admin login

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

There is nodemailer that will send emails to students. Do add email id and app password (not gmail password) in mailer.js.
`const mailer = nm.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'connecttthem@gmail.com',
        pass: 'gpdfvtcxvwisspwn'
    }
});`
