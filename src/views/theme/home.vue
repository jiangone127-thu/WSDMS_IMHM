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
      name: "traffic",
      router: "/trafficView",
    },
    {
      name: "earthquake",
      router: "/earthquakeView",
    },
    {
      name: "water-logging",
      router: "/waterLoggingView",
    },
    {
      name: "Architecture",
      router: "/ArchitectureView",
    },
    {
      name: "Addressdisaster",
      router: "/Addressdisaster",
    },
    {
      name: "fire",
      router: "/fireModelView",
    },
    {
      name: "shenzhencase",
      router: "/fireView",
    },
    {
      name: "foshancase",
      router: "/fsfireView",
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
    //width: 1406px;
    width:100%;
    height: 160px;
    background: url(~"@{img}/model/model_topTitle_bg.png") no-repeat center;
    background-size: 100% 100%;
  }
  .main {
    margin-top: 30px;
    width: 1400px;
    height: 680px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    cursor: pointer;
    .muen_item {
      width: 285px;
      height: 316px;

      &.traffic {
        background: url(~"@{img}/home/traffic.png") no-repeat -40px -60px;
        background-size: 357px 398px;
      }
      &.earthquake {
        background: url(~"@{img}/home/earthquake.png") no-repeat -50px -60px;
        background-size: 372px 398px;
      }
      &.water-logging {
        background: url(~"@{img}/home/water-logging.png") no-repeat -40px -60px;
        background-size: 385px 398px;
      }
      &.Architecture {
        background: url(~"@{img}/home/Architecture.png") no-repeat -40px -60px;
        background-size: 365px 398px;
      }
      &.Addressdisaster {
        background: url(~"@{img}/home/Addressdisaster.png") no-repeat -40px -60px;
        background-size: 357px 398px;
      }
      &.fire {
        background: url(~"@{img}/home/fire.png") no-repeat -50px -60px;
        background-size: 372px 398px;
      }
      &.shenzhencase {
        background: url(~"@{img}/home/shenzhencase.png") no-repeat -40px -60px;
        background-size: 385px 398px;
      }
      &.foshancase {
        background: url(~"@{img}/home/foshancase.png") no-repeat -40px -60px;
        background-size: 365px 398px;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>