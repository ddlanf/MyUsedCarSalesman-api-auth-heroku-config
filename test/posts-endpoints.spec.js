const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe('Posts Endpoints', function() {
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

      describe(`GET /api/posts`, () => {
           
        beforeEach('insert posts', () =>{
                helpers.seedUsers(db, testUsers),
                helpers.seedPosts(db, testPosts)
            })
            
            it(`responds 200`, () => {
                return supertest(app)
                .get('/api/posts')
                .expect(200)
            })

      })

      describe(`GET /api/posts/:id`, () => {
           
        beforeEach('insert posts', () =>{
                helpers.seedUsers(db, testUsers),
                helpers.seedPosts(db, testPosts)
            })
            
            it(`responds 200`, () => {
                return supertest(app)
                .get('/api/posts/1')
                .expect(200)
            })

      })

      describe(`POST /api/posts`, () => {
            beforeEach('insert posts', () =>{
                helpers.seedUsers(db, testUsers),
                helpers.seedPosts(db, testPosts)
            })
            
            it(`responds 401 'Unauthorized request' when token is invalid`, () => {
                const userInvalidPass = { user_name: testUsers[0].user_name}
                return supertest(app)
                .post('/api/posts')
                .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
                .expect(401, { error: `Unauthorized request` })
            })

      })

      describe(`DELETE /api/posts/:id`, () => {
        beforeEach('insert posts', () =>{
            helpers.seedUsers(db, testUsers),
            helpers.seedPosts(db, testPosts)
        })
        
        it(`responds 401 'Unauthorized request' when token is invalid`, () => {
            const userInvalidPass = { user_name: 'wrong_username'}
            return supertest(app)
            .delete('/api/posts/1')
            .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
            .expect(401, { error: `Unauthorized request` })
        })

       })

       describe(`PATCH /api/posts/:id`, () => {
        beforeEach('insert posts', () =>{
            helpers.seedUsers(db, testUsers),
            helpers.seedPosts(db, testPosts)
        })
        
        it(`responds 401 'Unauthorized request' when token is invalid`, () => {
            const userInvalidPass = { user_name: 'wrong_username'}
            return supertest(app)
            .patch('/api/posts/1')
            .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
            .expect(401, { error: `Unauthorized request` })
        })

       })

      describe(`GET /api/posts/by-user`, () => {
        beforeEach('insert posts', () =>{
            helpers.seedUsers(db, testUsers),
            helpers.seedPosts(db, testPosts)
        })
        
        it(`responds 401 'Unauthorized request' when token is invalid`, () => {
            const userInvalidPass = { user_name: 'wrong_username'}
            return supertest(app)
            .post('/api/posts')
            .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
            .expect(401, { error: `Unauthorized request` })
        })

      })



})
