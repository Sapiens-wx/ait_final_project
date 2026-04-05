<template>
<div class="context-menu" ref="root" tabindex="-1" @blur="onLoseFocus">
    <div v-for="item in options" class="context-menu-item" @click="item.onClick($event), onLoseFocus()">
    {{item.name}}
    </div>
</div>
</template>

<script setup>
import {ref} from 'vue'

const root=ref(0);
// options: Array of Object
// {name: String, onClick: Function}
defineProps({
  options: Array
})
defineExpose({
    root: root
})

function onLoseFocus(){
    if(root.value)
        root.value.style.visibility='hidden';
}
</script>

<style>
.context-menu{
    position: fixed;
    top: 0;
    left: 0;
    width: 20vw;
}
.context-menu-item{
    cursor: pointer;
    background-color: white;
}
.context-menu-item:hover{
    background-color: #ddd;
}
</style>