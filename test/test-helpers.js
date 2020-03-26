require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUserArray(){
   
    return [
        {
            id: 1,
            user_name:"user1",
            password:"user1_password",
            first_name:"UserFirstName1",
            last_name:"UserLastName1",
            email:"user1@gmail.com",
            date_created: new Date('2029-01-22T16:28:32.615Z'),
            user_status: 'Active'
        },
       {
            id: 2,
            user_name:"user2",
            password:"user2_password",
            first_name:"UserFirstName2",
            last_name:"UserLastName2",
            email:"user2@gmail.com",
            date_created: new Date('2029-01-22T16:28:32.615Z'),
            user_status: 'Active'
        },
       {
            id: 3,
            user_name:"user3",
            password:"user2_password",
            first_name:"UserFirstName3",
            last_name:"UserLastName3",
            email:"user3@gmail.com",
            date_created: new Date('2029-01-22T16:28:32.615Z'),
            user_status: 'Active'
        }
    ]
}

 function makeReportArray(){
     return [
        {
            id: 1,
            massage:"aperiam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            massage_type:"Reports",
            user_id: 1,
            date_sent: new Date('2029-01-22T16:28:32.615Z')
        },
       {
            id: 2,
            massage:"aperiam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            massage_type:"Complaints",
            user_id: 2,
            date_sent: new Date('2029-01-22T16:28:32.615Z')
        },
       {
            id: 3,
            massage:"aperiam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            massage_type:"Reports",
            user_id: 3,
            date_sent: new Date('2029-01-22T16:28:32.615Z')
        },
       {
            id: 4,
            massage:"aperiam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            massage_type:"Complaints",
            user_id: 4,
            date_sent: new Date('2029-01-22T16:28:32.615Z')
        }
    ]
 }

   
 function makePostArray(){
     return [
        {
            make:"Ford",
            model:"F150",
            year: "1991",
            mileage: "10002",
            description:"periam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            price: "12000",
            commission_amount: "20% or Any Amount Above Original Price",
            location: "Seattle, WA",
            other_terms_and_conditions: "eriam, eaque ipsa quae ab illo inventore veritatis et quasi di",
            user_id : 1,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
       {
            make:"Toyota",
            model:"Corolla",
            year: "1992",
            mileage: "10002",
            description:"periam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            price: "12000",
            commission_amount: "20% or Any Amount Above Original Price",
            location: "Seattle, WA",
            other_terms_and_conditions: "eriam, eaque ipsa quae ab illo inventore veritatis et quasi di",
            user_id : 2,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
       {
            make:"Ford",
            model:"F150",
            year: "1993",
            mileage: "10002",
            description:"periam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            price: "12000",
            commission_amount: "20% or Any Amount Above Original Price",
            location: "Seattle, WA",
            other_terms_and_conditions: "eriam, eaque ipsa quae ab illo inventore veritatis et quasi di",
            user_id : 3,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
       {
            make:"Toyota",
            model:"Corolla",
            year: "1994",
            mileage: "10002",
            description:"periam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            price: "12000",
            commission_amount: "20% or Any Amount Above Original Price",
            location: "Seattle, WA",
            other_terms_and_conditions: "eriam, eaque ipsa quae ab illo inventore veritatis et quasi di",
            user_id : 4,
            date_created: new Date('2029-01-22T16:28:32.615Z')
        },
       {
            make:"Ford",
            model:"F150",
            year: "1995",
            mileage: "10002",
            description:"periam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            price: "12000",
            commission_amount: "20% or Any Amount Above Original Price",
            location: "Seattle, WA",
            other_terms_and_conditions: "eriam, eaque ipsa quae ab illo inventore veritatis et quasi di",
            user_id : 5,
            date_created: new Date('2029-01-22T16:28:32.615Z')
          
        }
    ]
 }

 function makeImageArray() {
    return [
        {
            src : "http://toyata-image",
            alt : "toyota image",
            post_id: 1
        },
        {
            src : "http://nissan-image",
            alt : "Nissan",
            post_id: 3
        },
        {
            src : "http://ford-image",
            alt : "Ford",
            post_id: 2
        }
    ]
 }

 function myUsedCarSalesmanFixtures() {
    const testUsers = makeUserArray()
    const testPosts = makePostArray()
    const testImages = makeImageArray()
    const testReports = makeReportArray()
    return { testUsers, testPosts, testImages, testReports }
  }


function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('myusedcarsalesman_users').insert(preppedUsers)

}

function seedPosts(db, posts) {
    return db.insert(posts).into('myusedcarsalesman_posts')
}

function seedImages(db, images) {
    images.map(image => {
         return db.insert(JSON.stringify(image)).into('myusedcarsalesman_images')
    })
    
}

function seedReports(db, reports){
    return db.insert(reports).into('myusedcarsalesman_reports')
}

 function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        myusedcarsalesman_users,
        myusedcarsalesman_posts,
        myusedcarsalesman_images,
        myusedcarsalesman_reports
        RESTART IDENTITY CASCADE`
    )
  }

  function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }


module.exports = { 
    makeUserArray,
    makePostArray,
    makeImageArray,
    makeReportArray,

 
    cleanTables,
    seedUsers,
    seedPosts,
    seedImages,
    seedReports,
    makeAuthHeader,
    myUsedCarSalesmanFixtures
}