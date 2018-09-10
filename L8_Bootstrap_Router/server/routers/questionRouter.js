const express = require('express');
const QuestionRouter = express.Router();
const QuestionModel = require('../models/questionModel');

//localhost:6969/question

// Middleware

// QuestionRouter.use((req, res, next) => {
//     console.log('Middleware 1');
//     next();         // ko có lệnh next() thì sẽ ko chạy code phía sau
// });

QuestionRouter.get('/', (req, res) => {
    QuestionModel.find({}, (err, questions) => {
        let randomNum = Math.floor(Math.random() * questions.length);
        QuestionModel
            .findOne({})
            .skip(randomNum == 0 ? randomNum : randomNum - 1)
            .exec((err, questionFound) => {
                if (err)
                    console.log(err);
                else
                    res.send({
                        message: 'Success',
                        question: questionFound
                    });
            });
    });
});

QuestionRouter.get('/:questionId', (req, res) => {
    let id = req.params.questionId;
    QuestionModel.findById(id, function (err, result) {
        if (err) console.log(err);
        else {
            res.send({
                mess: "success",
                question: result
            });
        }
    });
});

// middleware để cuối cùng thì ko chạy?
// QuestionRouter.use((req, res, next) => {
//     console.log('Middleware 2');
// });

module.exports = QuestionRouter;