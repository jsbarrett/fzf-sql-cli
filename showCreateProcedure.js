const { showCreateProcedure, closeSqlConnection } = require('./index')

async function main () {
  try {
    await showCreateProcedure(process.argv[2]).then(console.log)
  } catch (err) {
    console.error(err)
  }
  closeSqlConnection()
}

main()
