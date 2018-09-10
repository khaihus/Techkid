const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const QuestionModel = require('./models/questionModel');
const QuestionRouter = require('./routers/questionRouter');

mongoose.connect('mongodb://localhost/quyetde', (err) => {
  if (err)
    console.log("DB connect fail: " + err)
  else {
    console.log("DB connect success!");
  }
})

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.send("Hello world");
});


// app.post này: thêm dữ liệu vào database (mongodb)
app.post('/ask', (req, res) => {
  const newQuestion = {
    content: req.body.question,
  }

  QuestionModel.create(newQuestion, (err, questionCreated) => {
    if (err)
      console.log(err)
    else
      res.redirect('http://localhost:8080/');
  });
});

app.use('/question', QuestionRouter);

app.get('/question', (req, res) => {
  QuestionModel.find({}, (err, questions) => {
    //đổi cái math.floor thành cái khác tối ưu hơn
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

app.get('/question/:questionId', (req, res) => {
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



app.put('/answer', (req, res) => {
  const {
    answer,
    id
  } = req.body;
  console.log(req.body)

  //Cách 1:

  QuestionModel.findByIdAndUpdate(id, { $inc: { [answer]: 1 } },
    {new: true}, (err, questionUpdated) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: 'success',
        question: questionUpdated
      });
    }
  });

  //    cách 2: dễ chỉnh sửa thành phần bên trong (tối ưu khi gặp schema phức tạp)

  // QuestionModel.findById(id,(err,questionFound)=>{
  //   if (err) 
  //     console.log(err);
  //     if(!questionFound){
  //       res.send({message: 'Question not found',question:null})
  //   } else {
  //     questionFound[answer]+=1;
  //     questionFound.save((err,questionUpdated)=>{
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send({
  //           message: 'success',
  //           question: questionUpdated
  //         });
  //       }
  //     });
  //   }
  // });
});



app.listen(6969, (err) => {
  if (err) console.log(err)
  else console.log("Server is listening at port 6969!");
});