const express = require('express')
const router = express.Router();

const answer_sheet = require('../models/answer_sheet.model')
const quiz = require('../models/quiz.model')

router.post('/', (req, res) => {
    var newAnswerSheet = new answer_sheet(req.body)

    var query = quiz.findOne({ code: newAnswerSheet.quiz })
    query.exec().then((qz) => {
        if (!qz) {
            console.log("quiz not found")
                // res.status(404).json({'message': 'Failed to retrieve quiz. No records found.'});
        } else {
            console.log(`quiz found ::${qz}`)
            var quizTotal = 0;
            var finalScore = 0;
            var percentage = 0;
            qz.questions.forEach(question => {
                quizTotal += question.totalMarks
            })

            newAnswerSheet.answers.forEach(answer => {
                qz.questions.forEach(question => {
                    if (question.code == answer.question) {
                        question.options.forEach(option => {
                            if (answer.choice == option.choice) {
                                if (option.isAnswer) {
                                    finalScore += question.totalMarks;
                                }
                            }
                        })

                    }
                })
            })

            percentage = finalScore == 0 ? 0.0 : 100 * (finalScore / quizTotal)
            console.log(`finalScore::${finalScore}`)
            console.log(`quizTotal::${quizTotal}`)
            console.log(`calculated::${100 * (finalScore / quizTotal)}`)
            console.log(`percentage::${percentage}`)

            newAnswerSheet.quizTotal = quizTotal;
            newAnswerSheet.finalScore = finalScore;
            newAnswerSheet.percentage = percentage;
            newAnswerSheet.grade = percentage < 50 ? "Fail" : "Pass";

            newAnswerSheet.save()
                .then(as => {
                    console.log("answer sheet saved successfully")
                    res.status(200).json(as.user)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ 'message': 'Sorry, your answer sheet was not sent successfully. Kindly retry.' })

                })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ "message": 'Failed to retrieve quiz. Unexpected errot occured.' });
    })
})

router.get('/user/:user', (req, res) => {
    console.log(`Searching sheet for user: ${req.params.user}`)

    answer_sheet.findOne({ user: req.params.user }, (err, document) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "message": "Failed to process request" })
        }
        if (document) {
            let doc = document.toObject()
            console.log(`answer sheet found with code :: ${req.params.user}`)

            const { user, quiz, _id, answers, createdAt, updatedAt, __v, ...updatedObject } = doc;

            res.status(200).json(updatedObject)
        } else {
            console.log("no result found")
            res.status(404).json({ "message": "No records found" })
        }
    })
})


module.exports = router