import './config.mjs';
import express from 'express';
import './db.mjs';
import mongoose from 'mongoose';
import session from 'express-session';
import {getSalt, getHash, getId} from './hash_utils.mjs'
import { fileURLToPath } from 'url';
import path from 'path';

const PORT=3000;
const UserData=mongoose.model('UserData');
const FileStruct=mongoose.model('FileStruct');
const FileContent=mongoose.model('FileContent');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
	let structUpdate = FileStruct.updateOne({username, fileId}, {$set: {filename: newName}});
	let contentUpdate = FileContent.updateOne({username, fileId}, {$set: {filename: newName}});
	await structUpdate;
	await contentUpdate;
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

async function saveFile(username, fileId, content){
	await FileContent.updateOne({username, fileId}, {$set: {content}})//.then(res=>{console.log(res)});
}

// ========= Server =========

const app = express();
//#build
//#build

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

// params: fileId
// returns: FileContent struct with another member variable [err]
app.get('/api/edit', async function(req, res){
	let fileContent=await FileContent.findOne({username: req.session.username, fileId: req.query.fileId});
	if(fileContent===null){
		//TODO: create a new file
		let fileStruct=await FileStruct.findOne({username: req.session.username, fileId: req.query.fileId});
		if(!fileStruct){
			console.log(`fileStruct undefined. username=${req.session.username}, fileId=${req.query.fileId}`);
		}
		fileContent=new FileContent({
			username: req.session.username,
			fileId: req.query.fileId,
			filename: fileStruct.filename,
			parentId: fileStruct.parentId,
			content: ""
		});
		fileContent.save();
	}
	res.json(fileContent);
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

// params: fileId, content
// returns: none
app.post('/api/saveFile', function(req, res){
	saveFile(req.session.username, req.body.fileId, req.body.content);
	res.send();
});

// params: pattern
// returns: an Array of FileStruct
app.get('/api/search', async function(req, res){
	const username=req.session.username;
	const pattern=req.query.pattern;
	const flags=req.query.flags;

	const files = await FileStruct.find(buildQuery(pattern, flags));
	res.json(files);

	function buildQuery(pattern, flags) {
		const useRegex = flags.includes('r');
		const ignoreCase = flags.includes('i');

		if (!useRegex) {
			// 普通 contains（不使用 regex）
			function escapeRegex(str) {
				return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			}
			return {
			username,
			filename: { $regex: escapeRegex(pattern) }
			};
		}

		// regex 模式
		const options = ignoreCase ? "i" : "";

		return {
			username,
			filename: {
			$regex: pattern,
			$options: options
			}
		};
	}
});

app.listen(process.env.PORT??3000);
console.log('listening on port', process.env.PORT);
