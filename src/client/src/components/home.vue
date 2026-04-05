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
    :node="file" :deleteFile="deleteFile"
    :renameFile="renameFile" :newFile="newFile" :rightClick="openContextMenu">
  </fileNode>
</div>
<contextMenu ref="ctxMenu" :options="options">
</contextMenu>
</template>

<script setup>
import fileNode from './fileNode.vue';
import contextMenu from './contextMenu.vue';
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    eve.target.contentEditable="false";
}

function deleteFile(fileId){
    axios.post('/api/deleteFile', {username: user.value.username, fileId}).then(res=>{
        reloadPage();
    });
}

function editFile(fileId){
  router.push({path: '/edit', query: {fileId}});
}

reloadPage();

// context menu options
let options=[
    {
        name: "edit",
        onClick: function(){
            editFile(selectedFile.fileId);
        }
    },
    {
        name: "rename",
        onClick: function(){
            selectedElement.contentEditable="true";
            selectedElement.focus();

            const range = document.createRange();
            range.selectNodeContents(selectedElement);

            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    },
    {
        name: "create file",
        onClick: function(){
            newFile(selectedFile.fileId);
        }
    },
    {
        name: "delete",
        onClick: function(){
            deleteFile(selectedFile.fileId);
        }
    }
]
let selectedFile=undefined;
let selectedElement=undefined;
const ctxMenu=ref(0);
function openContextMenu(event, file){
    event.preventDefault();

    selectedFile=file;
    selectedElement=event.target;
    ctxMenu.value.root.style.left=event.clientX+"px";
    ctxMenu.value.root.style.top=event.clientY+"px";
    ctxMenu.value.root.style.visibility='visible';
    ctxMenu.value.root.focus();
}
onMounted(() => {
  ctxMenu.value.root.style.visibility='hidden';
});

</script>

<style>
.dir{

}
.file{

}
</style>