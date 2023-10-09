<template>
  <div class="h-full">
    <iframe class="wh-full" :src="src"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { url } = useRoute().query
console.log('url', url);
const src = ref(url);
</script>

<style scoped></style>