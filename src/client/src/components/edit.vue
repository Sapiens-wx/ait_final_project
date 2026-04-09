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
<div id="content" v-html="file.content" contenteditable="true"></div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue';
import axios from 'axios';
import home from './home.vue';

const router = useRouter();

const route = useRoute();
// FileContent struct
const file = ref({});

axios.get(`/api/edit?fileId=${route.query.fileId}`).then(res=>{
    file.value=res.data;
});

function saveFile(){
    axios.post('/api/saveFile', {fileId: file.value.fileId, content: document.getElementById("content").innerHTML});
}

function toHome(){
  router.push('/home');
}
</script>

<style>
#content{
  width: 55vw;
  margin: 0px auto;
  text-align: left;
}
#content:focus{
  outline: none;
}
</style>