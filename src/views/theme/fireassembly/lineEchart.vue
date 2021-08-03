<template>
  <div class="width" :class="isShow?'height':''"  ref="disasterSituationEchart"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
@Component({
  name: "LineEchart",
  components: {},
})
export default class LineEchart extends Vue {
  @Prop() private echartData?: any;
  @Prop() private earthquakeData?: any;
  @Prop() private trafficData?: any;
  @Prop() private echartDataland?: any;
  @Prop() private chainData?: any;
  @Watch("chainData")
  private chainDataChange() {
    this.initChainEchart();
  }
  @Watch("echartData")
  private fireDataChange() {
    this.initEchart();
  }
  @Watch("earthquakeData")
  private earthquakeDataChange() {
    this.earthquake();
  }
  @Watch("trafficData")
  private trafficDataChange() {
    this.trafficDataEchart();
  }
  @Watch("echartDataland")
  private echartDatalandChange() {
    this.landslideData();
  }
  private isShow:boolean = true;
  // 返回
  private mounted() {}

  //模型链接Echart图
  private initChainEchart() {
    const Chart = (this as any).$echarts.init(
      this.$refs.disasterSituationEchart as HTMLCanvasElement
    );
    const ChartOptions: any = {
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: "quinticInOut",
      focusNodeAdjacency: true,
      series: [
        {
          type: "graph",
          layout: "none",
          symbol: "circle",
          symbolSize: (value: any, params: any) => {
            return params.name.length * 18;
          },
          roam: true,
          draggable: true,
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
            edgeLength: 6,
          },
          data: this.chainData.nameData,
          links: this.chainData.linksDate,
          lineStyle: {
            opacity: 0.9,
            color: "#fff",
            width: 2,
            curveness: 0,
          },
        },
      ],
    };
    Chart.setOption(ChartOptions, true);
  }

  private initEchart() {
    const Chart = (this as any).$echarts.init(
      this.$refs.disasterSituationEchart as HTMLCanvasElement
    );
    const option: any = {
      title: {
        show: true,
        text: "时序性森林燃烧面积、建筑物燃烧面积",
        x: "center", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        y: "top",
        textStyle: {
          color: "#8aa0c9",
          fontSize: 14,
        },
      },
      legend: {
        right: 60,
        top: 20,
        textStyle: {
          //图例文字的样式
          color: "#8aa0c9",
          fontSize: 12,
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
        left: "2%",
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
          data: this.echartData.dataX,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "面积(m²)",
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
        {
          type: "value",
          name: "建筑物(m²)",
          min: 0,
          max: 25,
          axisTick: {
            show: true,
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
              color: "#02657a",
            },
            show: false, //隐藏或显示
          },
          axisLine: {
            lineStyle: {
              color: "#8aa0c9",
            },
          },
        },
      ],
      series: [
        {
          name: "面积(km/s)",
          type: "line",
          barWidth: 10, //柱图宽度
          data: this.echartData.dataY1,
        },
        {
          name: "建筑物(栋)",
          type: "line",
          data: this.echartData.dataY2,
          itemStyle: {
            normal: {
              color: "#E9967A",
              lineStyle: {
                color: "#E9967A",
              },
            },
          },
        },
      ],
    };

    Chart.setOption(option, true);
    Chart.on('click',(parmas:any)=>{
      this.$Bus.$emit("setCenter",{longitude:113.97241969,latitude:22.5902154},16.5) //火灾
    })
  }
  private earthquake() {
    const Chart = (this as any).$echarts.init(
      this.$refs.disasterSituationEchart as HTMLCanvasElement
    );

    const option: any = {
      title: {
        show: true,
        text: "不同级别地震烈度带面积",
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
          data: this.earthquakeData.dataX,
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
          name: "面积(km²)",
          type: "line",
          data: this.earthquakeData.dataY,
        },
      ],
    };
    Chart.setOption(option, true);
    Chart.on('click',(parmas:any)=>{
      this.$Bus.$emit("setCenter",{longitude: 113.64456222627953,latitude: 22.40927072719858},11)//地震
    })
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
          name: "风险值",
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

          symbol: "circle", //折线点设置为实心点
          symbolSize: 20, //折线点的大小
          itemStyle: {
            normal: {
              color: "#E9967A", //折线点的颜色
              lineStyle: {
                color: "#0d427e", //折线的颜色
                opacity: 0,
              },
            },
          },
        },
      ],
    };
    Chart.setOption(option, true);
    Chart.on('click',(parmas:any)=>{
      this.$Bus.$emit("setCenter",{longitude: 113.97293464,latitude:22.5880109},18)//滑坡
    })
  }
  private trafficDataEchart() {
    const Chart = (this as any).$echarts.init(
      this.$refs.disasterSituationEchart as HTMLCanvasElement
    );
    const option: any = {
      title: {
        show: true,
        text: "道路交通拥堵情况",
        x: "center", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        y: "top",
        textStyle: {
          color: "#8aa0c9",
          fontSize: 14,
        },
      },
      legend: {
        left: "right",
        top: 20,
        textStyle: {
          //图例文字的样式
          color: "#8aa0c9",
          fontSize: 12,
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
          data: this.trafficData.dataX,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "车流(辆)",
          minInterval: 1,
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
          name: "畅通",
          type: "line",
          data: this.trafficData.dataY1,
          itemStyle: {
            normal: {
              color: "#00FF00",
              lineStyle: {
                color: "#00FF00",
              },
            },
          },
        },
        {
          name: "缓慢",
          type: "line",
          data: this.trafficData.dataY2,
          itemStyle: {
            normal: {
              color: "#E9967A",
              lineStyle: {
                color: "#E9967A",
              },
            },
          },
        },
        {
          name: "拥堵",
          type: "line",
          data: this.trafficData.dataY3,
          itemStyle: {
            normal: {
              color: "#fa0108",
              lineStyle: {
                color: "#fa0108",
              },
            },
          },
        },
      ],
    };
    Chart.setOption(option, true);
    Chart.on('click',(parmas:any)=>{
      switch (parmas.name){
        case "5":
          this.$Bus.$emit("timer", "five");
          break;
        case "10":
          this.$Bus.$emit("timer", "ten");
          break;
        case "15":
          this.$Bus.$emit("timer", "fifteen");
          break;
        case "20":
          this.$Bus.$emit("timer", "twenty");
          break;
        case "25":
          this.$Bus.$emit("timer", "twentyFive");
          break;
        case "30":
          this.$Bus.$emit("timer", "thirty");
          break;
      }
      this.$Bus.$emit("setCenter",{longitude:113.97293464,latitude:22.588010958},16)
    })
  }
  @Emit("setPanelView")
  private setIndex(data: any) {
    return data;
  }
}
</script>
<style lang="less" scoped>
.height{
  height: 170px;
}
.width{
  width: 100%;
}
</style>
