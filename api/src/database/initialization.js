const postgreSql = require('../database/utils')

module.exports = (config) => {
  return postgreSql.connect(config)
  .then((client) => {
    return postgreSql.createEnum(client, 'gender', `'Male', 'Female', 'UNKNOWN'`)
    .then(() => {
      return client.query(`CREATE TABLE IF NOT EXISTS public.users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR (16) NOT NULL,
        lastName VARCHAR (16) NOT NULL,
        username VARCHAR (16) NOT NULL,
        password VARCHAR (100) NOT NULL,
        biography VARCHAR (150) DEFAULT NULL,
        gender gender DEFAULT 'UNKNOWN',
        mail VARCHAR (32) UNIQUE NOT NULL,
        createdAt TIMESTAMP DEFAULT current_timestamp
      );`)
    })
    .then(() => {
      return client.query(`CREATE TABLE IF NOT EXISTS public.pictures (
        userId INTEGER REFERENCES users (id),
        profile BOOLEAN NOT NULL,
        data VARCHAR NOT NULL,
        createdAt TIMESTAMP DEFAULT current_timestamp
      );`)
    })
    .then(() => client.end())
    .catch((err) => console.log(err))
  })
}
