var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3001;

//load all files in models dir
fs.readdirSync(path.join(__dirname, '../', 'models')).forEach(function(filename) {
    if (~filename.indexOf('.js')) {
        require(path.join(__dirname, '../', 'models/') + filename);
    }
});

//Set up default mongoose connection
mongoose.connect("mongodb://admin:admin123@ds139342.mlab.com:39342/socket-chat");

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.route('/api/messages')
    .get(function(req, res) {
        mongoose.model('messages').find(function(err, messages) {
            if (err) res.send(err);
            res.json(messages);
        });
    })

    .post(function(req, res) {
        var Message = mongoose.model('messages');
        var message = new Message();
        console.log(req.body);
        message.content = req.body.content;
        message.username = req.body.username;
        message.save(function(err) {
            if (err) return handleError(err);
            res.json({message: 'Message successfuly added!'});
        });
  })

app.get('/api/testing', function(req, res, next) {
    res.json([{
        id: 1,
        username: "samsepi0l"
    }, {
        id: 2,
        username: "D0loresH4ze"
    }]);
});

// Listen application request on port 3001
server.listen(port, function(){
    console.log('listening on *:' + port);
}); 

var numberOfUsers = 0;
 
// Register events on socket connection
io.on('connection', function(socket){

    // broadcast when a client emits 'connect'
    socket.on('connected', function(data) {
        console.log("user connected");
        ++numberOfUsers;
        io.emit('user joined', {
            username: data,
            numberOfUsers: numberOfUsers
        });
    });

    // broadcast when clients emits 'new message'
    socket.on('new message', function(data) {
        console.log("new message");
        io.emit('receive new message', data);
    });

    // broadcast when client emits 'typing'
    // socket.on('typing', function(data){
    //     socket.broadcast.emit('typing', {
    //         username: data
    //     });
    // });

    // broadcast when a person has left
    socket.on('disconnect', function(){
        console.log("user disconnected");
        --numberOfUsers;

        socket.broadcast.emit('user left', {
            numberOfUsers: numberOfUsers
        });
    });
});
 
