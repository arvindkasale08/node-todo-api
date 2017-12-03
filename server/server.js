const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

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

app.delete('/todos/:id', (req, res) => {
    if(req.params.id) {
        Todo.findByIdAndRemove(req.params.id).then((todo) => {
            res.send(todo);
        }, (e) => {
            res.status(400);
            res.send({errorMessage: e});
        })
    } else {
        res.status(400);
        res.send({errorMessage: 'Invalid request. No ID sent'});
    }
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)) {
        res.status(400).send();
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if(!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }, (e) => {
        res.status(400).send();
    })
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        debugger;
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.listen(port, (err) => {
    console.log('Started on port',port);
});


