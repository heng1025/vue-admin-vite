<template>
  <el-result title="500" sub-title="Sorry, the server is reporting an error.">
    <template #icon>
      <el-image :src="serverErr" />
    </template>
    <template #extra>
      <router-link to="/">
        <el-button type="primary"> Back Home </el-button>
      </router-link>
    </template>
  </el-result>
</template>

<script lang="ts" setup>
import serverErr from './500.svg';
</script>
