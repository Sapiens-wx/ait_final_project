<template>
<div class="menu">
  <div class="menuitem">
    Username: {{file.username}}
  </div>
  <div class="menuitem clickable" @click="saveFile">
    Save File
  </div>
</div>
<h1>{{file.filename}}</h1>
<div id="content" v-html="file.content" contenteditable="true"></div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {ref} from 'vue';
import axios from 'axios';

const route = useRoute();
// FileContent struct
const file = ref({});

axios.get(`/api/edit?fileId=${route.query.fileId}`).then(res=>{
    file.value=res.data;
});

function saveFile(){
    axios.post('/api/saveFile', {fileId: file.value.fileId, content: document.getElementById("content").innerHTML});
}
</script>