<template>
  <div class="app-container">
    <!-- 数据列表 :data 绑定渲染的数据, border 纵向边框 -->
    <el-table
      :data="list"
      border
      highlight-current-row
      style="width: 100%"
    >
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column align="center" type="index" label="序号" width="60"></el-tablecolumn>
        <el-table-column align="center" prop="title" label="广告标题" />
        <el-table-column align="center" label="广告图片">
          <template slot-scope="scope">
            <!-- :preview-src-list 放大后的图片url，是数组，不要少中括号[] -->
            <el-image
              :src="scope.row.imageUrl"
              :preview-src-list="[scope.row.imageUrl]"
              style="width: 90px; height: 60px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="advertUrl" label="广告链接" />
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
            <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table-column></el-table>
  </div>
</template>

<script>
import api from '@/api/advert'
export default {
  data() {
    return {
      list: [],
      page: { // 分页相关
        total: 0, // 总记录数
        current: 1, // 当前页码
        size: 20 // 每页显示20条数据,
      },
      query: {} // 查询条件
    }
  },
  // 钩子函数获取数据
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getList(this.query, this.page.current, this.page.size).then(response => {
        this.list = response.data.records
        this.page.total = response.data.total
      })
    }
  }
}
</script>
