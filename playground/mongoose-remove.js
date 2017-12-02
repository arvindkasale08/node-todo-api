const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// }, (e) => {
//     console.log(e);
// });

// Todo.findOneAndRemove({_id: '5a229f57780cf47e3268d96f'}).then((result) => {
//     console.log(result);
// }, (e) => {
//     console.log(e);
// });
