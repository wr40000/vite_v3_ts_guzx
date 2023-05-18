<template>
  <SvgIcon name="qushi" width="50px" height="50px"></SvgIcon>
</template>

<script setup lang="ts">
import {reqLogin} from "@/api/user/index"
import { onMounted } from 'vue';

onMounted(()=>{
  reqLogin({
    username:"admin",
    password:"111111",
    token:"123"
  })
})

</script>

<style scoped lang="scss">

</style>
