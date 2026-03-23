// db.js
import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

// my schema goes here!

// define the data in our collection
const UserData = new mongoose.Schema({
	username: String,
	salt: String,
	password: String, // hash
});

// "register" it so that mongoose knows about it
mongoose.model('UserData', UserData);

// each item stores a single file. filename is the full name (including path)
mongoose.model('FileStruct', new mongoose.Schema({
	username: String,
	filename: String,
	fileId: String
}))