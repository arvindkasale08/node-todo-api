//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to mongodb server');
        return;
    }
    console.log('Connected to mongodb server');
    
    // db.collection('Todos').findOneAndUpdate(
    //     {_id: new ObjectID('5a216471cc637f18171d97d2')},
    //     {$set: {
    //         completed: true,
    //         text: 'Eat dinner'
    //     }},
    //     {
    //         returnOriginal: false
    //     }
    // ).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a2026c1582afdea58dcb185')
    },
    {
        $set: {
            name : 'Aarav'
        }, 
        $inc: {age: 5}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
});