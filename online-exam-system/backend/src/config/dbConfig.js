// backend/config/dbConfig.js

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/online-exam-system', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));


var mongoDatabase = 'mongodb://localhost:27017/online-exam-system';

// Created express server
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) }
);

module.exports = mongoose;
