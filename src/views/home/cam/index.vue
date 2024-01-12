<template>
  <div class="cam_container">
    <!-- <img src="@/assets/cam_img/[cat]_layer[-1]_[mobilenet_v3_large].png"> -->
    <img :src="props.src[number]" />
    <div class="cam_ColorBand"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watchEffect } from "vue";

let props = defineProps(["src", "number"]);
</script>

<style scoped lang="scss">
.cam_container {
  display: flex;
  width: 7.4rem;
  height: 7rem;

  .cam_ColorBand {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    width: 0.3rem;
    height: 7rem;
    background: linear-gradient(to top, blue, cyan, green, yellow, orange, red);
  }
}
</style>
