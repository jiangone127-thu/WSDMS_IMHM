<template>
  <div class="home_main">
    <div class="head"></div>
    <div class="main">
      <div v-for="(item,index) in muenList" :key="index" class='muen_item' :class="item.name" @click="toRouter(item.router)"></div>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({
  name: "homeView",
  components: {},
})
export default class homeView extends Vue {
  private muenList: object[] = [
    {
      name: "shenzhencase",
      router: "/DMCMS",
    },
    {
      name: "foshancase",
      router: "/DMSCOOS",
    },
  ];

  private toRouter(router: string) {
    this.$Bus.$emit("clearAll");
    this.$router.push(router);
  }
}
</script>
<style lang="less" scoped>
@img: "../../assets/img";
.home_main {
  width: 100%;
  height: 100%;
  background: url(~"@{img}/home/bg.png") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .head {
    width: 1606px;
    height: 136px;
    background: url(~"@{img}/home/header.png") no-repeat center;
    background-size: 100% 100%;
    margin-top: 65px;
  }
  .main {
    margin-top: 30px;
    width: 1400px;
    height: 580px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    .muen_item {
      width: 401px;
      height: 513px;
      &.shenzhencase {
        background: url(~"@{img}/home/DMCMS.png") no-repeat -40px -60px;
        background-size: 431px 553px;
      }
      &.foshancase {
        background: url(~"@{img}/home/DMSCOOS.png") no-repeat -40px -60px;
        background-size: 461px 553px;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>