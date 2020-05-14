const { describeTable, closeSqlConnection } = require('./index')

async function main () {
  try {
    await describeTable(process.argv[2]).then(console.log)
  } catch (err) {
    console.error(err)
  }
  closeSqlConnection()
}

main()
