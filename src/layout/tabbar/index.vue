<template>
  <div class="tabbar_container">
    <Breadcrumb />
    <Setting />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./Breadcrumb/index.vue";
import Setting from "./Setting/index.vue";
</script>
<script lang="ts">
export default{
  name:"tabbar",
}
</script>

<style scoped lang="scss">
.tabbar_container {
  width: 100%;
  height: $tabbar_container_height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $tabbar_container_bc;
  // font-size: 1rem;$tabbar_container_bc
}
</style>
