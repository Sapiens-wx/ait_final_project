<template>
<h1>Users</h1>
<div class="user-container">
    <div class="user" v-for="user in users">
        <p>{{user.username}}</p>
        <a @click="removeUser($event, user)">Delete</a>
    </div>
</div>
</template>

<script setup>
import contextMenu from './contextMenu.vue';
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// {files: array of FileStruct, username: the username}
const users=ref([]);

async function reloadPage(){
    const res=await fetch('/api/admin');
    users.value=await res.json();
}

function removeUser(e, user){
    fetch("/api/admin/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user
        })
    });
    e.target.parentElement.remove();
}

reloadPage();

</script>

<style>
.user{
    border: 1px solid white;
    margin: 5px;
}
.user:hover{
    background-color: #ddd;
}
.user-container{
    width: 75vw;
    margin: 5px auto;
}
.user p{
    width: 75%;
    display: inline-block;
}
.user a{
    width: 20%;
    display: inline-block;
    margin-left: 5%;
}
.user a:hover{
    cursor: pointer;
    background-color: #16171d;
}
</style>