// db.js
import mongoose from 'mongoose';

mongoose.connect(process.env.DSN);

// my schema goes here!

// define the data in our collection
const UserData = new mongoose.Schema({
	username: String,
	salf: String,
	password: String, // hash
	files: Array
});

// "register" it so that mongoose knows about it
mongoose.model('UserData', UserData);
