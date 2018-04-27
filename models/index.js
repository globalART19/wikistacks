const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack')

const Page = db.define('page', {
  title: Sequelize.STRING,
  slug: Sequelize.STRING,
  content: Sequelize.STRING,
  status: Sequelize.BOOLEAN
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = {
  db
}
