const mongoose = require('mongoose');

const mongoURI =
  'mongodb+srv://icodelabs:icodelabs@vendor-next-door.eob05.mongodb.net/task?retryWrites=true&w=majority&appName=vendor-next-door';
const connectDb = () =>
  mongoose
    .connect(mongoURI)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

module.exports = connectDb;
