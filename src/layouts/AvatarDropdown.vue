<template>
  <el-dropdown size="medium" placement="bottom-start" trigger="hover">
    <div class="flex items-center cursor-pointer h-12 px-4 hover:bg-gray-100">
      <el-avatar :size="26" :src="account?.avatar" class="mr-2" />
      <span>{{ account?.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <router-link to="/account/center" class="verticle-center">
            <el-icon>
              <user />
            </el-icon>
            <span>个人中心</span>
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/account/settings" class="verticle-center">
            <el-icon>
              <setting />
            </el-icon>
            <span>个人设置</span>
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <div class="verticle-center">
            <el-icon>
              <right />
            </el-icon>
            <span>退出登录</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { User, Setting, Right } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const account = ref<API.User>();

const router = useRouter();

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user ');
  router.replace('/login');
}

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    const userFormat = JSON.parse(user);
    account.value = userFormat;
  }
});
</script>

<style scoped>
.verticle-center {
  @apply flex items-center;
}
</style>
