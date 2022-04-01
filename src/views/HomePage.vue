<template>
  <div class="topCharts">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <left-echarts />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <middle-echarts />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <right-echarts />
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-card shadow="hover">
    <div id="main"
         style="width: 100%; height: 300px;"></div>
  </el-card>
</template>

<script setup>
import LeftEcharts from '../components/Echarts/LeftEcharts.vue'
import MiddleEcharts from '../components/Echarts/MiddleEcharts.vue'
import RightEcharts from '../components/Echarts/RightEcharts.vue'
import { onMounted } from 'vue'
import * as echarts from 'echarts'

const echartInit = () => {
  var myChart = echarts.init(document.getElementById('main'))
  // 指定图表的配置项和数据
  var option = {
    legend: {
      data: ['访问量'],
    },
    xAxis: {
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [555, 753, 377, 759, 999, 1002, 456, 990, 677, 453, 353, 888],
      },
    ],
  }
  myChart.setOption(option)
}
onMounted(() => {
  echartInit()
})
</script>

<style scoped>
.topCharts {
  padding-bottom: 20px;
}
</style>