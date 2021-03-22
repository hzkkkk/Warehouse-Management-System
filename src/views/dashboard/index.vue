<template>
  <div class="dashboard-container">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <!-- 饼状图： 各技术频道文章统计 -->
          <pie-chart />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <!-- 柱状图： 近6个月发布的文章数 -->
          <bar-chart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// import * as echarts from 'echarts'

// 1： 导入
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'Dashboard',
  components: { PieChart, BarChart } // 2. 作为子组件
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
