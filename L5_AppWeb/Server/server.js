const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
let app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send("CC");
});

app.post('/ask', (req, res) => {
    // console.log("Ur mom gay!"); 
    // req.on('data', (data) => { 
    //     console.log(data);
    // });
    // console.log("Question: ", req.body.question);
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err)
            console.log(err);
        else {
            try {
                let questions = [];
                if (fileData.length > 0 && JSON.parse(fileData).length) {
                    questions = JSON.parse(fileData);
                }
                // console.log("File data: " + fileData);
                const newQuestion = {
                    id: questions.length + 1,
                    questionContent: req.body.question,
                    yes: 0,
                    no: 0
                }
                // http://localhost:8080
                questions.push(newQuestion);

                fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
                    if (err)
                        console.log(err);
                    else
                        res.redirect('http://localhost:8080/');
                });
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    });
});

app.get('/question', (req, res) => {
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err)
            console.log(err);
        else {
            try {
                let questions = JSON.parse(fileData);
                let randomNum = Math.floor(Math.random() * questions.length);
                let randomQuestion = questions[randomNum];
                res.send({
                    message: "Success!",
                    question: randomQuestion
                });
            } catch (error) {
                console.log("Error!!! ", error);
            }
        }
    });
});

app.put('/answer', (req, res) => {
    // console.log(req.body);
    let question = req.body;
    fs.readFile('./questions.txt', (err, fileData) => {
        if (err)
            console.log(err);
        else {
            try {
                // console.log("File data: " + fileData);
                let questions = [];
                if (fileData.length && JSON.parse(fileData).length) {
                    questions = JSON.parse(fileData);
                }

                for (let i = 0; i < questions.length; i++) {
                    if (questions[i].id == question.id) {
                      
                        if (question.answer == "yes") {
                            questions[i].yes += 1;
                        }
                        if (question.answer == "no") {
                            // console.log(questions[i].no);
                            questions[i].no += 1;
                        }
                    }
                }
                // http://localhost:8080
                fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
                    if (err)
                        console.log(err);
                    else{
                        res.redirect('http://localhost:8080');
                        // res.send(question);
                    }
                });
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    });
});

app.listen(6969, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Server is listening at port 6969!")
});