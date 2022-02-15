const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

const connect = async () => {
  const uri = await mongod.getUri();
  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  };
  await mongoose.connect(uri, mongoOptions);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
