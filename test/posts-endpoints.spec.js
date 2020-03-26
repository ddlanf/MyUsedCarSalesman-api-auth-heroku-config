const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const request = require('supertest');

describe('Comments Endpoints', function() {
  let db

  const {
    testPosts,
    testUsers,
  } = helpers.myUsedCarSalesmanFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/posts`, () => {
    beforeEach('insert posts', () =>{
        helpers.seedPosts(
            db,
            testPosts
        )
        helpers.seedUsers(
            db,
            testUsers
        )
    })

    let token 
    before(function(done) {
        request(app)
          .post('/api/auth/login')
          .send({ user_name: 'user1', password: 'user1_password' })
          .end(function(err, res) {
              console.log(res.body)
            token = res.body.token; // Or something
            done();
          })
     })



    
    it(`responds 401 'Unauthorized request' when invalid password`, () => {
        const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
        return supertest(app)
         .post('/api/posts')
         .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
         .expect(401, { error: `Unauthorized request` })
    })

    it(`creates a post, responding with 201 and the new post`, function() {

        this.retries(3)
        const testPost = testPosts[0]
        const testUser = testUsers[0]
        const newPost = {
            make:"Ford",
            model:"F150",
            year: 1995,
            mileage: 10002,
            description:"periam, eaque ipsa quae ab illo inventore veritatis et quasi dicta sunt ex velit",
            price: 12000,
            commission_amount: "20% or Any Amount Above Original Price",
            location: "Seattle, WA",
            other_terms_and_conditions: "eriam, eaque ipsa quae ab illo inventore veritatis et quasi di",
            user_id : 2,
        }

        return supertest(app)
          .post('/api/posts')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newPost)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.make).to.eql(newPost.make)
            expect(res.body.id).to.eql(newPost.id)
            const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
            const actualDate = new Date(res.body.date_created).toLocaleString()
            expect(actualDate).to.eql(expectedDate)
          })
          /*
          .expect(res =>
            db
              .from('blogful_comments')
              .select('*')
              .where({ id: res.body.id })
              .first()
              .then(row => {
                expect(row.text).to.eql(newComment.text)
                expect(row.article_id).to.eql(newComment.article_id)
                expect(row.user_id).to.eql(testUser.id)
                const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
                const actualDate = new Date(row.date_created).toLocaleString()
                expect(actualDate).to.eql(expectedDate)
              })
          )*/
      })

})

})
