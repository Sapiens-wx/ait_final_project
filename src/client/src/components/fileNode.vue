<template>
<div>
  &gt;
  <span contenteditable="true" @keydown.enter.prevent="renameFile($event, node.data.fileId)">
  {{node.data.filename}}
  </span>
  <span class="clickable" @click="newFile(node.data.fileId)">new</span>
  <span class="clickable" @click="deleteFile(node.data.fileId)">delete</span>
  <span class="clickable" @click="editFile(node.data.fileId)">edit</span>
  <div class="nodeContainer">
    <fileNode v-for="file in node.children" :key="file.data.fileId" :node="file"
      @newFile="newFile"
      @deleteFile="deleteFile"
      @renameFile="renameFile">
    </fileNode>
  </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import edit from './edit.vue'
const router = useRouter();

defineProps({
  node: Object
})
const emit = defineEmits(['newFile', 'deleteFile', 'renameFile'])

function newFile(fileId){
    emit('newFile', fileId);
}
function deleteFile(fileId){
    emit('deleteFile', fileId);
}
function renameFile(event, fileId){
    emit('renameFile', event, fileId);
}
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