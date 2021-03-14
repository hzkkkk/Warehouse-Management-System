import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// 引用组件
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 通用的路由配置，匿名非匿名用户
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // 隐藏登录组件
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },

  // 物资管理
  {
    path: '/wms',
    component: Layout,
    redirect: '/wms/goodsManager',
    name: 'Wms',
    meta: { title: '物资管理', icon: 'example' },
    children: [
      {
        path: 'goodsManager',
        name: 'GoodsManager',
        component: () => import('@/views/goodsManager/index'),
        meta: { title: '物资详情管理', icon: 'table' }
      },
      {
        path: 'outportManager',
        name: 'OutportManager',
        component: () => import('@/views/outportManager/index'),
        meta: { title: '物资详情管理', icon: 'el-icon-caret-top' }
      },
      {
        path: 'inportManager',
        name: 'InportManager',
        component: () => import('@/views/inportManager/index'),
        meta: { title: '物资入库', icon: 'el-icon-caret-bottom' }
      }
    ]
  },

  // 仓库管理
  {
    path: '/warehouseManager',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'WarehouseManager',
        component: () => import('@/views/warehouseManager/index'),
        meta: { title: '仓库管理', icon: 'el-icon-s-home' }
      }
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'Syste,',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/role/index'),
        meta: { title: '角色管理', icon: 'el-icon-coin' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '菜单管理', icon: 'el-icon-menu' }
      }
    ]
  },

  // 跳转外网
  {
    path: 'my-own-site',
    component: Layout,
    children: [
      {
        path: 'https://bug-hunter.baklib-free.com/',
        meta: { title: 'BUG-Hunter 的个人网站', icon: 'link' }
      }
    ]
  },

  // 放在最后面是因为其他匹配完，没有之后再去重定向/404
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // 历史路由，需不需要加 #
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),

  // 脚手架自动根据配置生成左侧菜单的链路
  // 2: 获取路由表，存到 routes
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
