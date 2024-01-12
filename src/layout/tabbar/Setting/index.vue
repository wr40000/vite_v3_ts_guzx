<template>
  <div class="tabbar_right">
    <el-button
      type="primary"
      size="large"
      :icon="Refresh"
      circle
      @click="change_refresh"
    ></el-button>
    <el-button
      type="primary"
      size="large"
      :icon="FullScreen"
      circle
      @click="fullscreen"
    ></el-button>
    <el-button type="primary" size="large" :icon="Setting" circle></el-button>
    <img src="@/assets/Terraria/宠物/Slime_Prince.gif" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu @click="Logout">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting } from "@element-plus/icons-vue";
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

let LayoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
const change_refresh = () => {
  LayoutSettingStore.refsh = !LayoutSettingStore.refsh;
};
const fullscreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const Logout = () => {
  userStore.username = "";
  userStore.avatar = "";
  userStore.token = "";
  localStorage.removeItem("TOKEN");
  $router.push({ path: "/", query: { redirect: `${$route.path}` } });
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style scoped lang="scss">
.tabbar_right {
  display: flex;
  align-items: center;
  img {
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc($tabbar_container_height * 6 / 7);
    height: calc($tabbar_container_height * 6 / 7);
    border: 4px solid rgba(246, 248, 245, 0.3);
    border-radius: 50%;
    overflow: hidden;
    // min-height: 30px;
  }
}
</style>
