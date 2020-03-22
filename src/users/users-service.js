const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  hasUserWithUserName(db, user_name) {
    return db('myusedcarsalesman_users')
      .where({ user_name })
      .first()
      .then(user => !!user)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('myusedcarsalesman_users')
      .returning('*')
      .then(([user]) => user)
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      id: user.id,
      user_name: xss(user.user_name),
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      email: xss(user.email),
      date_created: new Date(user.date_created),
    }
  },
  getAllUsers(db){
    return db
        .from('myusedcarsalesman_users as usr')
        .select(
            'usr.id',
            'usr.user_name',
            'usr.password',
            'usr.first_name',
            'usr.last_name',
            'usr.date_created',
            'usr.email',
            'usr.user_status'
        )      
  },
  getById(db, id) {
    return UsersService.getAllUsers(db)
      .where('usr.id', id)
      .first()
  },
  deleteUser(db, user_id) {
      return db
        .from('myusedcarsalesman_users')
        .where('id', user_id )
        .delete()
  },
  checkUserStatus(db, user_id){
    return db
        .from('myusedcarsalesman_users as usr')
        .select(
          'usr.user_status'
        )
        .where('id', user_id )
        .first()
  },
  updateUserStatus(db, user_id, status) {
    return db
      .from('myusedcarsalesman_users')
      .where('id', user_id )
      .update('user_status', `${status}`)
  }
}

module.exports = UsersService