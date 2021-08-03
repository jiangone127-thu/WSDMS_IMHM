<template>
  <div class="full">
    <div class="fire_title">灾情统计</div>
    <div class="fire_con StatisticsView">
      <el-scrollbar>
        <lineEchart :chainData="setChainData" v-if="setChainData"></lineEchart>
        <lineEchart :earthquakeData="earthquakeData" v-if="earthquakeData&&earthquakeData.dataX&&earthquakeData.dataX.length>0"></lineEchart>
        <lineEchart :echartDataland="echartDataland"></lineEchart>
        <lineEchart :trafficData="trafficData"></lineEchart>
        <lineEchart :echartData="fireData"></lineEchart>
      </el-scrollbar>
    </div>
    <div class="bottom_btn">
      <div class="btn_item" @click="goback">返回上一页</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import lineEchart from "@/views/theme/fireassembly/lineEchart.vue";
@Component({
  name: "DisasterStatistics",
  components: { lineEchart },
})
export default class DisasterStatistics extends Vue {
  private fireData: any = {};
  private earthquakeData: any = [];
  private trafficData: any = [];
  private showfireEchart: any = false;
  private echartDataland: any = {
    DataX: [],
    DataY: [],
  };

  private setChainData: any = {};
  @Prop() private chainData?: any;

  @Watch("fireData")
  private fireDataChange() {}
  // 返回
  private mounted() {
    if (this.chainData) {
      this.setChainData = {
        linksDate: this.chainData.linksDate,
        nameData: this.chainData.nameData,
      };
    }

    this.$Bus.$on("getFireDetail", (data: any) => {
      console.log(data, "火灾参数");
    });
    this.$Bus.$on("fireData", (data) => {
      this.fireData = data;
    });
    this.$Bus.$on("earthquakeData", (data) => {
      this.earthquakeData = data;
    });
    this.$Bus.$on("trafficData", (data) => {
      this.trafficData = data;
      this.echartDataland = {
        DataX: ["深圳大学城 ", "梧桐山", "  阳台山"],
        DataY: [3, 1, 2],
      };
    });
    this.$Bus.$on("landslideData", (data) => {});
    this.landslideData();
  }
  private goback() {
    let data: any = {
      data: {},
      index: 1,
    };
    this.setIndex(data);
    this.showfireEchart = false;
    this.$Bus.$emit("clearAll");
  }

  private landslideData() {
    const Chart = (this as any).$echarts.init(
      this.$refs.disasterSituationEchart as HTMLCanvasElement
    );
    const option: any = {
      title: {
        show: true,
        text: "不同监测站点的地质滑坡风险预警值",
        x: "center", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        y: "top",
        textStyle: {
          color: "#8aa0c9",
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      grid: {
        left: "6%",
        right: "1%",
        bottom: "3%",
        top: "25%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#02657a",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#8aa0c9",
            },
            interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#8aa0c9",
            },
          },
          data: ["深圳大学城 ", "梧桐山", "  阳台山"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "面积(km²)",
          min: 0,
          axisLine: {
            lineStyle: {
              color: "#8aa0c9",
            },
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
              color: "#02657a",
            },
            show: false, //隐藏或显示
          },
          axisTick: {
            show: true,
          },
        },
      ],
      series: [
        {
          name: "风险值",
          type: "line",
          data: [3, 1, 2],
        },
      ],
    };
    Chart.setOption(option, true);
  }
  @Emit("setPanelView")
  private setIndex(data: any) {
    return data;
  }
}
// export default class DisasterStatistics extends Vue {
//   @Prop() private chainData?: any;

//   private setEarthquakeData: any = [];
//   private setGeologicalLandslideData: any = [];
//   private setTrafficAccidentData: any = [];
//   private setFireData: any = [];

//   private fireDataChange() {}

//   private nameData: any = [];
//   private linksDate: any = [];
//   private tableShowTitles: any = [];
//   private setChainData: any = {};
//   private mounted() {
//     if (this.chainData) {
//       this.tableShowTitles = this.chainData.tableShowTitles;
//       this.linksDate = this.chainData.linksDate;
//       this.nameData = this.chainData.nameData;

//       this.setChainData = {
//         linksDate: this.chainData.linksDate,
//         nameData: this.chainData.nameData,
//       };
//     }

//      this.initOtherData();
//   }
//   private initOtherData() {
//     this.tableShowTitles.map((item: any) => {
//       if (item === "地震") {
//         this.setEarthquakeData = [ 90, 50, 40, 10];
//       }
//       if (item === "地质滑坡") {
//         this.setGeologicalLandslideData = [4, 7, 800];
//       }
//       if (item === "交通事故") {
//         this.setTrafficAccidentData = [
//           { value: 1048, name: "轻微事故" },
//           { value: 735, name: "一般事故" },
//           { value: 580, name: "重大事故" },
//           { value: 484, name: "特大事故" },
//         ];
//       }
//       if (item === "火灾蔓延") {
//         this.setFireData = [560, 400, 800, 100];
//       }
//       return item;
//     });
//   }
//   private goback() {
//     let data: any = {
//       data: {},
//       index: 2,
//     };
//     this.setIndex(data);
//     this.$Bus.$emit("clearAll");
//   }

//   @Emit("setPanelView")
//   private setIndex(data: any) {
//     return data;
//   }
// }
</script>
<style lang="less" scoped>
@img: "../../../assets/img/model";
.StatisticsView {
  height: 490px;
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .com {
    margin: 20px 0;
    height: 310px;
    width: 100%;
  }
}
.bottom_btn {
  display: flex;
  justify-content: space-around;
  height: 55px;
  align-items: center;
  .btn_item {
    width: 112px;
    height: 37px;
    background: url(~"@{img}/nor.png") no-repeat center center;
    background-size: 112px 37px;
    color: #0ff;
    line-height: 37px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
      background: url(~"@{img}/sel.png") no-repeat center center;
      background-size: 112px 37px;
      color: #ffe236;
    }
  }
}
</style>
