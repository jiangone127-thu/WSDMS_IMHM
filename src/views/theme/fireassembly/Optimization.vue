<template>
  <div class="full fullRight">
    <div class="fire_title">应急语义提取</div>
    <div class="goback" @click="goback">返回</div>
    <div class="fire_con OptimizationView">
      <div class="Optimization zkb_scrollbar">
        <el-form ref="form" :model="Opt" label-width="80px">

          <div class="formTitle">全局参数</div>
          <el-form-item label="发生时间" prop="starttime">
            <el-input v-model="Opt.starttime"></el-input>
          </el-form-item>
          <el-form-item label="模拟时长" prop="Duration">
            <el-input v-model="Opt.Duration" class="minInput"></el-input><span class="minInput_h">h</span>
          </el-form-item>
          <el-form-item label="原生灾害" prop="disasterType">
            <el-input v-model="Opt.disasterType"></el-input>
          </el-form-item>
          <el-form-item label="灾害坐标" prop="disasterCoordinate">
            <el-input v-model="Opt.disasterCoordinate"></el-input>
          </el-form-item>

          <div class="formTitle">地震模型</div>
          <el-form-item label="震源坐标" prop="SourceCoordinate">
            <el-input v-model="Opt.SourceCoordinate"></el-input>
          </el-form-item>
          <el-form-item label="地震等级" prop="SourceLevel">
            <el-input v-model="Opt.SourceLevel"></el-input>
          </el-form-item>
          <el-form-item label="破裂方向" prop="fractureDirection">
            <el-input v-model="Opt.fractureDirection"></el-input>
          </el-form-item>

          <div class="formTitle">滑坡模型</div>
          <el-form-item label="灾害等级" prop="landslideLevel">
            <el-input v-model="Opt.landslideLevel"></el-input>
          </el-form-item>
          <el-form-item label="日降水量" prop="precipitation">
            <el-input v-model="Opt.precipitation"></el-input>
          </el-form-item>

          <div class="formTitle">滑坡模型</div>
          <el-form-item label="建筑垮塌" prop="buildingCollapse">
            <el-input v-model="Opt.buildingCollapse"></el-input>
          </el-form-item>

          <div class="formTitle">火灾模型</div>
          <el-form-item label="火灾模型" prop="fire">
            <el-input v-model="Opt.fire"></el-input>
          </el-form-item>

        </el-form>
        <div class="bottom_btn">
          <div class="btn_item" @click="submit">确认</div>
          <div class="btn_item" @click="empty">取消</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "Optimization",
  components: {},
})
export default class Optimization extends Vue {
  private Opt: any = {
    starttime: "", // 发生时间
    Duration: "", // 模拟时长
    disasterType: "", // 原生灾害
    disasterCoordinate: "", // 灾害坐标
    SourceCoordinate: "", // 震源坐标
    SourceLevel: "", // 地震等级
    fractureDirection: "", //破裂方向
    landslideLevel: "", // 滑坡灾害等级
    precipitation: "", // 降水量
    buildingCollapse: "", // 建筑垮塌
    fire: "",
  };

  @Prop() private defaultData?: any;

  private mounted() {
    if (this.defaultData) {
      this.Opt = this.defaultData;
    }
  }

  // 取消
  private empty() {
    (this.$refs["form"] as any).resetFields();
  }

  // 提交
  private submit() {
    let data: any = {
      data: {},
      index: -1,
    };
    this.setIndex(data);
  }
  // 返回
  private goback() {
    let data: any = {
      data: {
        Optimization: this.Opt,
      },
      index: 3,
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
@img: "../../../assets/img/fireView";
.OptimizationView {
  padding: 0 22px 25px 12px;
  .Optimization {
    width: 100%;
    height: 100%;
  }
  /deep/ .el-form {
    margin-right: 10px;
    .el-form-item__label {
      color: #fff !important;
    }
    input {
      background: #002d44;
      border-color: #00647e !important;
      color: #fff;
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
