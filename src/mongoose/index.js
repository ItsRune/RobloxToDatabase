const Mongoose = require('mongoose');
const { error, debuglog } = require('../utils/colors');
let Status = false;

Mongoose.connect(process.env.MongoConnection || "", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    error(err.message);
  } else {
    Status = true;
  }
});

module.exports = Status;