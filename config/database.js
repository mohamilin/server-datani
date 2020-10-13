require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.SERVER_MONGODB || 'localhost:3000';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const mongoDB = mongoose.connection;
module.exports = mongoDB;