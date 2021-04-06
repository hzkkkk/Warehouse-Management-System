<template>
  <div class="dashboard-container">
    <!-- <div>
      菜单权限: {{ $store.getters.menuList }} <br>
    </div> -->
    <!-- 面板统计组件 -->
    <PanelGroup
      :user-total="userTotal"
      :article-total="articleTotal"
      :question-total="questionTotal"
    />

    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <!-- 饼状图： 各技术频道文章统计 -->
          <!-- v-if="flag" 获取数据之后才能渲染出来，
          不然不会得到新的数据 -->
          <pie-chart
            v-if="flag"
            :legend-data="categoryTotal.nameList"
            :series-data="categoryTotal.nameAndValueList"
          />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <!-- 柱状图： 近6个月发布的文章数 -->
          <bar-chart
            v-if="flag"
            :x-axis-data="monthAritcleTotal.yearMonthList"
            :series-data="monthAritcleTotal.aritcleTotalList"
          />
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
import PanelGroup from './components/PanelGroup'

import api from '@/api/home'

export default {
  name: 'Dashboard',
  components: { PieChart, BarChart, PanelGroup }, // 2. 作为子组件

  data() {
    return {
      // 上半部分：面板显示子组件
      userTotal: 0, // 总用户
      articleTotal: 0, // 总文章
      questionTotal: 0, // 总提问

      // 下半部分：图表显示子组件
      categoryTotal: {}, // 每个分类下的文章数
      monthAritcleTotal: {}, // 查询近6个月发布的文章数
      flag: false // 是否显示子组件，加载数据完成后
    }
  },

  mounted() {
    // 单表查询总记录数
    this.getTotal()
    // 统计各技术频道文章数和近6个月发布文章数
    this.getArticleTotal()
  },

  methods: {
    // 获取总记录数并保存到 各个数值
    async getTotal() {
      // 总用户
      const { data: userTotal } = await api.getUserTotal()
      this.userTotal = userTotal
      // 总文章
      const { data: articleTotal } = await api.getArticleTotal()
      this.articleTotal = articleTotal
      // 总提问
      const { data: questionTotal } = await api.getQuestionTotal()
      this.questionTotal = questionTotal
    },

    // 多表查询并保存到 各个数值
    async getArticleTotal() {
      // 每个分类下的文章数
      const { data: categoryTotal } = await api.getCategoryTotal()
      this.categoryTotal = categoryTotal
      // 查询近6个月发布的文章数
      const { data: monthAritcleTotal } = await api.getMonthAritcleTotal()
      this.monthAritcleTotal = monthAritcleTotal
      // 数据加载完成，显示子组件
      this.flag = true
    }
  }

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
