<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="route.meta.keepAlive"></component>
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive"></component>
  </router-view>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif,
    "PingFangSC-Regular";
}
ul {
  list-style: none;
}
.single-ellipsis{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.mutiple-ellipsis{

}
</style>
