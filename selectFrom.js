const { selectColumnsFrom, closeSqlConnection, describeTable } = require('./index')

async function main () {
  try {
    const table = process.argv[2]
    const columns = process.argv.slice(3)
    await selectColumnsFrom(columns)(table).then(console.log)
  } catch (err) {
    console.error(err)
  }
  closeSqlConnection()
}

main()
