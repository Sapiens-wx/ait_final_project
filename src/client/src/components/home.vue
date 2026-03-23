<template>
<div class="menu">
  <div class="menuitem">
    Username: {{user.username}}
  </div>
  <div class="menuitem clickable" @click="newFile">
    Create File
  </div>
</div>
<h1>Files</h1>
<div class="file" v-for="file in user.files" :key="file">
  <span contenteditable="true" @keydown.enter.prevent="renameFile($event, file.fileId)">
    {{file.filename}}
  </span>
  | {{file.fileId}}
</div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const user=ref({});

function updatePage(){
    axios.get('/api/home').then(res=>{
        user.value=res.data;
    });
}

function newFile(){
    axios.post('/api/newFile', {username: user.value.username, filename: 'newFile'}).then(res=>{
        updatePage();
    });
}

function renameFile(eve, fileId){
    axios.post('/api/renameFile', {username: user.value.username, fileId, filename: eve.target.innerText}).then(res=>{
        updatePage();
    });
}

updatePage();

</script>

<style>
.menu{
    position: fixed;
    top: 0;
    left: 0;
    width: 20vw;
}
.menuitem{
    border: 2px solid black;
    padding: 5px;
    margin: 5px auto 5px auto;
}
.clickable{
    cursor: pointer;
    background-color: white;
}
.clickable:hover{
    background-color: #ddd;
}
.dir{

}
.file{

}
</style>