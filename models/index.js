const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

async function dbAuthenticator() {
  await db.authenticate().then(() => { console.log('connected to database') })
}
dbAuthenticator()

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: Sequelize.ENUM('open', 'closed')
})

Page.beforeValidate((page) => {
  page.slug = slugConverter(page.title)
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Page.belongsTo(User, { as: 'author' })

function slugConverter(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
}

module.exports = { db, Page, User }
