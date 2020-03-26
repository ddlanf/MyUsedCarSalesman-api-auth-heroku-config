module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/myusedcarsalesman',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/myusedcarsalesman_test',
    CLIENT_ORIGIN: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1h',
  }
  
