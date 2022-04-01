<template>
  <div id="right" style="width: 100%; height: 300px;"></div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
export default {
  setup() {
    //methods
    const echartInit = () => {
      var myChart = echarts.init(document.getElementById('right'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['访问量', '时间', '错误率', '提交', 'China'],
        },
        series: [
          {
            name: '2021',
            type: 'bar',
            data: [18203, 25041, 1002, 30211, 131744],
          },
          {
            name: '2022',
            type: 'bar',
            data: [19325, 34380, 9908, 30251, 134141],
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    //onMounted
    onMounted(() => {
      echartInit()
    })
    //return
    return {
      echartInit,
    }
  },
}
</script>
