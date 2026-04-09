<template>
<div>
  &gt;
  <span class="file-title">
    <span @contextmenu.prevent="rightClick($event, node.data)" @keydown.enter.prevent="renameFile($event, node.data.fileId)" @blur="renameFile($event, node.data.fileId)"
      class="clickable" @click="editFile(node.data.fileId)">
    {{node.data.filename}}
    </span>
  </span>
  <div class="nodeContainer">
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
const router = useRouter();

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
</style>