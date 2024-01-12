<template>
  <div class="home_header_container">
    <!-- <triange /> -->
    <!-- <div class="card">Terraria</div> -->
    <div class="cam_style">
      <div class="cam_one">
        <cam :src="imgList" :number="0" />
        <cam :src="imgList" :number="1" />
        <cam :src="imgList" :number="2" />
        <cam :src="imgList" :number="3" />
        <cam :src="imgList" :number="4" />
      </div>
      <div class="cam_two">
        <cam :src="imgList" :number="5" />
        <cam :src="imgList" :number="6" />
        <cam :src="imgList" :number="7" />
        <cam :src="imgList" :number="8" />
        <cam :src="imgList" :number="9" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" scoped>
import { onMounted } from "vue";
import HomeStore from "@/store/modules/home";
// import triange from "./triange.vue";
import cam from "./cam/index.vue";

let useHomeStore = HomeStore();
let imgList = useHomeStore.imageArray;

onMounted(() => {
  useHomeStore.getAllImagesFromFolder();
});
</script>

<style scoped lang="scss">
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}
.home_header_container {
  display: flex;

  .card {
    background: #191c29;
    height: 18vh;
    width: 12vh;
    padding: 3px;
    position: relative;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    font-size: 1.5em;
    color: rgb(88 199 250 / 0%);
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    margin-left: 3rem;
  }
  .card:hover {
    color: rgb(88 199 250 / 100%);
    transition: color 1s;
  }
  .card:hover::before,
  .card:hover:after {
    animation: none;
    opacity: 0;
  }
  .card::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(
      var(--rotate),
      #5ddcff,
      #3c67e3 43%,
      #4e00c2
    );
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 2.5s linear infinite;
  }
  .card::after {
    position: absolute;
    content: "";
    top: calc(var(height) / 6);
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(var(height) / 6));
    background-image: linear-gradient(
      var(--rotate),
      #5ddcff,
      #3c67e3 43%,
      #4e00c2
    );
    opacity: 1;
    transition: opacity 0.5s;
    animation: spin 2.5s linear infinite;
  }
  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }
  .cam_style {
    margin: 0 2rem;
    display: flex;
    flex-wrap: wrap;
    .cam_one {
      display: flex;
    }
    .cam_two {
      display: flex;
    }
  }
}
</style>
