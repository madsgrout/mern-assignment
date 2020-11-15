const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {type: String, required: true },
    question: {type: String, required: true},
    username: {type: String, require: true, trim: true, minlength: 3},
    answers: [{answer: String, username: String, votes: Number}],
}, {
    timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;