<template>
  <div class="full">
    <div class="fire_title">DMSC orchestration and optimization</div>
    <div class="min-title">Step-1 disaster keyword extraction</div>
    <div class="fire_con extractView">
      <div class="extractTextarea">
        <el-scrollbar style="height:100%;width: 100%;">
          <el-input type="textarea" prefix-icon="el-icon-edit" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </el-scrollbar>
      </div>
      <div class="bottom_btn">
        <!-- <div class="btn_item" @click="VoiceInput">语音输入</div> -->
        <div class="btn_item" @click="submit">Next</div>
        <div class="btn_item" @click="empty">Clear</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "extract",
  components: {},
})
export default class extract extends Vue {
  private textarea: any = "April 9, 2021, 10:30 am, clear sky, temperature 25°C, humidity 30%, south wind 3m/s. A magnitude 3 earthquake occurred near the Pearl River Ancient Fort site in Guangdong Province, with coordinates 113.64456, 22.40927, and source depth 5 km. Here, we request the disaster simulation of the affected area."
    // "2020年6月25号早上9点，广东省珠江古炮台遗迹附近经度：113.64456222，纬度22.4092707处发生6级地震，请求在5分钟时间内模拟1小时后的灾情情况。";
  @Prop() private defaultData?: any;

  private mounted() {
    if (this.defaultData) {
      this.textarea = this.defaultData;
    }
  }
  // 语音输入
  private VoiceInput() {
    console.log("语音输入");
  }
  // 清空输入
  private empty() {
    this.textarea = "";
  }
  // 提交
  private submit() {
    if (!this.textarea) {
      this.$message.warning("请输入内容");
      return;
    }
    let data: any = {
      data: {
        textarea: this.textarea,
      },
      index: 2,
    };
    this.setIndex(data);
    let datas: any = [];
    datas.push({
      longitude: 113.97293464,
      latitude:22.5880109,
      id: "center",
      tag: "null",
      symbol: "",
      type: "",
    });
    this.$Bus.$emit("focus", datas, 15);
    this.$Bus.$emit("addArea", "Before");
  }

  @Emit("setPanelView")
  private setIndex(data: any) {
    return data;
  }
}
</script>
<style lang="less" scoped>
@img: "../../../../assets/img/fireView";
.fire_title {
  background: url(~"@{img}/studyJudge/smalltitle.png") no-repeat bottom left;
  height: 50px;
  font-size: 18px !important;
  margin: 10px 0;
  padding: 0px 5px;
}
.min-title{
  font-size: 18px;
  text-align: left;
  padding: 0 5px;
}
.extractView {
  padding: 0 22px 25px 12px;
  margin-top: 15px;
  .extractTextarea {
    width: 100%;
    height: 250px;
    /deep/.el-scrollbar__wrap{
      height: calc(100% + 19px);
      width: calc(100% + 34px);
    }
    /deep/.el-scrollbar__view{
      height: 100%;
    }
    /deep/ .el-textarea {
      width: 100%;
      height: 100%;
      word-wrap: break-word;
      white-space: normal;
      word-break: break-all;
      textarea {
        width: 100%;
        height: 100%;
        min-height: 100%;
        max-height: 100%;
        background: #001d59;
        border: none;
        color: #fff;
        font-size: 20px;
        
      }
    }
  }
  .bottom_btn {
    display: flex;
    justify-content: space-around;
    height: 75px;
    align-items: center;
    .btn_item {
      width: 112px;
      height: 47px;
      background-size: 112px 47px;
      background: url(~"@{img}/nor.png") no-repeat center center;
      color: #0ff;
      line-height: 47px;
      font-size: 16px;
      cursor: pointer;
      &:hover,
      &:active {
        background: url(~"@{img}/sel.png") no-repeat center center;
        background-size: 112px 47px;
        color: #ffe236;
      }
    }
  }
}
</style>
