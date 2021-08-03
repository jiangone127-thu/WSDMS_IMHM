<template>
  <div class="full fullRight">
    <div class="fire_title"></div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con OptimizationView">
      <div class="Optimization zkb_scrollbar">
        <el-form ref="form" :model="Opt" label-width="100px">

          <el-form-item label="场景ID" prop="sceneId">
            <el-input v-model="Opt.sceneId"></el-input>
          </el-form-item>
          <el-form-item label="场景名称" prop="sceneName">
            <el-input v-model="Opt.sceneName"></el-input>
          </el-form-item>
          <el-form-item label="灾害坐标" prop="accidentRoad">
            <el-input v-model="Opt.accidentRoad"></el-input>
            <!-- <button @click="location">定位</button> -->
          </el-form-item>
          <el-form-item label="灾害方向" prop="accidentDirection">
            <el-input v-model="Opt.accidentDirection"></el-input>
          </el-form-item>
          <el-form-item label="占用车道数" prop="laneNum">
            <el-input v-model="Opt.laneNum"></el-input>
          </el-form-item>
          <el-form-item label="降雨量mm" prop="rainfall">
            <el-input v-model="Opt.rainfall"></el-input>
          </el-form-item>
          <el-form-item label="能见度km" prop="visibility">
            <el-input v-model="Opt.visibility"></el-input>
          </el-form-item>

        </el-form>
        <div class="bottom_btn">
          <div class="btn_item" @click="submit">执行模拟</div>
        </div>
        <div class="bottom_hide_btn">
          <div class="hide_btn" v-show="showMin" @click="fivetimer" style="flex:4">5min</div>
          <div class="hide_btn" v-show="showMin" @click="tentimer" style="flex:4">10min</div>
          <div class="hide_btn" v-show="showMin" @click="fiveteentimer" style="flex:4">15min</div>
          <div class="hide_btn" v-show="showMin" @click="twentytimer" style="flex:4">20min</div>
          <div class="hide_btn" v-show="showMin" @click="twentyFivetimer" style="flex:4">25min</div>
          <div class="hide_btn" v-show="showMin" @click="thirtytimer" style="flex:4">30min</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

interface opt {
  // sceneId: string | number;
  // accidentRoad: [] | string | object;
  [key: string]: any;
}

@Component({
  name: "Optimization",
  components: {},
})
export default class Optimization extends Vue {
  private Opt: opt = {
    sceneId: "D858E34DB3034f3484238EFFBF9BEA11", // 场景ID
    sceneName: "Tsinghua",
    accidentRoad: "113.9732109 ,22.587991013",
    accidentDirection: 1,
    laneNum: 1,
    rainfall: 5,
    visibility: 1,
  };
  private Coords: any;
  private flag: boolean = false;
  private showMin: boolean = false;

  @Prop() private defaultData?: any;

  private mounted() {
    if (this.defaultData) {
      this.Opt = this.defaultData;
    }
  }
  private fivetimer() {
    this.$Bus.$emit("timer", "five");
  }
  private tentimer() {
    this.$Bus.$emit("timer", "ten");
  }
  private fiveteentimer() {
    this.$Bus.$emit("timer", "fifteen");
  }
  private twentytimer() {
    this.$Bus.$emit("timer", "twenty");
  }
  private twentyFivetimer() {
    this.$Bus.$emit("timer", "twentyFive");
  }
  private thirtytimer() {
    this.$Bus.$emit("timer", "thirty");
  }

  // 取消
  private empty() {
    (this.$refs["form"] as any).resetFields();
  }

  // 提交
  private submit() {
    let data: any = {
      IncidentID: this.Opt.sceneId, // 场景ID
      sceneName: this.Opt.sceneName,
      Direction: this.Opt.accidentDirection,
      Occupation: this.Opt.laneNum,
      Rain: this.Opt.rainfall,
      Fog: this.Opt.visibility,
    };
    this.$Bus.$emit("simulationTraffic", data);
    this.$Bus.$emit("setCenter",{longitude:113.9539208000001,latitude:22.583862400000044},14)
    this.showMin = true;
  }
  // 返回
  private goback() {
    let data: any = {
      data: {},
      index: 1,
    };
    this.setIndex(data);
  }
  private location() {
    this.flag = true;
    this.$Bus.$emit("getXY", (res: any) => {
      if (res && this.flag) {
        console.log(res, "获取的坐标");
        this.Opt.accidentRoad = res[0] + " ," + res[1];
        this.flag = false;
      }
    });
  }

  @Emit("setPanelView")
  private setIndex(data: any) {
    return data;
  }
}
</script>
<style lang="less" scoped>
@img: "../../../assets/img";
.fire_title {
  background: url(~"@{img}/view/traffic.png") no-repeat center left;
}
.OptimizationView {
  padding: 0 22px 25px 12px;
  .Optimization {
    width: 100%;
    height: 100%;
  }
  /deep/ .el-form {
    margin-right: 10px;
    .el-form-item__label {
      color: #0ff !important;
      font-size: 16px;
    }
    input {
      background: #001d59;
      border-color: #00647e !important;
      color: #0ff;
      font-size: 16px;
    }
  }
  .formTitle {
    font-weight: 700;
    color: #67e8fe;
    font-size: 18px;
    text-align: left;
    line-height: 30px;
  }
  .bottom_btn {
    display: flex;
    justify-content: space-around;
    height: 60px;
    align-items: center;
    margin-top: -15px;
    margin-bottom: 10px;
    color: #0ff;
    .btn_item {
      width: 132px;
      height: 42px;
      background: url(~"@{img}/model/nor.png") no-repeat center center;
      background-size: 132px 42px;
      line-height: 47px;
      font-size: 16px;
      cursor: pointer;
      &:hover,
      &:active {
        background: url(~"@{img}/model/sel.png") no-repeat center center;
        background-size: 132px 42px;
      }
    }
  }
  .bottom_hide_btn{
    display: flex;
    justify-content: space-around;
    height: 30px;
    align-items: center;
    color:white;
    color: #0ff;
    .hide_btn {
      width: 55px;
      height: 30px;
      background: url(~"@{img}/model/nor.png") no-repeat center center;
      background-size: 55px 30px;
      line-height: 30px;
      font-size: 16px;
      cursor: pointer;
      &:hover,
      &:active {
        background: url(~"@{img}/model/sel.png") no-repeat center center;
        background-size: 55px 30px;
      }
    }
  }
}
.minInput {
  width: 200px !important;
  left: 0;
  position: absolute;
  top: 0;
}
.minInput_h {
  left: 220px;
  position: absolute;
  top: 0;
}
</style>
