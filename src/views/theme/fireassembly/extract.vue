<template>
  <div class="full">
    <div class="fire_title">应急语义提取</div>
    <div class="fire_con extractView">
      <div class="extractTextarea">
        <el-input type="textarea" prefix-icon="el-icon-edit" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </div>
      <div class="bottom_btn">
        <div class="btn_item" @click="VoiceInput">语音输入</div>
        <div class="btn_item" @click="empty">清空输入</div>
        <div class="btn_item" @click="submit">提交请求</div>
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
  private textarea: any =
    "2020年6月25号早上9点，广东省珠江古炮台遗迹附近经度：113.64456222，纬度22.4092707处发生6级地震，请求在5分钟时间内模拟1小时后的灾情情况。";
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
@img: "../../../assets/img";
.extractView {
  padding: 0 22px 25px 12px;
  .extractTextarea {
    width: 100%;
    height: 480px;

    /deep/ .el-textarea {
      width: 100%;
      height: 100%;
      textarea {
        width: 100%;
        height: 100%;
        min-height: 100%;
        max-height: 100%;
        background: #001d59;
        border: none;
        color: #0ff;
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
      width: 102px;
      height: 47px;
      background-size: 102px 47px;
      background: url(~"@{img}/model/nor.png") no-repeat center center;
      background-size: 102px 47px;
      color: #0ff;
      line-height: 47px;
      font-size: 16px;
      cursor: pointer;
      &:hover,
      &:active {
        background: url(~"@{img}/model/sel.png") no-repeat center center;
        background-size: 102px 47px;
        color: #ffe236;
      }
    }
  }
}
</style>
