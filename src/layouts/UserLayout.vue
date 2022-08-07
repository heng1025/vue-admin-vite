<template>
  <div class="user-layout-container flex items-center justify-center">
    <router-view />
  </div>
</template>
<style scoped>
.user-layout-container {
  width: 100%;
  height: 100%;
  background: url('/login-bg.jpg') no-repeat;
  background-size: cover;
}
</style>
