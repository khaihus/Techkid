const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const QuestionModel = require('./models/questionModel');


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

// app.put('/answer', (req, res) => {
//   let question = req.body;
//   console.log(question);
//   QuestionModel.findById(req.body.ID, function (err, result) {
//     if (err) console.log(err)
//     else {
//       let myquery = {
//         _id: req.body.ID
//       };
//       let newValue;
//       let valueY = result.yes;
//       let valueN = result.no;
//       if (req.body.YN == "yes") {
//         valueY++;;
//         newValue = {
//           $set: {
//             yes: valueY
//           }
//         };
//       } else {
//         valueN++;
//         newValue = {
//           $set: {
//             no: valueN
//           }
//         };
//       }

//       QuestionModel.updateOne(myquery, newValue, function (err, ress) {
//         if (err) console.log(err);
//         else {
//           let data = {
//             content: result.content,
//             yes: valueY,
//             no: valueN
//           };
//           res.send({
//             mess: "success!",
//             question: data
//           });
//           // console.log(data.yes+data.no);
//           console.log("1 document updated");
//         }
//       });

//     }

//   });

// });

app.put('/answer', (req, res) => {
  const {
    answer,
    id
  } = req.body;

  QuestionModel.findOne({
      _id: id
    })
    .exec((err, questionFound) => {
      if (err) console.log(err)
      else if (questionFound) {
        questionFound[answer]++;
        questionFound.save((err) => {
          if (err) console.error(err)
          else res.send({
            message: "Success!",
            question: questionFound
          });
        });
      }
    });
});

// app.put('/answer', (req, res) => {
//   // const answer = req.body.answer;
//   // const questionId = req.body.questionId;
//   const {
//     answer,
//     questionId
//   } = req.body;
//   fs.readFile('./questions.txt', (err, fileData) => {
//     if (err) console.log(err)
//     else {
//       try {
//         let questions = JSON.parse(fileData);
//         if (questions[questionId - 1]) {
//           questions[questionId - 1][answer] += 1;
//         }
//         fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
//           if (err) console.log(err)
//           else res.send({
//             message: "Success!",
//             question: questions[questionId - 1]
//           });
//         });
//       } catch (error) {
//         console.log("Error!!! ", error);
//       }
//     }
//   });
// });

app.listen(6969, (err) => {
  if (err) console.log(err)
  else console.log("Server is listening at port 6969!");
});