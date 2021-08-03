<template>
  <div class="full">
    <div class="fire_title">物理链优选</div>
    <div class="goback" @click="goback">返回</div>
    <div class="fire_con PhysicalView">
      <div class="Physical zkb_scrollbar">
        <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column label="排序" width="60">
            <template slot-scope="scope">{{ scope.row.index }}</template>
          </el-table-column>
          <el-table-column prop="eaModel" label="地震模型" width="80">
          </el-table-column>
          <el-table-column prop="laModel" label="滑坡模型" width="80">
          </el-table-column>
          <el-table-column prop="FireModel" label="火灾模型" width="80">
          </el-table-column>
          <el-table-column prop="trafficModel" label="交通模型" width="80">
          </el-table-column>
          <el-table-column prop="Qos" label="Qos值" width="100">
          </el-table-column>
          <el-table-column type="selection" width="60">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom_btn">
        <div class="btn_item" @click="submit">启动</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "Physical",
  components: {},
})
export default class Physical extends Vue {
  private PhysicalData: any = [];
  private tableData: any = [
    {
      index: 1,
      eaModel: "烈度预测",
      laModel: "经验模型",
      FireModel: "元胞模型",
      trafficModel:"微观模型",
      Qos: 129.3,
    },
    {
      index: 2,
      eaModel: "烈度预测",
      laModel: "物理模型",
      FireModel: "元胞模型",
      trafficModel:"宏观模型",
      Qos: 104.7,
    },

    {
      index: 3,
      eaModel: "烈度预测",
      laModel: "经验模型",
      FireModel: "物理模型",
      trafficModel:"宏观模型",
      Qos: 93.4,
    },
    
  ];
  @Prop() private defaultData?: any;

  private mounted() {
    if (this.defaultData) {
      this.PhysicalData = this.defaultData;
      console.log(this.PhysicalData);
      this.PhysicalData.forEach((row: any) => {
        (this.$refs.multipleTable as any).toggleRowSelection(
          this.tableData[row.index - 1],
          true
        );
      });
    }
  }
  private handleSelectionChange(val: any) {
    this.PhysicalData = val;
  }

  // 提交
  private submit() {
    if (!this.PhysicalData.length) {
      this.$message.warning("请选中至少一条");
      return;
    }
    let data: any = {
      data: {
        Physical: this.PhysicalData,
      },
      index: -1,
    };
    this.$Bus.$emit("FireModel");
    this.$Bus.$emit("getHuapo");
    this.$Bus.$emit("addArea", "After");
    this.$Bus.$emit("addEarthQuake");
    this.$Bus.$emit("simulationTraffic");
    this.$Bus.$emit("clearLayer","fireline");
    this.$Bus.$emit("setCenter",{longitude: 113.64456222627953,latitude: 22.40927072719858},10)
    this.setIndex(data);
  }
  // 返回
  private goback() {
    let data: any = {
      data: {},
      index: 2,
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
.PhysicalView {
  padding: 0 22px 25px 12px;
  .Physical {
    width: 100%;
    height: 90%;

    /deep/ .el-table {
      width: 100% !important;
      background: transparent !important;
      color: #eee !important;
      .el-table__expanded-cell {
        background-color: transparent;
      }
      tr,
      th {
        background: transparent !important;
        color: #eee !important;
        &:hover > td {
          background: transparent !important;
          color: #eee !important;
        }
      }
      /deep/ .el-table__row {
        background: transparent !important;
        color: #eee !important;
      }
      .el-table__header {
        width: 100% !important;
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
