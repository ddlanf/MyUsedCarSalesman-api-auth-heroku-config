const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')


describe('Comments Endpoints', function() {
  let db

  const {
    testReports,
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
        helpers.seedUsers(db, testUsers),
        helpers.seedReports(db, testReports)
    })
    
    it(`responds 401 'Unauthorized request' when invalid token`, () => {
        const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
        return supertest(app)
         .get('/api/reports')
         .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
         .expect(401, { error: `Unauthorized request` })
    })

})

})
