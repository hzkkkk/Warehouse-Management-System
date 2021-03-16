<template>
  <!--弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="500px"
  >
    <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
    <!-- :rules  表单校验 -->
    <el-form
      ref="formData"
      status-icon
      :rules="rules"
      :model="formData"
      label-width="100px"
      label-position="right"
      style="width: 400px;"
    >
      <!-- prop 一般与formData 保持一致 -->
      <el-form-item label="分类名称:" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          v-model="formData.sort"
          style="width: 300px;"
          :min="1"
          :max="10000"
        />
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入备注"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('formData')">
          确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
// props : 接收父组件传递的属性
  props: {
    visible: { // 弹出隐藏
      type: Boolean,
      default: false
    },
    title: { // 标题
      type: String,
      default: ''
    },
    formData: { // 表单数据
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    // eslint-disable-next-line vue/require-default-prop
    remoteClose: Function // 用于关闭窗口

  },
  methods: {
    // 关闭弹窗
    handleClose(done) {
      // 表单清空
      this.$refs['formData'].resetFields()
      // this.visible // 错误的，因为它是父组件传递过来的，子组件不能直接改
      // 因为 visible 是父组件的属性，所以要让父组件去改变值
      this.remoteClose()
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
