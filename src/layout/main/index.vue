<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import {watch,ref} from "vue"
import useLayoutSettingStore from "@/store/modules/setting"
import { nextTick } from "vue";

let LayoutSettingStore = useLayoutSettingStore();
let flag = ref(true);

watch(()=>LayoutSettingStore.refsh,()=>{
  flag.value = false;
  nextTick(()=>{
    flag.value=true
  })
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.fade-enter-active {
  transition: 0.5s all;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
