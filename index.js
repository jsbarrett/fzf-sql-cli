const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mysql = require('mysql')
const settings = require('./settings')

const database = mysql.createPool({
  host: settings.connection.host,
  user: settings.connection.user,
  password: settings.connection.password,
  database: settings.connection.database
})

const query = ({ sql, values = [] }) => new Promise((resolve, reject) => {
  database.query({ sql, values }, (err, rows) => {
    if (err) return reject(err)
    resolve(rows)
  })
})

const closeSqlConnection = () => { database.end() }

const showTables = () => {
  const sql = 'SHOW TABLES'
  return query({ sql })
    .then(response => response.map(x => Object.values(x)[0]))
    .then(joinRows)
}

const describeTable = (tableName) => {
  const sql = `DESCRIBE \`${tableName}\``
  return query({ sql })
    .then(response => response.map(x => Object.values(x)[0]))
    .then(joinRows)
}

const joinValues = x => Object.values(x).join(',')
const joinRows = x => x.join('\n')
const map = fn => arr => arr.map(fn)

const selectAllFrom = (tableName) => {
  const sql = `SELECT * FROM \`${tableName}\``
  return query({ sql })
    .then(map(joinValues))
    .then(joinRows)
}

const selectStoredProcedures = () => {
  const sql = `
    SELECT
      routine_name
    FROM
      information_schema.routines
    WHERE
      routine_type = 'PROCEDURE'
      AND routine_schema = '${settings.connection.database}'
  `

  return query({ sql })
    .then(map(x => x.routine_name))
    .then(joinRows)
}

const selectColumnsFrom = (columns) => (tableName) => {
  const sql = (columns.length > 0)
    ? `SELECT ${columns.join(',')} FROM \`${tableName}\``
    : `SELECT * FROM \`${tableName}\``

  return query({ sql })
    .then(map(joinValues))
    .then(joinRows)
}

const showCreateProcedure = (storedProcedureName) => {
  const sql = `SHOW CREATE PROCEDURE \`${storedProcedureName}\``

  return query({ sql })
    .then(map(x => x['Create Procedure']))
    .then(x => x[0])
}

module.exports = {
  showTables,
  describeTable,
  selectAllFrom,
  closeSqlConnection,
  selectColumnsFrom,
  selectStoredProcedures,
  showCreateProcedure
}
