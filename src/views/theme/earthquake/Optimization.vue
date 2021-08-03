<template>
  <div class="full fullRight">
    <div class="fire_title"></div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con OptimizationView">
      <div class="Optimization zkb_scrollbar">
        <el-form ref="form" :model="Opt" label-width="100px">

          <el-form-item label="地震坐标" prop="coordinate">
            <el-input v-model="Opt.coordinate"></el-input>
          </el-form-item>
          <el-form-item label="地震等级" prop="level">
            <el-input v-model="Opt.level"></el-input>
          </el-form-item>
          <el-form-item label="破裂方向" prop="direction">
            <el-input v-model="Opt.direction"></el-input>
          </el-form-item>
          <el-form-item label="震源深度" prop="depth">
            <el-input v-model="Opt.depth"></el-input>
          </el-form-item>
          <el-form-item label="裂度尺度" prop="scale">
            <el-input v-model="Opt.scale"></el-input>
          </el-form-item>
        </el-form>
        <div class="bottom_btn">
          <div class="btn_item" @click="location">定位</div>
          <div class="btn_item" @click="submit">执行模拟</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { disasterServer, gisServer } from "@/api/installServer";

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
    coordinate: "",
    level: "6",
    direction: "30",
    depth: "12",
    scale: "",
  };
  private Coords: any;
  private flag: boolean = false;
  @Prop() private defaultData?: any;

  private mounted() {
    if (this.defaultData) {
      this.Opt = this.defaultData;
    }
  }
  private location() {
    this.flag = true;
    this.$Bus.$emit("getXY", (res: any) => {
      if (res && this.flag) {
        console.log(res, "获取的坐标");
        this.Coords = res;
        this.Opt.coordinate = res[0] + " ," + res[1];
        this.flag = false;
      }
    });
  }
  // 取消
  private empty() {
    (this.$refs["form"] as any).resetFields();
  }

  // 提交<magnitude>6</magnitude><angle>30</angle><depth>12</depth>
  private submit() {
    this.$Bus.$emit("clearAll");
    const opts = {
      longitude: this.Coords[0],
      latitude: this.Coords[1],
      magnitude: eval(this.Opt.level),
      angle: eval(this.Opt.direction),
      depth: eval(this.Opt.depth),
    };
    console.log(opts, "opt");
    this.$Bus.$emit("addEarthQuake", opts);
    /* disasterServer.getDizhendata(opts).then((res: any) => {
      let Data = res.data.replace(/\&lt;/g, "<");
      Data = Data.replace(/\&gt;/g, ">");
      console.log(Data, "Data");
      this.getDetial(Data);
    }); */
  }
  private getDetial(Data: any) {
    let lineL: any = [];
    let LineTotol: any = [];
    let data: any = Data.split("<coordinates>");
    for (let i = 1; i < data.length; i++) {
      let simple = data[i].split("</coordinates>");
      lineL.push(simple[0]);
    }
    lineL.forEach((line) => {
      let point = line.split(",0");
      let lineSimp: any = [];
      point.forEach((point) => {
        let simplePlint = point.split(",");
        if (simplePlint[0] && simplePlint[1]) {
          let linePoint = [eval(simplePlint[0]), eval(simplePlint[1])];
          lineSimp.push(linePoint);
        }
      });
      LineTotol.push(lineSimp);
    });
    /* data.forEach(element => {
      let dat= element.split("</coordinates>")
      console.log(dat)
      lineL.push(dat[0])
    }); */
    console.log(LineTotol, "lineTo");
    this.$Bus.$emit("addEarthQuake", LineTotol);
  }
  // 返回
  private goback() {
    let data: any = {
      data: {},
      index: 1,
    };
    this.setIndex(data);
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
  background: url(~"@{img}/view/earthquake.png") no-repeat center left;
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
    height: 75px;
    align-items: center;
    color: #0ff;
    .btn_item {
      width: 132px;
      height: 42px;
      background: url(~"@{img}/model/nor.png") no-repeat center center;
      background-size: 132px 42px;
      line-height: 42px;
      font-size: 16px;
      cursor: pointer;
      &:hover,
      &:active {
        background: url(~"@{img}/model/sel.png") no-repeat center center;
        background-size: 132px 42px;
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
