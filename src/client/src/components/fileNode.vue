<template>
<div>
  <span class="toggle" ref="spanToggle" @click="toggleCollapse">+</span>
  <span class="file-title">
    <span @contextmenu.prevent="rightClick($event, node.data)" @keydown.enter.prevent="renameFile($event, node.data.fileId)" @blur="renameFile($event, node.data.fileId)"
      class="clickable" @click="editFile(node.data.fileId)">
    {{node.data.filename}}
    </span>
  </span>
  <div class="nodeContainer" v-if="!collapseHeader">
    <fileNode v-for="file in node.children" :key="file.data.fileId" :node="file"
      :newFile="newFile" :deleteFile="deleteFile" :renameFile="renameFile"
      :rightClick="rightClick">
    </fileNode>
  </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import edit from './edit.vue'
import {ref} from 'vue'
const router = useRouter();

const collapseHeader=ref(true);
const spanToggle=ref({});

defineProps({
  node: Object,
  newFile: Function,
  renameFile: Function,
  deleteFile: Function,
  rightClick: Function
})

function editFile(fileId){
  router.push({path: '/edit', query: {fileId}});
}

function toggleCollapse(){
  collapseHeader.value=!collapseHeader.value;
  if(collapseHeader.value)
    spanToggle.value.textContent="+";
  else
    spanToggle.value.textContent="-";
}
</script>

<style>
.nodeContainer{
    padding-left: 20px;
}
.clickable{
    cursor: pointer;
    background-color: white;
}
.clickable:hover{
    background-color: #ddd;
}
.toggle{
  display: inline-block;
  text-align: center;
  width:25px;
  height:25px;
}
.toggle:hover{
  cursor: pointer;
  border-radius: 3px;
  background-color: #444;
}
</style>