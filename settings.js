module.exports = {
  connection: {
    host: process.env.SQL_CLI_HOST,
    user: process.env.SQL_CLI_USER,
    password: process.env.SQL_CLI_PASSWORD,
    database: process.env.SQL_CLI_DATABASE
  }
}
