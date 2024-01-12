<template>
  <div class="layout_container">
    <div class="layout_tabbar">
      <logo />
    </div>
    <div class="layout_munu_main">
      <div
        class="layout_menu_left"
        :class="{ fold: LayoutSettingStore.fold ? true : false }"
      >
        <el-scrollbar height="100%">
          <!-- collapse -->
          <el-menu
            class="munu_item"
            :collapse="LayoutSettingStore.fold ? true : false"
            :default-active="$route.path"
          >
            <Menu :menuList="useUserStore_for_menu" />
          </el-menu>
        </el-scrollbar>
      </div>
      <div
        class="layout_main_right"
        :class="{ fold: LayoutSettingStore.fold ? true : false }"
      >
        <div class="Tabbar_container">
          <tabbar />
        </div>
        <div class="Main_container">
          <Main />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "./logo/index.vue";
import tabbar from "./tabbar/index.vue";
import Menu from "./menu/index.vue";
import useUserStore from "@/store/modules/user";
import Main from "@/layout/main/index.vue";
import { useRoute } from "vue-router";
import useLayoutSettingStore from "@/store/modules/setting";
//useRoute useRouter 傻傻分不清
let $route = useRoute();
let LayoutSettingStore = useLayoutSettingStore();
let useUserStore_for_menu = useUserStore().constantRoutes;
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/bc_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  .layout_tabbar {
    width: 100%;
    height: $base-lt-height;
    display: flex;
    justify-content: start;
    align-items: center;
    min-height: 65px;
    // margin-left: 0.9rem;
    background-color: $base-lmr-background-color;
  }
  .layout_munu_main {
    display: flex;
    width: 100vw;
    height: calc(100vh - $base-lt-height);

    .layout_menu_left {
      padding-top: 1rem;
      padding-left: 1rem;
      width: $base-lml-width;
      max-width: $base-lmr-maxwidth;
      height: 100%;
      overflow: scroll;
      background-color: $base-lml-background-color;
      transition: all 0.3s;
      &.fold {
        width: $base-lml-fold-width;
      }
      .el-menu {
        border-right: none;
        background-color: $base-lmr-background-color;
      }
      .munu_item {
        background-color: $base-lmr-background-color;
      }
    }
    .layout_main_right {
      display: flex;
      // width: calc(100vw - $base-lml-width);
      width: 100vw;
      height: 100%;
      padding: 1rem;
      background-color: $base-lmr-background-color;
      overflow: scroll;
      flex-wrap: wrap;
      justify-content: start;
      align-content: start;
      transition: all 0.3s;
      &.fold {
        width: calc(100vw - $base-lml-fold-width);
      }
      .Tabbar_container {
        width: 100%;
      }
      .Main_container {
        width: 100%;
      }
    }
  }
}
</style>
