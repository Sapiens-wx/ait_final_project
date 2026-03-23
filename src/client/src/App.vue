<script setup>
import { useRouter } from 'vue-router'
import login from './components/login.vue'

const router = useRouter();

router.push('/login')
</script>

<template>
  <router-view />
</template>
