<template>
  <el-card>
    <el-row :gutter="20">
      <el-col v-for="i in 10" :key="i" :span="6" class="py-2">
        <el-card shadow="hover">
          <template #header>
            <el-row justify="space-between" align="middle">
              <el-col :span="10">Card name</el-col>
              <el-col :span="10" class="text-right">
                <el-button class="button" type="text">Operation</el-button>
              </el-col>
            </el-row>
          </template>
          <div>{{ i }}</div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
