<template>
  <el-result title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #icon>
      <el-image :src="notFound" />
    </template>
    <template #extra>
      <router-link to="/">
        <el-button type="primary">Back Home</el-button>
      </router-link>
    </template>
  </el-result>
</template>

<script lang="ts" setup>
import notFound from './404.svg';
</script>
