const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

var cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express()
const port = 3000

const jsonParser = bodyParser.json()

const transactions = [
  {
    id: 1,
    amount: 100,
    description: "shopping"
  }
]

app.get('/transaction', cors(corsOptions), (req, res) => {
  res.status(200).send({
    transactions
  })
})

app.post('/transaction', cors(corsOptions), jsonParser, (req, res) => {
  try {
    let badRequest = false

    if (badRequest) {
      res.status(400).send({
        message: "invalid data"
      })
    }

    const id = crypto.randomUUID()

    console.log(req.body)

    transactions.push({
      ...req.body,
      id
    })
    
    res.status(200).send({
      message: "Transaction saved sucessfully"
    })
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Internal Server Error"
    })
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;