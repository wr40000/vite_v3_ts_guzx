<template>
  <div class="tabbar_left">
    <div class="tabber_icon">
      <el-icon @click="changeIcon">
        <component
          :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
    </div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="item.path"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span v-if="item.meta.title">&nbsp;{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import useLayoutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";
import { ref } from "vue";

let LayoutSettingStore = useLayoutSettingStore();
let $route = useRoute();

const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
};
// return {
//   fold
// }
</script>
<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
  .tabber_icon {
    margin-right: 1rem;
  }
  span {
    transform: scale(1);
  }
}
</style>
