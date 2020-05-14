module.exports = {
  connection: {
    host: process.env.FZF_SQL_CLI_DB_HOST,
    user: process.env.FZF_SQL_CLI_DB_USER,
    password: process.env.FZF_SQL_CLI_DB_PASSWORD,
    database: process.env.FZF_SQL_CLI_DB_DATABASE
  }
}
