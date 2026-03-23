import crypto from 'crypto'
import {v4} from 'uuid';

function getSalt(){
    return crypto.randomBytes(16).toString('hex');
}

function getHash(pwd, salt){
    return crypto.pbkdf2Sync(pwd, salt, 10000, 64, 'sha512').toString('hex');
}

function getId(){
    return v4();
}

export{
    getSalt,
    getHash,
    getId
}