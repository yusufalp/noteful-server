const knex = require('knex');
const app = require('./app');
const { PORT, DB_URL } = require('./config')

// const PORT = process.env.PORT || 8000;

const db = knex({
  client: 'pg',
  connection: DB_URL
})

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log(DB_URL)
})