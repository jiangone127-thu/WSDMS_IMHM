<template>
  <div class="popMbk">
    <header @mousedown="movePannel">
      <span>明白卡详情</span>
      <span class="close" @click="close"></span>
    </header>
    <div class="content">
      <div :title="dataInfo.unit"><span class="ort">户主（单位）：</span><span class="unit">{{dataInfo.unit||dataInfo.name}}</span></div>
      <div class="WarningLevel" >
        </div>
      <div><span class="ort">户主（单位）性质：</span><span>{{dataInfo.disasterType}}</span></div>
</div>

    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
//specialDataServer
@Component({
  name: "PopMbk",
  components: {
  }
})
export default class PopMbk extends Vue {
  @Prop({}) private dataInfo?: any;
  private close(){
    this.$Bus.$emit("clearPopup");
  }


}
</script>
<style lang="less" scoped>
.popMbk {
  width: 490px;
  height: 410px;
  background: url("../../assets/img/mbk_c.png") no-repeat center
    center;
  background-size: 100% 100%;
  padding: 18px 20px 34px 20px;
  header {
    height: 34px;
    position: relative;
    line-height: 34px;
    padding-left: 12px;
  }
  .close {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url("../../assets/img/icon_close.png")
      no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
  }
  .content {
    width: 100%;
    margin-top: 10px;
    height: calc(100% - 44px);
    display: flex;
    flex-direction: column;
    > div {
      // padding: 14px 16px 14px 26px;
      padding-left: 26px;

      line-height: 20px;
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      &.arr {
        height: 40px;
        align-items: flex-start;
      }
      .arr_conten {
        width: calc(100% - 80px);
      }
      .ort {
        min-width: 60px;
      }
    }
    > div {
      p {
        flex: 1;
        width: 50%;
      }
    }
    .anzd_box {
      margin-bottom: 10px;
    }
  }
}
.ort {
  min-width: 80px;
}
.ort::before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 4px;
  height: 20px;
  margin-right: 10px;
  background-color: sandybrown;
}
.orange_text {
  // color: orange;
}
.azdw {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  width: 14px;
  height: 18px;
  background: url("../../assets/img/azdw.png") no-repeat center
    center;
  background-size: 100% 100%;
}
.WarningLevel {
  // position: absolute;
  // top: 68px;
  // right: 44px;
  width: 200px;
  height: 38px;
  display: flex;
  // justify-content: space-around;
  img {
    width: 45px;
    height: 38px;
    margin-right: 5px;
  }
}
.call {
  img {
    cursor: pointer;
  }
  .callTel {
    cursor: pointer;
  }
}
</style>
