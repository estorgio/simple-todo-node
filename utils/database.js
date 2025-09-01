import mongoose from 'mongoose';

const mongodbURI = process.env.MONGODB_URI ?? 'http://localhost/app';

mongoose.connection.on('connected', onDatabaseConnect);
mongoose.connection.on('connecting', onDatabaseConnecting);
mongoose.connection.on('disconnected', onDatabaseDisconnect);
mongoose.connection.on('reconnected', onDatabaseReconnect);

function onDatabaseConnecting() {
  console.log(`MONGODB_URI is set to "${mongodbURI}"`);
  console.log(`App is connecting to the MongoDB database...`);
}

function onDatabaseConnect() {
  console.log(`App is now connected to the MongoDB database!`);
}

function onDatabaseDisconnect() {
  console.log(`App has been disconnected from the MongoDB database!`);
}

function onDatabaseReconnect() {
  console.log(`App has been reconnected to the MongoDB database!`);
}

export async function connectToDatabase() {
  await mongoose.connect(mongodbURI);
}
