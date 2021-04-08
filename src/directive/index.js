
// 自定义权限指令
import permission from './permission'

export default (Vue) => {
  // 添加权限指令 v-permission
  Vue.directive('permission', permission)
}
