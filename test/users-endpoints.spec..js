const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe('Users Endpoints', function() {
  let db

  const {
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

      describe(`POST /api/users`, () => {
              beforeEach('insert users', () =>{
                  helpers.seedPosts(db, testUsers)
              })
              
              it(`responds 401 'Unauthorized request' when token is invalid`, () => {
                  const userInvalidPass = { user_name: testUsers[0].user_name}
                  return supertest(app)
                  .get('/api/users')
                  .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
                  .expect(401, { error: `Unauthorized request` })
              })

        })

      describe(`POST /api/users`, () => {
            beforeEach('insert users', () =>{
                helpers.seedPosts(db, testUsers)
            })
            
            it(`responds 400 without body`, () => {
                return supertest(app)
                .post('/api/users')
                .expect(400)
            })

        })

      describe(`GET /api/users/:id`, () => {
          beforeEach('insert users', () =>{
              helpers.seedPosts(db, testUsers)
          })
          
          it(`responds 401 'Unauthorized request' when token is invalid`, () => {
              const userInvalidPass = { user_name: testUsers[0].user_name}
              return supertest(app)
              .get('/api/users/1')
              .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
              .expect(401, { error: `Unauthorized request` })
          })

      })
   
      describe(`PATCH /api/users/:id`, () => {
        beforeEach('insert users', () =>{
            helpers.seedPosts(db, testUsers)
        })
        
        it(`responds 401 'Unauthorized request' when token is invalid`, () => {
            const userInvalidPass = { user_name: testUsers[0].user_name}
            return supertest(app)
            .patch('/api/users/1')
            .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
            .expect(401, { error: `Unauthorized request` })
        })

      })

      describe(`DELETE /api/users/:id`, () => {
        beforeEach('insert users', () =>{
            helpers.seedPosts(db, testUsers)
        })
        
        it(`responds 401 'Unauthorized request' when token is invalid`, () => {
            const userInvalidPass = { user_name: testUsers[0].user_name}
            return supertest(app)
            .patch('/api/users/1')
            .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
            .expect(401, { error: `Unauthorized request` })
        })

      })
})
