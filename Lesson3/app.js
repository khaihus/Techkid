const express = require('express');
let app = express();
//localhost:6969/

app.get('/', (Request, Response) => {
    console.log(__dirname);
    Response.sendFile(__dirname + '/index.html');
});

// app.param('username', function(Request, Response){
//     Request.user = user;
// });
app.use(express.static('../Lesson3'));  //cho phép truy cập hết các file trong folder kia (lesson3)
app.get('/:username', function (Request, Response, next) {
    var username = Request.params.username;
    Response.send('Hello ' + username);
});
app.listen(6969, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Server is listening at port 6969!")
});