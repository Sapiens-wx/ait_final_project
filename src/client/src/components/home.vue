<template>
<div class="menu">
  <div class="menuitem">
    Username: {{user.username}}
  </div>
  <div class="menuitem clickable" @click="newFile(undefined)">
    Create File
  </div>
</div>
<h1>Files</h1>
<div style="width: 50vw; text-align: left; margin: 10px auto;">
  <fileNode v-for="file in fileTree.children" :key="file.data.fileId" 
    :node="file" @newFile="newFile" @deleteFile="deleteFile"
    @renameFile="renameFile">
  </fileNode>
</div>
</template>

<script setup>
import fileNode from './fileNode.vue';
import {ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// {files: array of FileStruct, username: the username}
const user=ref({});
const fileTree=ref({});

function buildFileTree(){
    let indexer=user.value.files.reduce((acc, cur)=>{
        acc[cur.fileId]={
            data: cur,
            parent: undefined,
            children: []
        };
        return acc;
    }, {});
    let root={children:[]};
    user.value.files.forEach(file=>{
        let node=indexer[file.fileId];
        if(file.parentId===undefined){
            root.children.push(node);
            node.parent=root;
        } else{
            node.parent=indexer[file.parentId];
            node.parent.children.push(node);
        }
    });
    return root;
}

function reloadPage(){
    axios.get('/api/home').then(res=>{
        user.value=res.data;
        fileTree.value=buildFileTree();
    });
}

function newFile(parentId){
    axios.post('/api/newFile', {username: user.value.username, filename: 'newFile', parentId: parentId}).then(res=>{
        reloadPage();
    });
}

function renameFile(eve, fileId){
    axios.post('/api/renameFile', {username: user.value.username, fileId, filename: eve.target.innerText}).then(res=>{
        reloadPage();
    });
}

function deleteFile(fileId){
    axios.post('/api/deleteFile', {username: user.value.username, fileId}).then(res=>{
        reloadPage();
    });
}

reloadPage();

</script>

<style>
.dir{

}
.file{

}
</style>