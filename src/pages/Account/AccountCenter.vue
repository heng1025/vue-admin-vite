<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <el-card>
        <div class="text-center mb-8">
          <el-avatar :size="100" class="mb-2" :src="user?.avatar" />
          <p class="mb-2 text-lg font-bold">{{ user?.username }}</p>
          <p>{{ user?.signature }}</p>
        </div>
        <div class="pl-10">
          <p v-for="info in profiles" :key="info.name" class="flex items-center">
            <el-icon :size="16">
              <component :is="info.icon" />
            </el-icon>
            <span class="ml-1">{{ info.name }}</span>
          </p>
        </div>
        <el-divider />
        <p class="mb-2">标签</p>
        <div>
          <el-tag v-for="tag in user?.tags" :key="tag.key" size="small">{{ tag.label }}</el-tag>
        </div>
      </el-card>
    </el-col>
    <el-col :span="17">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="项目" name="project">
            <el-row :gutter="20">
              <el-col v-for="i in 5" :key="i" :span="12">
                <el-card shadow="hover" class="mb-2">
                  <el-image
                    class="w-full h-48 mb-4"
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    fit="fill"
                  />
                  <div>
                    <span>Yummy hamburger</span>
                    <div class="bottom">
                      <el-button type="text" class="button">Operating</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="应用" name="application">
            <div>application</div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, shallowRef, onMounted } from 'vue';
import { Location, OfficeBuilding, Apple } from '@element-plus/icons-vue';
import { getCurrentUser } from '@/services/user';

const user = ref<API.User>();
const profiles = shallowRef();

onMounted(async () => {
  user.value = await getCurrentUser();
  profiles.value = [
    {
      name: user.value?.title,
      icon: Apple,
    },
    {
      name: user.value?.group,
      icon: OfficeBuilding,
    },
    {
      name: user.value?.address,
      icon: Location,
    },
  ];
});

const activeName = ref('project');
</script>
<style scoped>
.el-tag {
  margin: 0 8px 8px 0;
}
</style>
