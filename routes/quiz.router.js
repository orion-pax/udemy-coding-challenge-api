const express = require('express')
const router = express.Router()

const quiz = require('../models/quiz.model')

router.get('/list', (req, res) => {
    console.log('retrieving quizzes')
    var query = quiz.find({}).select({ "name": 1, "code": 1, "_id": 0 })
    query.exec((err, quizzes) => {
        if (err) {
            console.log(err)
            res.status(500).json({ 'message': 'Failed to retrieve quizzes. Unexpected errot occured.' })
        }
        if (quizzes && quizzes.length > 0) {
            console.log(`quizzes found ::${quizzes.length}`)
            res.status(200).json({ quizzes })
        }
        else {
            res.status(404).json({ 'message': 'Failed to retrieve quizzes. No records found.' })
        }
    })
})

router.get('/', (req, res) => {
    console.log('retrieving quizzes')
    var query = quiz.find()
    query.exec((err, documents) => {
        if (err) {
            console.log(err)
            res.status(500).json({ 'message': 'Failed to retrieve quizzes. Unexpected errot occured.' })
        }
        if (documents && documents.length > 0) {
            console.log(`quizzes found ::${documents.length}`)
            res.status(200).json({ documents })
        }
        else {
            res.status(404).json({ 'message': 'Failed to retrieve quizzes. No records found.' })
        }
    })
})

router.get('/code/:code', (req, res) => {
    console.log(`Searching quiz with code: ${req.params.code}`)

    quiz.findOne({ code: req.params.code }, (err, document) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Failed to process quiz request" })
        }
        if (document) {
            let doc = document.toObject()
            console.log(`quiz found with code :: ${req.params.code}`)
            doc.questions.forEach(question => {
                question.options.forEach(option =>{
                   delete option["isAnswer"];
                })

            })
            res.status(200).json(doc)
        }
        else {
            console.log("no result found")
            res.status(404).json({ "message": "No records found" })
        }
    })
})

router.post('/', (req, res) => {
    console.log('received quiz')

    const newQuiz = new quiz(req.body)
    newQuiz.save()
        .then(newQuiz => {
            console.log("quiz saved successfully")
            res.status(200).json({ 'message': 'Your quiz has been received' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ 'message': 'Sorry, your quiz was not sent successfully. Kindly retry.' })

        })
})


module.exports = router