const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
let app = express();

const QuestionModel = require('./models/questionModel');

mongoose.connect('mongodb://localhost/quyetde', (err) => {
    if (err) console.log(err)
    else console.log("DB connect success !");
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(6969, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server is listening at port 6969!");
    }
});

app.get('/', (req, res) => {
    res.send("Hello World");

});

app.use(cors()); // request cho nhau (ajax)

app.get('/question', (req, res) => {
    QuestionModel.find({}, (err, questions) => {
        let ranNum = Math.floor(Math.random() * questions.length);
        QuestionModel.findOne({}).skip(ranNum == 0 ? ranNum : ranNum - 1).exec((err, questionFound) => {
            if (err) console.log(err);
            else {
                res.send({
                    mess: "success!",
                    question: questionFound
                });
            }
        });
    });
});
app.get('/question/:questionId', (req, res) => {
    let id =req.params.questionId;
    QuestionModel.findById(id,function(err,result){
        if(err) console.log(err);
        else{
            console.log("view OK!")
            res.send({mess : "success", question: result});
        }
    });
});
app.put('/answer', (req, res) => {
    QuestionModel.findById(req.body.ID,function(err,result){
        if(err) console.log(err)
        else{
            let myquery = { _id: req.body.ID};
            let newValue;
            let valueY = result.yes;
            let valueN = result.no;
            if(req.body.YN == "yes"){
               valueY ++;;
                 newValue = { $set: { yes: valueY } };
            }else{
               valueN ++;
                 newValue = { $set: { no: valueN } };
            }           
         
            QuestionModel.updateOne(myquery,newValue,function(err,ress){
                if(err) console.log(err);
                else{
                    let data = {
                        content: result.content,
                        yes : valueY,
                        no : valueN
                    };
                    res.send({ mess: "success!", question: data});
                    // console.log(data.yes+data.no);
                    console.log("1 document updated");                   
                }
            });         
            
        }
     
    });
});

app.post('/ask', (req, res) => {
    const newQuestion = {
        content: req.body.question,
    }
    QuestionModel.create(newQuestion, (err, questionCreated) => {
        if (err) console.log(err)
        else {
            // res.send({mess: "Ask success!",question: questionCreated});           
            res.redirect('http://localhost:8080/');
        }
    });
});