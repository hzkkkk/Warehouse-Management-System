import router from './router'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title'

import store from './store'
// 原例：import store from './store'
// 原例：import { getToken } from '@/utils/auth' // get token from cookie
// 原例：import { Message } from 'element-ui'

// 路由拦截器获取认证信息
// ++ 1. 导入 cookie.js 获取认证信息 ++
import { PcCookie, Key } from '@/utils/cookie'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

// 后端请求前端路由用
// 访问路由之前都会拦截
// 1. 从 cookie 获取 token
// 2. 如果有 token ，再访问 /login，则跳转首页
//             如果访问 其他路由，则跳转目标路由
// 3. 如果没有 token ，从白名单查看是否包含路由
//             如果包含，直接放行
//             如果不包含，则跳转登录界面
router.beforeEach(async(to, from, next) => {
  // start progress bar，进度条
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // // 决定用户是否登录
  // 原例： const hasToken = getToken()

  // +++ 2. 从 token 获取 accessToken +++
  const hasToken = PcCookie.get(Key.accessTokenKey)
  // 原例：const hasGetUserInfo = store.getters.name

  if (hasToken) {
    // 有 token
    if (to.path === '/login') {
      console.log('已经登录')
      // 已经登录了
      //    router/index.js 里面
      //  path: '/' 就是首页，重定向到/dashboard
      next({ path: '/' })

      NProgress.done()
    } else {
      // +++ 3. 从 token 获取用户信息 +++
      const hasGetUserInfo = PcCookie.get(Key.accessTokenKey)
      // 原例：const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // // 如果有,不加权限管理的话，直接转发
        // next()

        // console.log('检测到有用户信息 token')
        // 是否已经初始化过权限菜单 ++++
        if (store.getters.init === false) {
          // console.log('正在获取用户拥有的权限菜单')
          // 获取用户拥有的权限菜单 ，调用 store/modules/menu.js 的 GetUserMenu
          store.dispatch('menu/GetUserMenu').then(() => {
            // replace: true:继承访问目标路由且不会留下history记录
            next({ ...to, replace: true })
          // eslint-disable-next-line handle-callback-err
          }).catch((error) => {
            Message({ message: '获取用户权限信息失败', type: 'error' })
          })
        } else {
          next() // 继承访问目标路由
        } // ++++
      } else {
        console.log('跳转认证客户端')
        // 如果没有则跳转认证客户端
        window.location.href =
        `${process.env.VUE_APP_AUTH_CENTER_URL}?redirectURL=${window.location.href}`

        // 原例：
        // try {
        //   // get user info
        //   await store.dispatch('user/getInfo')

        //   next()
        // } catch (error) {
        //   // remove token and go to login page to re-login
        //   await store.dispatch('user/resetToken')
        //   Message.error(error || 'Has Error')
        //   next(`/login?redirect=${to.path}`)
        //   NProgress.done()
        // }
      }
    }
  } else {
    // 无 token
    // 是否在白名单里面，比如登录页面这样直接放行
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // 如果没有则跳转认证客户端
      window.location.href =
`${process.env.VUE_APP_AUTH_CENTER_URL}?redirectURL=${window.location.href}`

      // 强制送到登录界面，登录成功后会重定向到你刚刚传递的
      // other pages that do not have permission to access are redirected to the login page.
      // 原例：next(`/login?redirect=${to.path}`)

      //
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
