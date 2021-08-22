const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const verificationSchema = new Schema({
  UserId: {type: Number, required: true},
  DiscordId: {type:String, required:true}
});

module.exports = Mongoose.model('rbx_verify', verificationSchema)