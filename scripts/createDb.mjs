import dotenv from 'dotenv'
import pgtools from 'pgtools'

// Read in .env file to grab DATABASE_URL
dotenv.config()
createDatabaseFromUrl(process.env.DATABASE_URL)

function createDatabaseFromUrl(urlString) {
  const url = new URL(urlString)
  const { hostname, password, pathname, port, username } = url
  const config = {
    user: username,
    host: hostname,
    password,
    port
  }

  // Create new database for the user/password found in DATABASE_URL
  // Note: this will only work if the user already exists.
  const [, dbName] = pathname.split(/\/|\?/)
  console.log(`✨✨✨✨ Creating new database called "${dbName}"`)
  pgtools.createdb(config, dbName, function (err, res) {
    if (err) {
      console.error(err)
      process.exit(-1)
    }
    console.log(res)
  })
}
