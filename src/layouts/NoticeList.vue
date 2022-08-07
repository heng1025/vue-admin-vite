<template>
  <el-popover placement="bottom-end" :width="240" trigger="click" :show-arrow="false">
    <template #reference>
      <div class="flex items-center px-4 h-full cursor-pointer">
        <el-icon :size="18">
          <el-badge :value="11" class="not-italic">
            <bell />
          </el-badge>
        </el-icon>
      </div>
    </template>
    <div class="flex justify-center">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="notice" name="notice">Notice</el-tab-pane>
        <el-tab-pane label="message" name="message">Message</el-tab-pane>
        <el-tab-pane label="todo" name="todo">To Do</el-tab-pane>
      </el-tabs>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Bell } from '@element-plus/icons-vue';

const activeName = ref('notice');

function handleClick(tab: unknown) {
  console.log(tab);
}
</script>
