let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root@ds125716.mlab.com:25716/todoapp');

module.exports = {mongoose};