import './config.mjs';
import express from 'express';
import './db.mjs';
import mongoose from 'mongoose';
import session from 'express-session';
import {getSalt, getHash, getId} from './hash_utils.mjs'

const PORT=3000;
const UserData=mongoose.model('UserData');
const FileStruct=mongoose.model('FileStruct');

function newUser(username, password){
	const salt=getSalt();
	const pwdhash=getHash(password, salt);
	UserData.create({username, password: pwdhash, salt});
}

function validateFileName(filename){
	err=undefined;
	return err;
}

async function newFile(username, filename, parentId){
	const id=getId();
	await FileStruct.create({username, filename, fileId: id, parentId: parentId});
}

async function renameFile(username, fileId, newName){
	await FileStruct.updateOne({username, fileId}, {$set: {filename: newName}});
}

async function deleteFile(username, fileId){
	let children=FileStruct.find({parentId: fileId});
	const deleteThis=FileStruct.deleteOne({username, fileId});
	await deleteThis;
	children=await children;
	const childrenProcesses=children.reduce((acc, cur)=>{
		acc.push(deleteFile(username, cur.fileId));
		return acc;
	}, [])
	for(const child of childrenProcesses)
		await child;
}

// ========= Server =========

const app = express();

const sessionOptions={
	secret: 'some secrete',
	saveUninitialized: false,
	resave: false
};
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session(sessionOptions));

// params: username, password
// returns the username
app.post('/api/login', async function(req, res){
	let result={};
	let foundUsers=await UserData.find({username: req.body.username});
	if(foundUsers.length===0){ // user not found. sign up
		newUser(req.body.username, req.body.password);
		result.username=req.body.username;
	} else { // try to login
		let foundUser=foundUsers[0];
		if(foundUser.password===getHash(req.body.password, foundUser.salt)){ // succeed
			result.username=req.body.username;
		} else{ // fail
			result.err='username already exist or wrong password';
		}
	}
	if(!result.err)
		req.session.username=req.body.username;
	res.json(result);
});

// returns: {files: array of FileStruct, username: the username}
app.get('/api/home', async function(req, res){
	let foundFiles=await FileStruct.find({username: req.session.username});
	res.json({username: req.session.username, files: foundFiles});
});

// params: username, filename, [parentId]
// returns: none
app.post('/api/newFile', async function(req, res){
	await newFile(req.body.username, req.body.filename, req.body.parentId);
	res.send();
});

// params: username, fileId, filename
// returns: none
app.post('/api/deleteFile', async function(req, res){
	await deleteFile(req.body.username, req.body.fileId);
	res.send();
});

// params: username, fileId, filename
// returns: none
app.post('/api/renameFile', async function(req, res){
	await renameFile(req.body.username, req.body.fileId, req.body.filename);
	res.send();
});

app.listen(process.env.PORT);
console.log('listening on port', process.env.PORT);