<template>
  <div class="flex items-center">
    <div class="leading-none mr-4">
      <slot name="icon"></slot>
    </div>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="item in route.matched" :key="item.path">
        <router-link :to="item.path">{{ item?.meta?.title ?? item.name }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
