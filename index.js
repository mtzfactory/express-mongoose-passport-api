require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

require('./mongoose')(process.env.DB_URL)

const app = express()

app.use(require('./cors'))
app.use(bodyParser.json())

app.use(require('./passport')(process.env.SECRET))

app.use('/auth', require('./routes/auth'))

app.use('/api', require('./routes/tasks'))

console.log(`Connecting Tasks API db on url ${process.env.DB_URL}`)

console.log(`Starting Tasks API on port ${process.env.PORT}`)

app.listen(process.env.PORT, () => console.log('Tasks API is up'))

process.on('SIGINT', () => {
    console.log('\nStopping Tasks API...')

    process.exit()
})