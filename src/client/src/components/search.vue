<template>
<div class="menu">
  <div class="menuitem">
    Username: {{user.username}}
  </div>
  <div class="menuitem clickable" @click="toPage('/home')">
    Home
  </div>
</div>
<h1>Search for files</h1>
<div class="search-bar">
    <div>
        <label><input type="checkbox" v-model="ignoreCase"></input>ignore case</label>
        <label><input type="checkbox" v-model="useRegex"></input>regex</label>
    </div>
    <input type="text" placeholder="filename" v-model="pattern" @keydown.enter.prevent="search"></input>
    <button @click="search">Search</button>
</div>
<div class="files-display">
    <p class="file" v-for="file in files" @click="editFile(file.fileId)">
    {{file.filename}}
    </p>
    <p v-if="files.length===0">no results found</p>
</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue';
import axios from 'axios';
import home from './home.vue';
import edit from './edit.vue';

const router = useRouter();

const route = useRoute();
// variables
const user=ref({});
const pattern=ref('');
const ignoreCase=ref(false);
const useRegex=ref(false);
const files=ref([]);

async function init(){
    const res=await fetch('/api/home');
    user.value=await res.json();
}

function toPage(page){
  router.push(page);
}

async function search(){
    let flags='';
    if(ignoreCase.value)
        flags+='i';
    if(useRegex.value)
        flags+='r';
    const res=await fetch(`/api/search?pattern=${pattern.value}&flags=${flags}`);
    files.value=await res.json();
}

function editFile(fileId){
  router.push({path: '/edit', query: {fileId}});
}

init();
</script>

<style>
.search-bar{
    width: 70vw;
    margin: 0px auto;
}
.search-bar input[type="text"]{
    width: 70%;
}
.file{
    border: 1px solid white;
    margin: 5px;
}
.file:hover{
    background-color: #ddd;
    cursor: pointer;
}
</style>