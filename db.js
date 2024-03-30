const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URL;

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
}

module.exports = connectToMongo;
