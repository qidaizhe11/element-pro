<template>
  <div>
    <template v-for="menu in menus">
      <el-submenu v-if="menu.children" :key="menu.key" :index="menu.key">
        <template slot="title">
          <i v-if="menu.icon" :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <sidebar-item :menus="menu.children"></sidebar-item>
      </el-submenu>
      <el-menu-item v-else :key="menu.key" :index="menu.key">
        <template v-if="menu.externalLink">
          <a :href="menu.path" :target="item.target">
            <i v-if="menu.icon" :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </a>
        </template>
        <template v-else>
          <router-link :to="menu.path">
            <i v-if="menu.icon" :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </router-link>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SidebarItem',
  props: {
    menus: {
      type: Array,
      default: []
    }
  }
})
</script>

