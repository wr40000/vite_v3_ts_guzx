<template>
  <div>
    <template v-for="(item, index) in menuList" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item v-if="item.meta.hidden" 
            :index="item.path" @click="goRoute">
          <!-- <el-menu-item v-if="!item.children" :index="item.path"> -->
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-if="item.children[0].meta.hidden"
          :index="item.children[0].path"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- <span>{{ item.meta.title }}</span> -->
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
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

//传过来的数据申明接收，不然用不了
defineProps(["menuList"]);

let $router = useRouter();
const goRoute=(vc:any)=>{
    console.log(vc.index);  
    $router.push(vc.index);
}
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>

<style scoped lang="scss">
/* 深选择器：如果相对设置了scoped的子组件里的元素进行控制可以使用'>>>'或者'deep'设置选中或悬浮的颜色*/
// .el-submenu /deep/ .el-submenu__title {
//     height: 50px;
//     line-height: 50px ;
//   }
// .el-submenu__title{
//   font-size: 1.8em !important;
// }
span,
.el-menu-item,
.el-sub-menu {
  font-size: 1rem;
}

</style>
