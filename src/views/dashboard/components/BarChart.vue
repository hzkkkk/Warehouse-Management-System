<template>
  <div ref="main" :class="className" :style="{height:height,width:width}" />
</template>

<script>

// import echarts from 'echarts'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // 主题

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    xAxisData: { // x轴显示的年月
      type: Array,
      default: () => ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06']
    },
    seriesData: { // 柱状数据
      type: Array,
      default: () => [10, 52, 200, 334, 390, 330]
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },

  // 当组件销毁前会调用此钩子
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    // 注销实例
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // 初始化实例时，指定主题
      this.chart = echarts.init(this.$refs.main, 'macarons')
      this.chart.setOption({
        title: { // 标题
          text: '近6个月发布的文章数', // 主标题
          left: 'center' // 居中
        },

        // 鼠标放上去显示的提示框组件
        tooltip: {
          trigger: 'axis', // 鼠标放柱子上事件
          axisPointer: { // 坐标轴指示器，坐标轴触发有效,
            type: 'shadow' // 默认为直线（line），shadow（灰色背景） 可选为：'line' | 'shadow'
          },
          textStyle: {
            color: 'rgba(255, 255, 255, 1)'
          }
        },

        grid: { // 柱状图整体位置
          left: '3%',
          right: '4%',
          bottom: '3%',
          // 坐标轴的刻度标识
          containLabel: true
        },

        xAxis: [ // x 轴
          {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],

        yAxis: [ // y 轴
          {
            type: 'value'
          }
        ],
        series: [ // 系列，显示的数据
          {
            name: '发布数', // 悬浮提示内容
            type: 'bar', // 柱状类型
            barWidth: '60%', // 每个柱状宽度
            // 父组件会将数据导入到这里
            data: this.seriesData
          }
        ]
      })
    }
  }
}
</script>
