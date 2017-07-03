var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
	content: String,
	username: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('messages', messagesSchema);