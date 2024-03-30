const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://jubrajdev001:0pbitrVNJ7GQu47x@carbon-cell-db.6prx5g1.mongodb.net/?retryWrites=true&w=majority&appName=carbon-cell-db?connect_timeout=20';

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
}

module.exports = connectToMongo;
