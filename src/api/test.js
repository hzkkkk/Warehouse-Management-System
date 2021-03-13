// 解决测试跨域问题 1-3
// request.js  use和 error 都打包好,直接导进来用
// 被 @/views/dashboard/index.vue 调用（已经配置好路由）
import request from '@/utils/request'

export default {
  test() {
    return request({ // Promise 异步对象， ES6 语法
      url: '/test',
      method: 'post',
      data: {
        'name': '测试Post'
      }
    })
  }
}

// export default {
//     test() {
//         return request({  // Promise 异步对象， ES6 语法
//             url: '/test',
//             method: 'get'
//         })
//     }
// }
