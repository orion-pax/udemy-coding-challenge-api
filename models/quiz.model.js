var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const shortId = require('shortid');

var quiz = new Schema({
    code:{
        type: String,
        default: shortId.generate
    },
    name:{
        type: String,
        minlength: 2
    },
    mode:{
        type: String,
        minlength: 4,
        default: "LIVE"
    },
    questions:[{
        narrative: String,
        code:{
            type: String,
            default: shortId.generate
        },
        isEnabled: {
            type: Boolean,
            default: true
        },
        totalMarks: Number,
        options:[{
            choice:{
                type: String,
                default: shortId.generate
            },
            narrative:{
                type: String
            },
            isAnswer: {
                type: Boolean,
                default: false
            }
        }]
    }]

},{
    timestamps: true
})

module.exports = mongoose.model('quiz', quiz);