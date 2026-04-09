<template>
<div class="menu">
  <div class="menuitem">
    Username: {{file.username}}
  </div>
  <div class="menuitem clickable" @click="saveFile">
    Save File
  </div>
  <div class="menuitem clickable" @click="toHome">
    Home
  </div>
</div>
<h1>{{file.filename}}</h1>
<div class="content">
  <button @click="toggleMode($event)" style="width: 200px;">Preview Mode</button>
  <div v-if="!editMode" v-html="markdownContent"> </div>
  <textarea v-if="editMode" v-model="markdownSource"></textarea>
</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue';
import axios from 'axios';
import home from './home.vue';
import { marked } from 'marked';

const router = useRouter();

const route = useRoute();
// variables
const editMode=ref(false);
const markdownContent=ref('');
const markdownSource=ref('');

// FileContent struct
const file = ref({});

axios.get(`/api/edit?fileId=${route.query.fileId}`).then(res=>{
    file.value=res.data;
    markdownSource.value=file.value.content;
    updateMarkdown();
});

function saveFile(){
    axios.post('/api/saveFile', {fileId: file.value.fileId, content: markdownSource.value});
}

function toHome(){
  router.push('/home');
}

function updateMarkdown(){
  markdownContent.value=marked.parse(markdownSource.value);
}

function toggleMode(e){
  editMode.value=!editMode.value;
  if(editMode.value)
    e.target.textContent='Edit Mode';
  else{
    updateMarkdown();
    e.target.textContent='Preview Mode';
  }
}

</script>

<style>
.content{
  width: 55vw;
  margin: 0px auto;
  text-align: left;
}
.content:focus{
  outline: none;
}
textarea{
  width: 100%;
  height: 60vh;
  display: block;
}
</style>