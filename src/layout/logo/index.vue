<template>
  <div class="logo">
    <div class="logo_img" v-if="setting.logo_isshow" >
      <img :src="setting.logo" title="Terraria" @click="gohome"/>
    </div>
    <div class="logo_text">Terraria</div>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting";
import { useRouter } from "vue-router";

let $route = useRouter();
const gohome=()=>{
  $route.push("/layout/welcome");
}
</script>
<script lang="ts">
export default{
  name:"Logo",
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  //   justify-content: center;
  width: $base-logo-width;
  height: $base-lt-height;
  .logo_img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    img {
      height: calc($base-lt-height * 2 / 3);
      min-height: 30px;
    }
  }
  .logo_text {
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    -webkit-text-stroke: 0.05rem #2f90b9;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
  }
}
</style>
