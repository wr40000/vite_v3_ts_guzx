<template>
  <h1>welcome</h1>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useStore from "@/store/modules/user";

let useUserStore = useStore();
onMounted(() => {
  useUserStore.getUserInfo();
});
</script>

<style scoped lang="scss"></style>
