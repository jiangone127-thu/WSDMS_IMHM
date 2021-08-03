<template>
  <div class="floodModel">
    <div class="title"></div>
    <div class="close" @click="close"></div>
    <div id="linecharts"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({
  name: "fireView",
  components: {},
})
export default class floodModel extends Vue {
  @Prop() public echartData?: any;
  public charts: any = null;
  public option: any;
  private dataX: any = [];
  private dataY1: any = [];
  private dataY2: any = [];
  private start: any = 80;
  private grid: any = {
    left: 0,
    right: 0,
    bottom: 40,
    containLabel: true,
  };
  @Watch("echartData")
  public initEchart() {
    this.getCurve();
  }
  private getCurve() {
    const vm: any = this;
    vm.option = {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          align: "left",
        },
        formatter(params, ticket, callback) {
          let res = params[0].name;
          let unit:string='';
          for (let i = 0; i < params.length; i++) {
            switch (params[i].seriesName){
              case "水流速度预测":
                unit=" m³/s";
                break;
              case "内涝预警等级":
                unit=" 级";
                break;
              case "预测水位高度":
                unit=" m";
                break;
            }
            res +=
              "<br/>" +
              params[i].marker +
              params[i].seriesName +
              " : " +
              params[i].value +
              unit;
          }
          return res;
        },
      },
      dataZoom: [
        {
          height: 18,
          bottom: 20,
          show: true,
          realTime: true,
          start: vm.start,
          end: 100,
        },
      ],
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          nameTextStyle: {
            fontSize: 12,
            color: "#fff",
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            color: "#fff",
          },
          data: vm.echartData.time.split(","),
          splitLine: false,
        },
      ],
      grid: vm.grid,
      yAxis: [
        {
          name: "",
          //   max: function (value) {
          //     let markLineNum = vm.type === "FQ" ? vm.markLineFQ : vm.markLineYQ;
          //     if (value.max > markLineNum) {
          //       return (value.max * 1.5).toFixed(1);
          //     } else {
          //       return (markLineNum + 2).toFixed(1);
          //     }
          //   },
          type: "value",
          nameTextStyle: {
            align: "left",
            fontSize: 14,
            color: "#fff",
          },
          axisLine: {
            lineStyle: {
              color: "#e2e0e0",
            },
          },
          axisLabel: {
            color: "#e2e0e0",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(224,224,224,0.3)",
            },
          },
        },
      ],
      series: [
        {
          name: "水流速度预测",
          type: "line",
          symbol: "none",
          itemStyle: {
            normal: {
              color: "#ff8c00",
            },
          },
          areaStyle: {
            color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: "rgba(0,0,0,0.3)",
              },
              {
                offset: 0,
                color: "#ff8c00",
              },
            ]),
          },
          yAxisIndex: 0,
          data: vm.echartData.qo.split(","),
          //   markLine: vm.markLine,
        },
        {
          name: "内涝预警等级",
          type: "line",
          symbol: "none",
          itemStyle: {
            normal: {
              color: "#ff7644",
            },
          },
          areaStyle: {
            color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: "rgba(255, 158, 68,0.3)",
              },
              {
                offset: 0,
                color: "rgba(255, 70, 131,0.3)",
              },
            ]),
          },
          yAxisIndex: 0,
          data: vm.echartData.altJS.split(","),
          //   markLine: vm.markLine,
        },
        {
          name: "预测水位高度",
          type: "line",
          symbol: "none",
          itemStyle: {
            normal: {
              color: "#a0f30d",
            },
          },
          areaStyle: {
            color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: "rgba(13,203,243,0.3)"//"rgba(255, 158, 68,0.3)",
              },
              {
                offset: 0,
                color: "rgba(160,243,13,0.3)"//"rgba(255, 70, 131,0.3)",
              },
            ]),
          },
          yAxisIndex: 0,
          data: vm.echartData.z.split(","),
          //   markLine: vm.markLine,
        },
      ],
    };
    vm.charts = vm.$echarts.init(
      document.getElementById("linecharts") as HTMLDivElement
    );
    vm.charts.setOption(vm.option, true);
  }
  public close(){
      this.$Bus.$emit('close')
  }
  mounted() {
    this.getCurve();
    console.log(this.echartData, "787878");
  }
}
</script>
<style lang="less" scoped>
@img: "../../../assets/img";

.floodModel {
  position: absolute;
  top: 50%;
  left: 27%;
  margin-top: -200px;
  width: 600px;
  height: 400px;
  z-index: 999;
  background: url("../../../assets/img/view/fullRight.png") no-repeat center;
  background-size: 100% 100%;
  padding: 0 76px 38px 58px;
  .title {
    height: 60px;
    line-height: 60px;
    color: #0ff;
    font-size: 21px;
    font-weight: 800;
    display: flex;
    align-items: center;
    padding: 0 20px;

    background: url(~"@{img}/view/water-logging.png") no-repeat center left;
  }
  .close {
    position: absolute;
    height: 100%;
    width: 60px;
    height: 40px;
    top: 10px;
    right: 45px;
    background: ~"url(@{img}/close.png)  no-repeat center center";
    cursor: pointer;
  }
  #linecharts {
    width: 100%;
    height: calc(100% - 60px);
    margin: 0 auto;
  }
}
</style>
