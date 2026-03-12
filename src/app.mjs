import './config.mjs';
import express from 'express';
import './db.mjs';
import mongoose from 'mongoose';
import session from 'express-session';

const UserData=mongoose.model('UserData');

const app = express();

app.set('view engine', 'hbs');

const sessionOptions={
	secret: 'some secrete',
	saveUninitialized: false,
	resave: false
};
app.use(express.urlencoded());
app.use(session(sessionOptions));

app.get('/login', async function(req, res){
	res.send('login page');
});
