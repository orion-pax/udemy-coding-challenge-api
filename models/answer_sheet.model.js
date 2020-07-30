const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid');

var answer_sheet = new Schema({
    user:{
        type:String,
        default: shortid.generate
    },
    quiz:{
        type: String
    },
    answers:[{
        question:{
            type: String
        },
        choice:{
            type:String
        }
    }],
    quizTotal:{
        type: Number,
        default: 0
    },
    finalScore:{
        type: Number,
        default: 0
    },
    percentage: {
        type : mongoose.Decimal128,
        default: 0.0
    },
    grade: {
        type: String,
        default: "Fail"
    }

},{
    timestamps:true
})

module.exports = mongoose.model('answer_sheet', answer_sheet)