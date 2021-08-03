<template>
  <div class="full fullRight">
    <div class="fire_title"></div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con OptimizationView">
      <div class="Optimization zkb_scrollbar">
        <el-form ref="form" :model="Opt" label-width="100px">
          <el-form-item label="模型名称" prop="modelName">
            <!-- <el-input v-model="Opt.modelName"></el-input> -->
            <el-select
              v-model="Opt.modelName"
              placeholder="请选择"
              popper-class="AddressdisasterSelect"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地震等级" prop="level">
            <el-input v-model="Opt.level"></el-input>
          </el-form-item>
          <el-form-item label="降雨量" prop="rainfall">
            <el-input v-model="Opt.rainfall"></el-input>
          </el-form-item>
          <!-- <el-form-item label="起始时间" >
            <el-date-picker v-model="Opt.startTime" type="datetime"></el-date-picker>
          </el-form-item> -->
        </el-form>
        <div class="bottom_btn">
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
    modelName: "", //
    level: 5,
    rainfall: 40,
    startTime: "",
  };

  @Prop() private defaultData?: any;

  private options: object[] = [
    {
      value: "快速评估法",
      label: "快速评估法",
    },
    {
      value: "Risk_assessment",
      label: "危险性评价",
    },
    {
      value: "瑞典圆弧法",
      label: "瑞典圆弧法",
    },
    {
      value: "滑坡临界预警",
      label: "滑坡临界预警",
    },
    {
      value: "毕晓普法",
      label: "毕晓普法",
    },
  ];

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
    let opts: any = {
      rainfall: this.Opt.rainfall,
      level: this.Opt.level,
      model: this.Opt.modelName,
      //time: this.Opt.startTime
    };
    console.log(opts);
    this.$Bus.$emit(
      "setCenter",
      { longitude: 108.47215331, latitude: 33.32226317 },
      13
    );
    this.$Bus.$emit("getHuapo");
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
  /deep/ .el-select {
    width: 100%;
  }
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
    input::-webkit-input-placeholder {
      color: #0ff;
    }
    input::-moz-input-placeholder {
      color: #0ff;
    }
    input::-ms-input-placeholder {
      color: #0ff;
    }
  }
  /deep/.el-select {
    .el-input {
      .el-select__caret {
        color: #0ff;
      }
    }
    .el-select-dropdown {
      //border-color: #34d4f8 !important;
      background-color: #0ff !important;
    }
    .el-select-dropdown__item span {
      color: #0ff;
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
      width: 132px;
      height: 42px;
      background: url(~"@{img}/model/nor.png") no-repeat center center;
      background-size: 132px 42px;
      line-height: 42px;
      font-size: 16px;
      color: #0ff;
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
<style lang="less" >
html {
  /deep/.AddressdisasterSelect {
    background-color: #001d59;
    .hover {
      background: #f5f7fa38;
    }
    .el-select-dropdown__item {
      span {
        color: #0ff;
        font-size: 16px;
      }
      &.selected {
        span {
          color: #409eff;
        }
      }
    }
  }
}
</style>
