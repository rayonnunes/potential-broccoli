const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

var cors = require('cors')

const corsOptions = {
  origin: ['http://localhost:5173']
};

const app = express()
const port = 3000

const jsonParser = bodyParser.json()

app.use(cors(corsOptions));

const transactions = [
  {
    id: 1,
    amount: 100,
    description: "shopping"
  }
]

app.get('/transaction', (req, res) => {
  res.status(200).send({
    transactions
  })
})

app.post('/transaction', jsonParser, (req, res) => {
  try {
    let badRequest = false

    if (badRequest) {
      res.status(400).send({
        message: "invalid data"
      })
    }

    const id = crypto.randomUUID()

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