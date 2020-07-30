const express = require('express');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose')
const dbconfig = require('./configs/dbconfig')

mongoose.connect(dbconfig.url, {useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology: true })
const connection = mongoose.connection

connection.once('open', function(){
    console.log('Connection to mongodb established successfully')
})

app.use(express.json())
app.use(cors())

const quizRouter = require('./routes/quiz.router')
const answerSheetRouter = require('./routes/answer_sheet.router')

app.use('/quizzes', quizRouter)
app.use('/answer_sheets', answerSheetRouter)

app.get('/', (req, res)=>{
    res.send('::App is up and running::');
})

app.listen(port, ()=> console.log(`app up and running on port :: ${port}`));