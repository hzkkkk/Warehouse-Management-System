const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // 添加标签导航栏
  // 8: 更新getters.js 模块
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  // 添加菜单相关状态，菜单按钮权限状态
  init: state => state.menu.init,
  menuList: state => state.menu.menuList,
  buttonList: state => state.menu.buttonList
}

export default getters
