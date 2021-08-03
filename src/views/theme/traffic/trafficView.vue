<template>
  <div class="fireView">
    <div @click="$router.push('/home')" class="topclass topbar"></div>
    <div class="main">
      <gisMain></gisMain>
    </div>
    <div class="main_right">
      <div class="main_right_top">
        <Optimization
          :defaultData="data.Optimization"
          @setPanelView="setPanelView"
        ></Optimization>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import gisMain from "@/components/common/GisMain.vue";
import Optimization from "@/views/theme/traffic/Optimization.vue";
@Component({
  name: "trafficView",
  components: {
    gisMain,
    Optimization,
  },
})
export default class trafficView extends Vue {
  private rightTopIndex: any = 1;
  private data: any = {};

  private setPanelView(res: any) {
    console.log(res, "数据");
    this.data = { ...this.data, ...res.data };
    this.rightTopIndex = res.index;
  }
}
</script>
<style lang="less" scoped>
@img: "../../../assets/img/model";
.vdr.active:before {
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: 0px;
}
.fireView {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: 100% 100%;

  .topclass {
    z-index: 100;
  }
  .topbar {
    height: 160px;
    width: 100%;
    position: absolute;
    top: 0;
    background: url(~"@{img}/model_topTitle_bg.png") 50% center / 100% 100%
      no-repeat;
    line-height: 110px;
    font-size: 36px;
  }
  .main {
    height: 100%;
    position: relative;
    width: 100%;
  }
  .main_right {
    position: absolute;
    top: 120px;
    right: 5px;
    width: 360px;
    height: 600px;
    background: url("../../../assets/img/view/fullRight.png") no-repeat center;
    background-size: 95%;
    padding: 38px;
    .main_right_top {
      width: 100%;
      height: 620px;
      margin-bottom: 16px;
    }
    .main_right_bottom {
      height: 580px;
      width: 100%;
      border: 1px solid #1875ec;
    }
    .drag_main_bottom_light {
      background: url(~"@{img}/bottom_light.png") no-repeat center bottom;
      background-size: 324px 46px;
    }
    .lang {
      height: 627px;
    }
  }
  .fireView_bottom {
    position: absolute;
    bottom: 50px;
    left: 80px;
    width: 540px;
    height: 50px;
  }
}
</style>
<style lang="less">
@img: "../../../assets/img/model";
.full {
  width: 100%;
  height: 100%;
  position: relative;
}
.fire_top {
  height: 50px;
  //background: url(~"@{img}/disaster_model_serve.png") no-repeat left;
}
.fire_title {
  height: 60px;
  line-height: 60px;
  color: #0ff;
  font-size: 19px;
  font-weight: 800;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.fire_con {
  width: 100%;
  height: calc(100% - 60px);
  box-sizing: border-box;
}
.goback {
  width: 79px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: url(~"@{img}/goback-nor.png") no-repeat center bottom;
  background-size: 100% 100%;
  &:hover {
    background: url(~"@{img}/goback.png") no-repeat center bottom;
    background-size: 100% 100%;
  }
}

.zkb_scrollbar {
  overflow-y: auto;
  /* 设置滚动条的样式 */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #a6d2df;
    border-radius: 4px;
    cursor: pointer;
  }

  /* 滚动槽 */
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    cursor: pointer;
  }

  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #3776c1;
    cursor: pointer;
  }
}
</style>