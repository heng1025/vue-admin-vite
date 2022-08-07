<template>
  <router-link to="/" class="flex p-2 text-white items-center fixed top-0">
    <img src="/logo.png" alt="logo" class="h-10" />
    <span v-show="!collapse" class="ml-4">{{ appName }}</span>
  </router-link>
</template>
<script lang="ts" setup>
const appName = ref(__APP_NAME__);
defineProps<{
  collapse: boolean;
}>();
</script>
