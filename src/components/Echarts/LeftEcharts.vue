<template>
  <div id="left" style="width: 100%; height: 300px;"></div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
export default {
  setup() {
    const echartInit = () => {
      var myChart = echarts.init(document.getElementById('left'))
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
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
