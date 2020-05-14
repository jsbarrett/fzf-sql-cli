const { selectStoredProcedures, closeSqlConnection } = require('./index')

async function main () {
  selectStoredProcedures()
    .then(x => {
      closeSqlConnection()
      console.log(x)
    })
}

main()
