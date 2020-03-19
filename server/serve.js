const express = require('express')
const bodyParser = require('body-parser')

const app = new express()

app.use(require('cors')())

app.set('secret', 'secrets')

app.use('/', express.static(__dirname + '/public/web'))
app.use('/admin', express.static(__dirname + '/public/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`serve runing on port ${port}`)
})
