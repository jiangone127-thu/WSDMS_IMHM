<template>
  <div class="fireView">
    <header @click="$router.push('/homeEN')">

    </header>
    <div class="main">
      <div class="main_left">
        <gisMain></gisMain>
      </div>
      <div class="main_right">
        <div class="right_top bottom_light" :class="{lang:rightTopIndex>0}" v-show="rightTopIndex>0">
          <extract :defaultData="data.textarea" @setPanelView="setPanelView" v-if="rightTopIndex===1"></extract>
          <chain :defaultData="data.chain" @setPanelView="setPanelView" v-if="rightTopIndex===2"></chain>
          <Physical :defaultData="data.Physical" @setPanelView="setPanelView" v-if="rightTopIndex===3"></Physical>
          <Optimization :defaultData="data.Optimization" @setPanelView="setPanelView" v-if="rightTopIndex===4"></Optimization>
        </div>

        <div class="right_bottom bottom_light" :class="{lang:rightTopIndex<0}" v-show="rightTopIndex ===-1">
          <DisStat :defaultData="data.Physical" @setPanelView="setPanelView"></DisStat>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import gisMain from "@/components/common/GisMain.vue";
import DisStat from "@/views/theme/fireassembly/fireassembly_EN/DisasterStatistics_EN.vue";
import extract from "@/views/theme/fireassembly/fireassembly_EN/extract_EN.vue"; // 应急语义提取
import chain from "@/views/theme/fireassembly/fireassembly_EN/chain_EN.vue"; // 逻辑链
import Physical from "@/views/theme/fireassembly/fireassembly_EN/Physical_EN.vue"; // 物理链
import Optimization from "@/views/theme/fireassembly/fireassembly_EN/Optimization_EN.vue";
@Component({
  name: "fireView",
  components: {
    gisMain,
    DisStat,
    extract,
    chain,
    Physical,
    Optimization,
  },
})
export default class fireView extends Vue {
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
@img: "../../../../assets/img/fireView";
.fireView {
  width: 1920px;
  height: 1080px;
  background: url(~"@{img}/fireView_bg.png") no-repeat center;
  background-size: 100% 100%;
  header {
    height: 160px;
    width: 100%;

    background: url(~"../../../../assets/img/home/header.png") no-repeat center top;
    background-size: 100% 100%;
    // background-size: 1911px 260px;
    line-height: 110px;
    font-size: 36px;
  }
  .main {
    height: 926px;
    padding: 0 40px;
    display: flex;
    margin-top:-30px;
    .main_left {
      margin-right: 35px;
      width: 1294px;
      height: 910px;
      padding: 5px;

      background: url(~"@{img}/map_bg.png") no-repeat -1px -1px;
      background-size: 1306px 923px;
    }
    .main_right {
      flex: 1;
      .right_top {
        width: 100%;
        height: 320px;
        // border: 1px solid #1875ec;
        margin-bottom: 16px;
      }
      .right_bottom {
        height: 580px;
        width: 100%;
        // border: 1px solid #1875ec;
      }
      .bottom_light {
        background: url(~"@{img}/bottom_light.png") no-repeat center bottom;
        background-size: 324px 46px;
      }

      .lang {
        height: 816px;
      }
    }
  }
}
</style>
<style lang="less">
@img: "../../../../assets/img/fireView";
.full {
  width: 100%;
  height: 100%;
  position: relative;
}
.main_left {
  background: url("../../../../assets/img/view/fullleft.png") no-repeat -1px -1px !important;
  background-size: 100% 100% !important;
  box-sizing: border-box !important;
  padding: 57px 50px !important;
}
.main_right {
  background: url("../../../../assets/img/view/fullRight.png") no-repeat center;
  background-size: 107%;
  padding: 38px;
}
.fire_title {
  height: 60px;
  line-height: 60px;
  color: #0ff;
  font-size: 21px;
  font-weight: 800;
  display: flex;
  align-items: center;
  padding: 0 20px;
  // &::before {
  //   content: "";
  //   width: 19px;
  //   height: 17px;
  //   background-size: 100% 100%;
  //   margin-right: 10px;
  //   background: url(~"@{img}/title_right.png") no-repeat center bottom;
  // }
  // &::after {
  //   content: "";
  //   width: 19px;
  //   height: 17px;
  //   background-size: 100% 100%;
  //   margin-left: 10px;
  //   background: url(~"@{img}/title_left.png") no-repeat center bottom;
  // }
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