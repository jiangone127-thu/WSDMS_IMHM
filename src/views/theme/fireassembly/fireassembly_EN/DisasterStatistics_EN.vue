<template>
  <div class="full">
    <div class="fire_title">DMSC orchestration and optimization</div>
    <div class="min-title">Step-4 result visualization</div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con StatisticsView">
      <div class="min-title titles">The selected physical chain</div>
      <div class="navBox">
        <div v-for="(item,index) in navData" :key="index">
          <span class="arrow" v-if="index>0 && item.ID"><i class="el-icon-right"></i></span>
          <span class="dot" :class="{'active':activeIdx == index}" @click="getDotData(item.ID+item.val,index)" v-if="item.ID">{{item.ID}}{{item.val}}</span>
        </div>
      </div>
      <el-scrollbar style="height:100%;width: 100%;">
        <lineEchart :earthquakeData="earthquakeData"></lineEchart>
        <lineEchart :echartDataland="echartDataland"></lineEchart>
        <lineEchart :trafficData="trafficData"></lineEchart>
        <lineEchart :echartData="fireData"></lineEchart>
      </el-scrollbar>
        <div class="bottom_btn">
          <div class="btn_item" @click="submit">Next</div>
          <div class="btn_item" @click="goback">Clear</div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import lineEchart from "@/views/theme/fireassembly/fireassembly_EN/lineEchart_EN.vue";
@Component({
  name: "DisasterStatistics",
  components: { lineEchart },
})
export default class DisasterStatistics extends Vue {
  @Prop() private defaultData?: any;
  private navData: any = [];
  private activeIdx:any = -1
  private fireData: any = {};
  private earthquakeData: any = [];
  private trafficData: any = [];
  private showfireEchart: any = false;
  private echartDataland: any = {
    DataX: [],
    DataY: [],
  };
  @Watch("fireData")
  private fireDataChange() {}
  @Watch('defaultData')
  private watchdata(){
    console.log('传参',this.defaultData)
    this.activeIdx = -1
    this.navData = this.defaultData.slice(0,4)
  }
  private mounted() {
    this.$Bus.$on("getFireDetail", (data: any) => {
      console.log(data, "火灾参数");
    });
    this.$Bus.$on("getModelType",(Num:any,index)=>{
      this.getDotData(Num,index);
    })
    this.$Bus.$on("fireData", (data) => {
      this.fireData = data;
    });
    this.$Bus.$on("earthquakeData", (data) => {
      this.earthquakeData = data;
    });
    this.$Bus.$on("trafficData", (data) => {
      this.trafficData = data;
      this.echartDataland = {
        DataX: ["Shenzhen university town", "Wutong mountain", "Yangtai mountain"],
        DataY: [3, 1, 2],
      };
    });
    this.$Bus.$on("landslideData", (data) => {});
    this.landslideData();
  }
  // 提交
  private submit() {}
  private goback() {
    let data: any = {
      data: {},
      index: 3,
    };
    this.setIndex(data);
    this.showfireEchart = false;
    this.$Bus.$emit("clearAll");
  }
  private getDotData(data:any,index){
    this.activeIdx = index
    console.log('名称',data)
    let model:any = data.substr(0,1)
    switch (model){
      case "A":
        this.$Bus.$emit("setCenter",{longitude: 113.64456222627953,latitude: 22.40927072719858},11);
        break;
      case "B":
        this.$Bus.$emit("setCenter",{longitude: 113.97293464,latitude:22.5880109},18);
        break;
      case "C":
        this.$Bus.$emit("setCenter",{longitude:113.97293464,latitude:22.588010958},16);
        break;
      case "D":
        this.$Bus.$emit("setCenter",{longitude:113.97241969,latitude:22.5902154},16.5);
        break;
    }
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
          data: ["Shenzhen university town", "Wutong mountain", "Yangtai mountain"],
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
  width: 100%;
  color:#8aa0c9
}
.StatisticsView {
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 700px;
  /deep/.el-scrollbar__wrap{
    height: calc(100% + 19px);
  }
  .com {
    margin: 20px 0;
    height: 300px;
    width: 100%;
  }
  .navBox{
    width: 100%;
    height: 80px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    >div{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .arrow{
      display: flex;
      align-items: center;
      // height: ;
    }
    .dot{
      cursor: pointer;
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #aac6ee;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      font-size: 16px;
    }
    .active{
      background: #7ea8f7;
      color: #fff;
    }
  }
}
.bottom_btn {
  display: flex;
  justify-content: space-around;
  height: 75px;
  width: 100%;
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
</style>
