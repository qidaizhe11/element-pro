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
      <template v-else>
        <template v-if="menu.externalLink">
          <a :href="menu.path" :target="menu.target" :key="menu.key">
            <el-menu-item :index="menu.key">
              <i v-if="menu.icon" :class="menu.icon"></i>
              <span slot="title">{{menu.name}}</span>
            </el-menu-item>
          </a>
        </template>
        <template v-else>
          <router-link :to="menu.path" :key="menu.key">
            <el-menu-item :index="menu.key">
              <i v-if="menu.icon" :class="menu.icon"></i>
              <span slot="title">{{menu.name}}</span>
            </el-menu-item>
          </router-link>
          </el-menu-item>
        </template>
      </template>
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

