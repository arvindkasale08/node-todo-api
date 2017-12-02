const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var port = process.env.PORT || 3000;

let app = express();

//https://git.heroku.com/protected-fortress-92190.git

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text : req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400);
        res.send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos, count: todos.length});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(id) {
        User.findById(id).then((user) => {
            if(user) {
                res.send(user);
            }
            res.send({errorMessage: 'No user found'}); 
        }, (err) => {
            res.status(400);
            res.send(err);
        });
    } else {
        res.status(400);
        res.send({errorMessage: 'No id sent'}); 
    }
});

app.listen(port, (err) => {
    console.log('Started on port',port);
});


