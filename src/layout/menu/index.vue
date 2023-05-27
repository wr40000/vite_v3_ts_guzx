<template>
  <div class="menu_trans">
    <template v-for="(item, index) in menuList" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item
          v-if="item.meta.hidden"
          :index="item.path"
          @click="goRoute"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title v-show="!LayoutSettingStore.fold">
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-show="item.children[0].meta.hidden"
          :index="item.children[0].path"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <el-sub-menu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span v-show="!LayoutSettingStore.fold">{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useLayoutSettingStore from "@/store/modules/setting";

let LayoutSettingStore = useLayoutSettingStore();

//传过来的数据申明接收，不然用不了
defineProps(["menuList"]);

let $router = useRouter();
const goRoute = (vc: any) => {
  // console.log(vc);

  $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>

<style scoped lang="scss">
.menu_trans {
  span,
  .el-menu-item,
  .el-sub-menu {
    font-size: 1rem;
  }
}
</style>
