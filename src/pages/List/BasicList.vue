<template>
  <div>
    <el-card class="mb-8">
      <el-row>
        <el-col :span="8">
          <div class="text-center">
            <p class="text-gray-400">我的代办</p>
            <p class="text-2xl">8个任务</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text-center">
            <p class="text-gray-400">本周任务平均处理时间</p>
            <p class="text-2xl">32分钟</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="text-center">
            <p class="text-gray-400">本周完成任务数</p>
            <p class="text-2xl">24个任务</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <template #header>基本列表</template>
      <el-row v-for="i in 5" :key="i" align="middle" class="px-6 py-4 border-b">
        <el-col :span="10">
          <div class="flex">
            <el-image
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
              class="w-14 h-14 mr-2"
            />
            <div>
              <p>Alipay</p>
              <p class="text-gray-400">那是一种内在的东西， 他们到达不了，也无法触及的</p>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <p>Owner</p>
          <p class="text-gray-400">iron</p>
        </el-col>
        <el-col :span="4">
          <p>开始时间</p>
          <p class="text-gray-400">2021-11-04 15:27</p>
        </el-col>
        <el-col :span="4">
          <el-progress :percentage="50" />
        </el-col>
        <el-col :span="4" class="text-right">
          <el-button type="text">Detail</el-button>
          <el-divider direction="vertical" />
          <el-button type="text">Edit</el-button>
        </el-col>
      </el-row>
      <el-pagination background layout="prev, pager, next" :total="100" class="mt-4 text-right" />
    </el-card>
  </div>
</template>
