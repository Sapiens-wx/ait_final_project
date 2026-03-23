<template>
<div>
  &gt;{{node.data.filename}}
  <span class="clickable" @click="emit('newFile', node.data.fileId)">new</span>
  <span class="clickable" @click="emit('deleteFile', node.data.fileId)">delete</span>
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
function renameFile(event, fileId, filename){
    emit('renameFile', event, fileId, filename);
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