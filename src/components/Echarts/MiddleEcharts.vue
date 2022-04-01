<template>
  <div id="middle" style="width: 100%; height: 300px;"></div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
export default {
  setup() {
    const echartInit = () => {
      var myChart = echarts.init(document.getElementById('middle'))
      var option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union' },
              { value: 300, name: 'Vi' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      myChart.setOption(option)
    }
    onMounted(() => {
      echartInit()
    })
    return {
      echartInit,
    }
  },
}
</script>
