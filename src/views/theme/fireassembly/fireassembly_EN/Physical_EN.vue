<template>
  <div class="full">
    <div class="fire_title">DMSC orchestration and optimization</div>
    <div class="min-title">Step-3 optimize the physical chain</div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con PhysicalView">
      <div class="min-title titles">The logical chain</div>
      <div class="chainEcharts" ref="chainEcharts" id="chainEcharts"></div>
      <div class="min-title titles">Candidate physical chains</div>
      <div class="Physical zkb_scrollbar">
        <el-table :data="tableData" border ref="multipleTable" :span-method="arraySpanMethod">
          <el-table-column prop="ID" align="center" label="ID" width="40">
          </el-table-column>
          <el-table-column prop="Model" align="center" label="Chain Node" width="110">
          </el-table-column>
          <el-table-column prop="val1" align="center" label="Top 1" :render-header="renderHeader">
          </el-table-column>
          <el-table-column prop="val2" align="center" label="Top 2" :render-header="renderHeader">
          </el-table-column>
          <el-table-column prop="val3" align="center" label="Top 3" :render-header="renderHeader">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom_btn">
        <div class="btn_item" @click="submit">Next</div>
        <div class="btn_item" @click="goback">Clear</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
@Component({
  name: "Physical",
  components: {},
})
export default class Physical extends Vue {
  private PhysicalData: any = [];
  private activeIdx :any = 0
  private tableData: any = [
    {
      ID: 'A',
      Model: "Earthquake",
      val1: "2",
      val2: "2",
      val3:"2",
    },
    {
      ID: 'B',
      Model: "Landslide",
      val1: "1",
      val2: "1",
      val3:"1",
    },
    {
      ID: 'C',
      Model: "Traffic congestion",
      val1: "2",
      val2: "2",
      val3:"2",
    },
    {
      ID: 'D',
      Model: "Fire",
      val1: "1",
      val2: "1",
      val3:"1",
    },
    {
      ID: 'E',
      Model: "Hazardous Chemicals",
      val1: "3",
      val2: "2",
      val3:"3",
    },
    {
      ID: 'F',
      Model: "Water pollutiont",
      val1: "3",
      val2: "3",
      val3:"2",
    },
    {
      ID: '',
      Model: "QoS Value",
      val1: "0.87",
      val2: "0.81",
      val3:"0.75",
    },
  ];
  @Prop() private defaultData?: any;
  private nameData: any = [
    {
      name: "A",
      x: 50,
      y: 50,
      symbolSize: 50,
      cilckShow: false,
    },
    {
      name: "B",
      x: 100,
      y: 50,
      symbolSize: 50,
      cilckShow: false,
    },
    {
      name: "C",
      x: 150,
      y: 50,
      symbolSize: 50,
      cilckShow: false,
    },
    {
      name: "D",
      x: 200,
      y: 50,
      symbolSize: 50,
      cilckShow: false,
    },
    {
      name: "E",
      x: 250,
      y: 50,
      symbolSize: 50,
      cilckShow: false,
    },
    {
      name: "F",
      x: 300,
      y: 50,
      symbolSize: 50,
      cilckShow: false,
    },
  ];
  private linksDate: any = [
    {
      source: "A",
      target: "B",
    },
    {
      source: "B",
      target: "C",
    },
    {
      source: "C",
      target: "D",
    },
    {
      source: "D",
      target: "E",
    },
    {
      source: "E",
      target: "F",
    },
    {
      source: "B",
      target: "E",
      lineStyle: {
        curveness: 0.5
      }
    }
  ];
  private mounted() {
    if (this.defaultData) {
      // this.PhysicalData = this.defaultData;
      console.log(this.PhysicalData,11111);
    }
    setTimeout(() => {
      this.initEcharts();
    }, 500);
  }
  private renderHeader(h, { column, $index }) {
    return h('span', [
      h('span', column.label),
      h('span', {
        class: $index === this.activeIdx ? 'radioBox_active' : 'radioBox',
        on: {
          click: () => {
            this.getTableData(column,$index)
          }
        }
      })
    ])
  }
  // 表格合并
  private arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    if (rowIndex === 6) {
      if (columnIndex === 0) {
        return [0, 0];
      } else if (columnIndex === 1) {
        return [1, 2];
      }
    }
  }
  // 表格选中数据处理
  private getTableData(data,index){
    this.PhysicalData = []
    this.activeIdx = index
    this.tableData.forEach((item,idx)=>{
      let obj:Object = {}
      obj['ID'] = item['ID']
      obj['Model'] = item['Model']
      obj['val'] = item[data.property]
      this.PhysicalData.push(obj)
    })
  }
  private initEcharts() {
    let self: any = this;
    const Chart = self.$echarts.init(
      this.$refs.chainEcharts as HTMLCanvasElement
    );
    const option: any = {
      series: [
        {
          type: "graph",
          layout: "none",
          symbol: "circle",
          label: {
            show: true,
            color: "#000",
            fontSize: 16,
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 10],
          itemStyle: {
            color: "#aac6ee",
            borderColor: "#1b76eb",
          },

          force: {
            edgeLength: 10,
          },
          data: self.nameData,
          links: self.linksDate,
          lineStyle: {
            opacity: 0.9,
            color: "#fff",
            width: 2,
            curveness: 0,
          },
        },
      ],
    };
    Chart.setOption(option, true);
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
.titles{
  line-height: 40px;
  text-align: center;
}
.PhysicalView {
  padding: 0 22px 25px 12px;
  margin-top: 10px;
  .chainEcharts {
    width: 100%;
    height: 15%;
  }
  .Physical {
    width: 100%;
    /deep/ .el-table {
      width: 100% !important;
      background: transparent !important;
      color: #eee !important;
      .cell{
        word-break: break-word;
      }
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
