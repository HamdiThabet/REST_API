const express = require('express')
const mongoose = require('mongoose')
const user = require('./models/user')

require('dotenv').config({ path: './config/.env' })
const port = process.env.port
const mongooseUrl = process.env.mongooseUrl

mongoose.connect(mongooseUrl, (err) => {
    err ? console.log(err) : console.log('DB connected')
})
const app = express()
app.use(express.json())

app.post('/newUser', (req, res) => {
    newUser = new user(req.body)
    newUser.save(err => {
        err ? console.log(err) : res.send("newUser add")
    })
})

app.get('/allUsers', (req, res) => {
    user.find((err, data) => {
        err ? console.log(err) : res.send(data)
    })
})

app.put('/userUpdate/:id', (req, res) => {
    user.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, (err) => {
        err ? console.log(err) : res.send('user was updated ')
    })
})

app.delete('/userDelete/:id', (req, res) => {
    user.findByIdAndDelete({ _id: req.params.id }, (err) => {
        err ? console.log(err) : res.send('user was Deleted ')
    })
})


app.listen(process.env.port, (err) => {
    err ? console.log(err) : console.log(`The server is running, please open your browser at http://localhost:${port}`)
})