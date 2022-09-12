<template>
  <el-container class="h-screen">
    <el-aside :width="isMenuCollapse ? '64px' : '240px'" :style="{ backgroundColor: sidebarBackgroundColor }"
      class="pt-14 overflow-hidden transition-all duration-200">
      <logo :collapse="isMenuCollapse" />
      <el-scrollbar>
        <sidebar :collapse="isMenuCollapse" :background-color="sidebarBackgroundColor" />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="flex items-center justify-between h-12 mb-0.5 shadow">
        <navbar>
          <template #icon>
            <el-icon :size="24" class="cursor-pointer" @click="isMenuCollapse = !isMenuCollapse">
              <expand v-if="isMenuCollapse" />
              <fold v-else />
            </el-icon>
          </template>
        </navbar>
        <right-content />
      </el-header>
      <el-scrollbar class="bg-gray-50 main-scroll">
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
        <el-backtop target=".main-scroll .el-scrollbar__wrap" />
      </el-scrollbar>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Expand, Fold } from '@element-plus/icons-vue';
import Logo from './Logo.vue';
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import RightContent from './RightContent.vue';

const sidebarBackgroundColor = '#001529';
const isMenuCollapse = ref(false);
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.1s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
