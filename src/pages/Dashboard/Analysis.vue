<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card>
          <thumb-header title="总销售额" content="¥ 126,560" />
          <div class="flex h-20">
            <div class="inline-flex items-center mr-4">
              <span>
                周同比
                <span class="mx-1">12%</span>
              </span>
              <el-icon color="red">
                <caret-top />
              </el-icon>
            </div>
            <div class="inline-flex items-center">
              <span>
                日同比
                <span class="mx-1">12%</span>
              </span>
              <el-icon color="green">
                <caret-bottom />
              </el-icon>
            </div>
          </div>
          <thumb-footer title="日销售额" content="￥12,423" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <thumb-header title="访问量" content="8,846" />
          <div ref="viewCount" class="h-20"></div>
          <thumb-footer title="日访问量" content="1,234" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <thumb-header title="支付笔数" content="6,560" />
          <div ref="payCount" class="h-20"></div>
          <thumb-footer title="转化率" content="60%" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <thumb-header title="运营活动效果" content="78%" />
          <div ref="operateProgress" class="h-20"></div>
          <thumb-footer title="周同比" content="￥12,423" />
        </el-card>
      </el-col>
    </el-row>
    <el-card class="mt-5">
      <el-tabs v-model="activeTab">
        <el-tab-pane v-for="tab in sales" :key="tab.id" :name="tab.id" :label="tab.title">
          <el-row justify="space-between">
            <el-col :span="16">
              <div :ref="(el) => setChartRef(el, tab.id)" class="h-80"></div>
            </el-col>
            <el-col :span="6">
              <div>门店{{ tab.title }}排名</div>
              <ul>
                <li v-for="index in 7" :key="index" class="flex justify-between items-center mt-4">
                  <div class="inline-flex justify-between items-center">
                    <el-avatar :size="24" :class="index <= 3 ? 'bg-gray-700' : ''" class="mr-4">
                      {{ index }}
                    </el-avatar>
                    <span>工专路 {{ index }} 号店</span>
                  </div>
                  <span>323,234</span>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="tsx" setup>
import { nextTick, onMounted, reactive, ref, watch, Fragment } from 'vue';
import { InfoFilled, CaretTop, CaretBottom } from '@element-plus/icons-vue';
import * as echarts from 'echarts/core';
import { BarChart, BarSeriesOption, LineChart, LineSeriesOption } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TitleComponentOption,
  GridComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ElIcon, ElTooltip } from 'element-plus';

const ThumbHeader = (props: { title: string; content: string }) => {
  const { title, content } = props;
  return (
    <Fragment>
      <div class="flex justify-between items-center mb-2">
        <span class="text-gray-400">{title}</span>
        <ElTooltip class="item" content="指标说明" placement="top">
          <ElIcon size={18}>
            <InfoFilled />
          </ElIcon>
        </ElTooltip>
      </div>
      <div class="text-3xl">{content}</div>
    </Fragment>
  );
};

const ThumbFooter = (props: { title: string; content: string }) => {
  const { title, content } = props;
  return (
    <Fragment>
      <el-divider class="my-2"></el-divider>
      <div>
        <span>{title}</span>
        <span class="ml-2">{content}</span>
      </div>
    </Fragment>
  );
};

type ECOption = echarts.ComposeOption<
  BarSeriesOption | LineSeriesOption | TitleComponentOption | GridComponentOption
>;

type SaleChartTab = {
  id: 'amount' | 'volume';
  title: string;
};

type SaleChartTabId = SaleChartTab['id'];

const viewCount = ref<HTMLDivElement>();
const payCount = ref<HTMLDivElement>();
const operateProgress = ref<HTMLDivElement>();
const sales = ref<SaleChartTab[]>([
  {
    id: 'amount',
    title: '销售额',
  },
  {
    id: 'volume',
    title: '访问量',
  },
]);

const activeTab = ref<SaleChartTabId>('amount');

const chartIns = reactive<{ [key in SaleChartTabId]: echarts.ECharts | null }>({
  amount: null,
  volume: null,
});
const chartEl = reactive<{ [key in SaleChartTabId]: HTMLDivElement | null }>({
  amount: null,
  volume: null,
});

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, CanvasRenderer]);

const saleOption: ECOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'sales volume',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220, 1159, 820, 200, 334, 390, 330, 220],
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setChartRef(ref: any, id: SaleChartTab['id']) {
  if (ref && !chartEl[id]) {
    chartEl[id] = ref;
  }
}

watch(
  activeTab,
  async () => {
    await nextTick();
    if (!chartIns[activeTab.value]) {
      chartIns[activeTab.value] = echarts.init(chartEl[activeTab.value] as HTMLDivElement);
      chartIns[activeTab.value]?.setOption(saleOption);
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  const dayViewChart = echarts.init(viewCount.value as HTMLDivElement);
  const payChart = echarts.init(payCount.value as HTMLDivElement);
  const operateProgressChart = echarts.init(operateProgress.value as HTMLDivElement);
  dayViewChart.setOption<ECOption>({
    xAxis: {
      type: 'category',
      show: false,
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        areaStyle: {},
      },
    ],
  });
  payChart.setOption<ECOption>({
    xAxis: {
      type: 'category',
      show: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  });
  operateProgressChart.setOption<ECOption>({
    yAxis: {
      type: 'category',
      show: false,
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [78],
        type: 'bar',
      },
    ],
  });
});
</script>
