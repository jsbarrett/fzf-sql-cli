const { showTables, closeSqlConnection } = require('./index')

async function main () {
  showTables()
    .then(x => {
      closeSqlConnection()
      console.log(x)
    })
}

main()
