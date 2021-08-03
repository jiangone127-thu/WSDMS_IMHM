<template>
  <div class="full fullRight">
    <div class="fire_title"></div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con OptimizationView">
      <div class="Optimization zkb_scrollbar">
        <el-form ref="form" :model="Opt" label-width="100px">

          <el-form-item label="起火坐标" prop="coordinate">
            <el-input v-model="Opt.coordinate"></el-input>
          </el-form-item>
          <el-form-item label="起始时间">
            <el-date-picker v-model="Opt.startTime" type="datetime"></el-date-picker>
          </el-form-item>
          <div class="lineTow">
            <el-form-item label="分析时长">
              <el-input-number v-model="Opt.duration" controls-position="right" @change="handleChange" :min="1" :max="24"></el-input-number>
            </el-form-item>
            <el-form-item label="分析刻度">
              <el-input-number v-model="Opt.scale" controls-position="right" @change="handleChange" :min="1" :max="24"></el-input-number>
            </el-form-item>
          </div>
          <el-form-item label="风速m/s" prop="seep">
            <el-input v-model="Opt.seep"></el-input>
          </el-form-item>
          <el-form-item label="风向角度" prop="direction">
            <el-input v-model="Opt.direction"></el-input>
          </el-form-item>
          <el-form-item label="大气温度" prop="temperature">
            <el-input v-model="Opt.temperature"></el-input>
          </el-form-item>
          <el-form-item label="大气湿度" prop="humidity">
            <el-input v-model="Opt.humidity"></el-input>
          </el-form-item>

        </el-form>
        <div class="bottom_btn">
          <div class="btn_item" @click="location">定位</div>
          <div class="btn_item" @click="submit">执行模拟</div>
          <div class="btn_item" @click="stop">停止</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { szFireModelServe } from "@/api/installServer";
//import { modulePath } from "@/config";

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
    coordinate: "", //
    seep: "1.4",
    direction: "45",
    temperature: "22.3",
    humidity: "21",
    startTime: "",
    duration: "24",
    scale: "1",
  };
  private Coords: any;
  private flag: boolean = false;
  private modelAnalysisDatas: any = [];
  private coordinates: any = [];
  private timer: any;

  @Prop() private defaultData?: any;

  private mounted() {
    if (this.defaultData) {
      this.Opt = this.defaultData;
    }
    this.$Bus.$on("clearAll", () => {
      clearInterval(this.timer);
    });
  }

  // 取消
  private empty() {
    (this.$refs["form"] as any).resetFields();
  }

  // 提交
  private submit() {
    clearInterval(this.timer);
    const analysisParam = {
      windSpeed: eval(this.Opt.seep),
      windDirection: eval(this.Opt.direction),
      temperature: eval(this.Opt.temperature),
      humidity: eval(this.Opt.humidity),
      lat: this.coordinates[1],
      lon: this.coordinates[0],
      beginTime: this.Opt.startTime,
      timeInterval: this.Opt.scale * 60,
      timeIntervalUnit: "minute",
      timeLen: this.Opt.duration,
      timeLengthUnit: "hour",
      //windParam: JSON.stringify(this.windFarmsList),
      //windSpeed: 1.4,
      //windDirection: 45,
      //temperature: 23.8,
      //humidity: 21.5,
      //lat: 22.73307070179996,
      //lon: 112.62842729128491,
      //beginTime: '2019-12-05 00:00:00',
      //timeInterval: 60,
      //timeIntervalUnit: "minute",
      //timeLen: 24,
      //timeLengthUnit: "hour",
      //windParam: JSON.stringify([{"startTime":"2020-10-23 09:00:00","endTime":"2020-10-23 11:00:00","windDrection":"东北","windSpeedNum":1.4,"width":8.333333333333332,"positionLeft":20437.5,"windLast":7200}]),
    };
    this.$Bus.$emit("FireModel", analysisParam);
  }
  private stop() {
    this.$Bus.$emit("clearInterval")
    //clearInterval(this.timer);
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
        this.coordinates = res;
        this.Opt.coordinate = res[0] + " ," + res[1];
        this.flag = false;
      }
    });
  }
  private handleChange(value) {}

  @Emit("setPanelView")
  private setIndex(data: any) {
    return data;
  }
}
</script>
<style lang="less" scoped>
@img: "../../../assets/img";
.fire_title {
  background: url(~"@{img}/view/fire.png") no-repeat center left;
}
.OptimizationView {
  padding: 0 8px 15px 12px;
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
    height: 75px;
    align-items: center;
    .btn_item {
      width: 100px;
      height: 42px;
      background: url(~"@{img}/model/nor.png") no-repeat center center;
      background-size: 100px 42px;
      line-height: 42px;
      font-size: 16px;
      cursor: pointer;
      color: #0ff;
      &:hover,
      &:active {
        background: url(~"@{img}/model/sel.png") no-repeat center center;
        background-size: 100px 42px;
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
.lineSecen {
  /deep/.el-date-editor.el-input,
  /deep/.el-date-editor.el-input__inner {
    width: 467px;
  }
}
</style>
