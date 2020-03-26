const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe('Comments Endpoints', function() {
  let db

  const {
    testUsers,
    testImages
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

    describe(`POST /api/images`, () => {
      beforeEach('insert images', () =>{
          helpers.seedUsers(db, testUsers)
          helpers.seedImages(db, testImages)
      })
      
      it(`responds 401 'Unauthorized request' when invalid authrization token`, () => {
          const userInvalidPass = { user_name: 'invalid' }
          return supertest(app)
          .post('/api/images')
          .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
          .expect(401, { error: `Unauthorized request` })
      })
    })
    
    describe(`GET /api/images/post_id`, () => {
        beforeEach('insert images', () =>{
            helpers.seedUsers(db, testUsers)
            helpers.seedImages(db, testImages)
        })
        
        it(`responds 200`, () => {
            return supertest(app)
            .get('/api/images')
            .expect(200)
        })
    })
        
    describe(`GET /api/images:post_id`, () => {
          beforeEach('insert images', () =>{
              helpers.seedUsers(db, testUsers)
              helpers.seedImages(db, testImages)
          })
          
          it(`responds 200`, () => {
              return supertest(app)
              .get('/api/images/1')
              .expect(200)
              
          })
      })

    describe(`PATCH /api/images/post_id`, () => {
      beforeEach('insert posts', () =>{
          helpers.seedUsers(db, testUsers),
          helpers.seedImages(db, testImages)
      })
      
      it(`responds 401 'Unauthorized request' when token is invalid`, () => {
          const userInvalidPass = { user_name: 'invalid'}
          return supertest(app)
          .patch('/api/images/1')
          .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
          .expect(401, { error: `Unauthorized request` })
      })

    })

})



