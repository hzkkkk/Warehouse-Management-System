import { PcCookie, Key } from '@/utils/cookie'
import { getUserMenuList } from '@/api/user'

// 定义状态
const state = {
  init: false, // 是否已加载用户菜单
  menuList: [], // 用户拥有的菜单集合
  buttonList: [] // 拥有按钮权限集合
}
// 改变状态值
const mutations = {
  SET_SYSTEM_MENU: (state, data) => {
    // 已经加载用户权限
    state.init = true
    // 注意是 data.menuTreeList
    state.menuList = data.menuTreeList
    state.buttonList = data.buttonList
  }
}
// 定义行为
const actions = {
// 获取用户菜单
  GetUserMenu({ commit }) {
    return new Promise((resolve, reject) => {
      // 获取用户id,注意是uid
      const userId = PcCookie.get(Key.userInfoKey)
        ? JSON.parse(PcCookie.get(Key.userInfoKey)).uid : null

      // 发送请求获取用户拥有的菜单权限数据
      if (userId) {
        // console.log('userId', userId)
        getUserMenuList(userId).then(response => {
          // console.log('getUserMenuList', response.data)
          // 保存目录菜单权限数据至vuex中 +++++
          commit('SET_SYSTEM_MENU', response.data)
          resolve() // 正常响应钩子
        }).catch(error => {
          // 异常处理钩子
          reject(error)
        })
      }
    })
  }
}

export default {
  namespaced: true, // 引用时需要模块名，即当前文件名 menu/getUserMenu
  state,
  mutations,
  actions
}
