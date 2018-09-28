const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const GameModel = require('./model/model');

mongoose.connect('mongodb://localhost/game', (err) => {
    if (err)
        console.log(err);
    else
        console.log("Connect dataBase Success!!!");
});

let app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: false
}));
let name1, name2, name3, name4, id;

app.post('/game', (req, res) => {

    const newGame = {
        // player1: {
        //     name: req.body.name1
        // },
        // player2: {
        //     name: req.body.name2
        // },
        // player3: {
        //     name: req.body.name3
        // },
        // player4: {
        //     name: req.body.name4
        // },
        name: [
            name1 = req.body.name1,
            name2 = req.body.name2,
            name3 = req.body.name3,
            name4 = req.body.name4,
        ],
        round: [{}]
    }

    GameModel.create(newGame, (err, gameCreated) => {
        if (err) console.log(err)
        else {
            id = gameCreated._id;
            // res.redirect('http://localhost:8080/index2.html');
            res.redirect(`http://localhost:8080/index2?id=${gameCreated._id}`);
            console.log("Đã thêm thành công!");
        }
    })
});

app.get('/newgame', (req, res) => {
    GameModel.find({}), (err, questions) => {
        res.send({
            id: id,
            name1: name1,
            name2: name2,
            name3: name3,
            name4: name4
        });
    }
});

app.get('/game/:id', (req, res) => {
    let gameid = req.params.id;
    console.log("id : " + gameid);
    GameModel.findById(gameid, (err, gameFound) => {
        if (err) {
            console.log(err)
            res.send({
                message: 'Game not found',
                game: null
            });
        } else {
            res.send({
                message: 'Súc xét',
                game: gameFound
            });
        }
    })
});

app.put('/changeScore', (req, res) => {
    const {
        gameId,
        roundId,
        score1,
        score2,
        score3,
        score4
    } = req.body;

    let round;
    let checkExist = false;;
    GameModel.findById(gameId, (err, gameFound) => {
        if (err) {
            console.log(err);
            res.send({
                mess: "Game not found!",
                game: null
            });
        } else {
            console.log("gameId: "+gameId);
            console.log("round: "+round);
            round = gameFound.round;
            for (var i = 0; i < round.length; i++) {
                if (round[i].roundId == roundId) {
                    checkExist = true;
                    round[i].score1 = score1;
                    round[i].score2 = score2;
                    round[i].score3 = score3;
                    round[i].score4 = score4;
                }
            }
            if (!checkExist) {
                round.push({
                    roundId: roundId,
                    score1: score1,
                    score2: score2,
                    score3: score3,
                    score4: score4
                });
            }
            gameFound.round = round;
            gameFound.save((err, gameUpdated) => {
                if (err) console.log(err);
                else {
                    res.send({
                        mess: "success.",
                        game: gameUpdated
                    });
                }
            });
        }
    });
    // console.log(req.body);
});

app.listen(6969, (err) => {
    if (err) console.log(err);
    else console.log("Server is running at port 6969");
});