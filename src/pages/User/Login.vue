<template>
  <div
    class="bg-white bg-opacity-25 px-6 py-8 w-80 shadow-md rounded-lg roubackdrop-filter backdrop-blur"
  >
    <div class="text-center">
      <el-avatar :size="50" src="/logo.png" class="p-1" />
    </div>
    <transition name="fade">
      <div class="mt-4">
        <el-alert
          v-show="isLoginErr"
          center
          show-icon
          type="error"
          :closable="false"
          title="Username or Password error"
        />
      </div>
    </transition>
    <el-form ref="formRef" :model="form" class="mt-4">
      <el-form-item
        class="mb-8"
        prop="name"
        :rules="[
          {
            required: true,
            message: 'Please input user name',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="form.name"
          clearable
          placeholder="Username: admin or user"
          :prefix-icon="User"
          @keyup.enter="submitForm"
        />
      </el-form-item>
      <el-form-item
        class="mb-12"
        prop="pass"
        :rules="[
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="form.pass"
          show-password
          placeholder="Password: vite"
          :prefix-icon="Lock"
          @keyup.enter="submitForm"
        />
      </el-form-item>
      <div class="flex justify-center">
        <el-button
          round
          type="primary"
          class="w-3/5 px-10"
          :disabled="!form.name || !form.pass"
          :loading="isLoading"
          @click="submitForm"
          >Login</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { useStore } from '@/store';

const router = useRouter();
const isLoading = ref(false);
const isLoginErr = ref(false);
const formRef = ref();
const form = reactive({
  name: '',
  pass: '',
});

const store = useStore();

// redirect prev route
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    router.replace('/');
  }
});

function submitForm() {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { name, pass } = form;
      try {
        isLoading.value = true;

        await store.login(name, pass);
        router.replace('/');
        isLoginErr.value = false;
        isLoading.value = false;
      } catch (error) {
        isLoginErr.value = true;
        isLoading.value = false;
      }
    }
  });
}
</script>

<style scoped>
:global(.el-avatar) {
  background-color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
