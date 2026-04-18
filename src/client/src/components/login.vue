<template>
  <div class="login">
    <h2>Login / Sign Up</h2>
    <form @submit.prevent="handleLogin">
      <div><label>username<input type="text" v-model="username"></input></label></div>
      <div><label>password<input type="password" v-model="password"></input></label></div>
      <div><button>login/signup</button></div>
    </form>
    <p class="errmsg" v-if="errmsg">{{errmsg}}</p>
  </div>
</template>

<style>
.login{
    width: 50vw;
    height: 70vh;
    background-color: black;
    margin: auto;
}
.errmsg{
    color: red;
}
</style>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter();
const username=ref('');
const password=ref('');
const errmsg=ref('');

function handleLogin(){
    if(!username.value)
        errmsg.value="please enter a valid username";
    else{
        axios.post('/api/login', {username: username.value, password: password.value}).then(res=>{
            if(res.data.err)
                errmsg.value=res.data.err;
            else if(username.value==='admin'){
                errmsg.value="";
                router.push('/admin');
            } else{
                errmsg.value="";
                router.push('/home');
            }
        });
    }
}
</script>