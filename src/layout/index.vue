<template>
  <div class="layout_container">
    <div class="layout_tabbar">
      <logo />
    </div>
    <div class="layout_munu_main">
      <div class="layout_menu_left">
        <el-scrollbar height="100%">
          <el-menu class="munu_item">
            <Menu :menuList="useUserStore_for_menu" />
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="layout_main_right">
        <Main/>
        <div style="width: 100px; height: 300%"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import useUserStore from "@/store/modules/user";
import Main from "@/layout/main/index.vue"

let useUserStore_for_menu = useUserStore().constantRoutes;
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/bc_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .layout_tabbar {
    width: 100%;
    height: $base-lt-height;
    display: flex;
    min-height: 65px;
    // margin-left: 0.9rem;
    background-color: $base-lmr-background-color;
  }
  .layout_munu_main {
    display: flex;
    width: 100%;
    height: calc(100vh - $base-lt-height);

    .layout_menu_left {
      padding: 1rem;
      width: $base-lmr-width;
      height: 100%;
      overflow: scroll;
      background-color: $base-lml-background-color;
      .el-menu {
        border-right: none;
        background-color: $base-lmr-background-color;
      }
      .munu_item {
        background-color: $base-lmr-background-color;
      }
    }
    .layout_main_right {
      width: calc(100vw - $base-lmr-width);
      height: 100%;
      padding: 1rem;
      background-color: $base-lmr-background-color;
      overflow: scroll;
    }
  }
}
</style>
