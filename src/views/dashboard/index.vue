<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      {{ name }}
    </div>
  </div>
</template>

<script>
// 引入 api
import api from '@/api/test'
export default {
  name: 'Dashboard',
  data() {
    return {
      name: {}
    }
  },

  // ...省略
  // 钩子函数
  created() {
    this.fetchData()
  },

  // 解决测试跨域问题 1-2  @/views/dashboard/index.vue （已经配置好路由）去调用测试函数
  methods: {
    fetchData() {
      // api.test() 返回的是 Promise 对象，再调用 Promise.then()
      api.test().then((response) => {
        // 打印响应数据
        console.log(response)
        this.name = response
      })
    }
  }
}

// 获取表图，暂时拿掉用作测试
// import { mapGetters } from 'vuex'

// export default {
//   name: 'Dashboard',
//   computed: {
//     ...mapGetters([
//       'name'
//     ])
//   }
// }
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
