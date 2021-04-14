var express = require('express')
var cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const multer = require('multer')
var app = express()
var upload = multer({ dest: 'uploads/' })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const { originalname: name, mimetype: type, size } = req.file
  next()
  res.json({ name, type, size })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
