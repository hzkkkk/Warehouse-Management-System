<template>
  <div class="app-container">

    <!-- 条件查询 -->
    <el-form :inline="true" size="mini">
      <el-form-item label="角色名称:">
        <el-input v-model.trim="query.name" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload">重置</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd"
        >新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 渲染列表  -->
    <!-- 数据列表 :data 绑定渲染的数据, border 纵向边框 -->
    <el-table :data="list" border highlight-current-row style="width: 100%">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column align="center" type="index" label="序号" width="60"></el-tablecolumn>
        <el-table-column align="center" prop="name" label="角色名称" />
        <el-table-column align="center" prop="remark" label="备注" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handlePermission(scope.row.id)"
            >分配权限</el-button>
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
              删除</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      :total="page.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
import api from '@/api/role'

export default {
  data() {
    return {
      list: [], // 列表数据
      page: { // 分页相关
        total: 0, // 总记录数
        current: 1, // 当前页码
        size: 20 // 每页显示20条数据
      },
      query: {} // 查询条件
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getList(this.query, this.page.current, this.page.size).then(response => {
        this.list = response.data.records
        this.page.total = response.data.total
      })
    },

    handlePermission(id) {
      console.log('分配权限', id)
    },
    handleEdit(id) {
      console.log('编辑', id)
    },
    handleDelete(id) {
      console.log('删除', id)
    },

    // 当每页显示条数改变后,被触发 , val是最新的每页显示条数
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    // 当页码改变后,被触发 , val 是最新的页面
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },

    // 查询
    queryData() {
      // 将页码变为第1页
      this.page.current = 1
      this.fetchData()
    },

    // 重置 or 刷新当前页面
    reload() {
      this.query = {}
      this.fetchData()
    },
    // 新增方法
    handleAdd() {
    }
  }
}
</script>
