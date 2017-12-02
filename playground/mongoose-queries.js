const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '5a2256f91dda301a29a4b9f0';
var userId = '5a2177baa5ad8d5e209f3b0b';


Todo.find({_id: id}).then((todos) => {
    console.log("Todos", todos);
});

Todo.findOne({_id: id}).then((todo) => {
    console.log('Todo', todo);   
});

Todo.findById(id).then((todo) => {
    console.log('Todo', todo);
});

User.findById(userId).then((user) => {
     console.log(user);
});

