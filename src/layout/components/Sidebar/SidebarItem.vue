<template>
  <!-- <div v-if="!item.hidden"> -->
  <div>
    <!-- 没有子菜单，即只有一级菜单，item 每个菜单对象 -->
    <template v-if=" !item.children || item.children.length === 0 ">
      <!-- :to="item.url" 请求路径, -->
      <app-link :to="item.url">
        <!-- index 唯一标识，class 样式 class="submenu-title-noDropdown"
:class="{'submenu-title-noDropdown':!isNest}" -->
        <el-menu-item
          :index="item.url"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <!-- 引用了当前目录下的 item.vue 组件
icon菜单图标，title菜单名称 -->
          <item :icon="item.icon" :title="item.name" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有子菜单, index 请求地址 -->
    <el-submenu v-else :index="item.id">
      <!-- slot=”title"标识它下面是一级菜单名称 -->
      <template slot="title">
        <item :icon="item.icon" :title="item.name" />
      </template>
      <!-- 子菜单，再次引用自身组件, is-nest 显示箭头 V -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :is-nest="true"
        class="nest-menu"
      />
    </el-submenu>

    <!--  route 方式：一级菜单 -->
    <!-- <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}"> -->
    <!-- 脚手架自动根据配置生成左侧菜单的链路 -->
    <!--  4:将数据渲染出来到 SidebarItem 侧边栏 -->
    <!-- <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
    </el-menu-item>
    </app-link>
  </div>
</template>  -->
    <!-- route 方式：子菜单 -->
    <!-- <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu> -->

  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
