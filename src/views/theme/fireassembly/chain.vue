<template>
  <div class="full">
    <div class="fire_title">逻辑链剪枝</div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con chainView">
      <div class="chainEchartsCurtain" ref="chainEchartsCurtain">
        <div class="loading"></div>
      </div>
      <div class="chainEcharts" ref="chainEcharts" id="chainEcharts"></div>
      <div class="resultTextarea">
        <el-input
          type="textarea"
          prefix-icon="el-icon-edit"
          placeholder=""
          v-model="textarea"
          readonly="true"
        >
        </el-input>
      </div>
      <div class="bottom_btn">
        <div class="btn_item" @click="constructOptimizate">构建优化</div>
        <div class="btn_item" @click="submit">执行</div>
        <div class="btn_item" @click="goback">返回上一页</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "chain",
  components: {},
})
export default class chain extends Vue {
  private chainData: any = "";
  private textarea: string = "模型链优化结果显示";
  //@Prop() private defaultData?: any;

  private nameData: any = [
    {
      name: "地震",
      x: 250,
      y: 50,

      cilckShow: false,
    },
    {
      name: "泥石流",
      x: 55,
      y: 200,

      cilckShow: false,
    },
    {
      name: "地质滑坡",
      x: 200,
      y: 200,

      cilckShow: false,
    },
    {
      name: "山体崩塌",
      x: 350,
      y: 200,

      cilckShow: false,
    },
    {
      name: "海啸",
      x: 480,
      y: 200,

      cilckShow: false,
    },
    {
      name: "内涝",
      x: 480,
      y: 400,

      cilckShow: false,
    },
    {
      name: "火灾",
      x: 55,
      y: 400,
      cilckShow: false,
    },
    {
      name: "交通事故",
      x: 350,
      y: 400,

      cilckShow: false,
    },
    {
      name: "建筑倒塌",
      x: 200,
      y: 400,

      cilckShow: false,
    },

    {
      name: "危化品泄漏",
      x: 250,
      y: 600,

      cilckShow: false,
    },
    {
      name: "危化品爆炸",
      x: 55,
      y: 600,

      cilckShow: false,
    },
    {
      name: "水污染事件",
      x: 445,
      y: 600,

      cilckShow: false,
    },
  ];
  private linksDate: any = [];
  private linksDateForSearch: any = [
    {
      source: "地震",
      target: "泥石流",
    },
    {
      source: "地震",
      target: "山体崩塌",
    },
    {
      source: "地震",
      target: "地质滑坡",
    },
    {
      source: "地震",
      target: "海啸",
    },

    {
      source: "海啸",
      target: "内涝",
    },
    {
      source: "地质滑坡",
      target: "交通事故",
    },
    {
      source: "地质滑坡",
      target: "火灾",
    },
    {
      source: "地质滑坡",
      target: "建筑倒塌",
    },
    {
      source: "危化品爆炸",
      target: "火灾",
    },
    {
      source: "火灾",
      target: "危化品爆炸",
    },
    {
      source: "交通事故",
      target: "危化品泄漏",
    },
    {
      source: "建筑倒塌",
      target: "危化品泄漏",
    },
    {
      source: "危化品泄漏",
      target: "危化品爆炸",
    },
    {
      source: "危化品泄漏",
      target: "水污染事件",
    },
  ];

  private mounted() {
    // if (this.defaultData) {
    //   this.chainData = this.defaultData;
    //   this.linksDate = this.defaultData.linksDate;
    //   this.nameData = this.defaultData.nameData;
    // }
    setTimeout(() => {
      this.initEcharts();
    }, 500);
  }

  private initEcharts() {
    let self: any = this;
    const Chart = self.$echarts.init(
      this.$refs.chainEcharts as HTMLCanvasElement
    );

    // self.linksDate = self.linksDateForSearch.map((item: any) => {
    //   item.target = item.target + "_0";
    //   return item;
    // });
    self.linksDate = self.linksDateForSearch;

    const option: any = {
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
    //选择链点击事件(用于开始没有全连状态)
    Chart.on("click", function (params) {
      //取消链接
      self.isOptimizated = false;//用户操作链接后，会初始化模型优化状态
      let arr = self.linksDate.map((item: any) => {
        if (item.target.indexOf(params.name + "_") > -1) {
          item.target = params.name.split("_")[0]; //解锁链接
          if (item.source.indexOf("_") > -1) {
            item.source = item.source.split("_")[0];
          }
        } else {
          if (item.target.indexOf(params.name) > -1) {
            if (params.data.cilckShow) {
              item.target = params.name;
            } else {
              item.target = params.name + "0"; //取消链接
            }
          }
        }
        return item;
      });
      let namearr = self.nameData.map((item: any) => {
        if (item.name.indexOf(params.name) > -1) {
          item.cilckShow = !item.cilckShow;
        }
        return item;
      });
      self.$set(self, "linksDate", arr);
      self.$set(self, "nameData", namearr);
      Chart.setOption(option, true);
    });

    

    //  Chart.on("click", function (params) {
    //   let arr = self.linksDate.map((item: any) => {
    //     if (item.target.indexOf(params.name) > -1) {
    //       if (params.data.cilckShow) {
    //         item.target = params.name;
    //       } else {
    //         item.target = params.name + "0";
    //       }
    //     }
    //     if (item.source.indexOf(params.name) > -1) {
    //       if (params.data.cilckShow) {
    //         item.source = params.name;
    //       } else {
    //         item.source = params.name + "0";
    //       }
    //     }
    //     return item;
    //   });
    //   let namearr = self.nameData.map((item: any) => {
    //     if (item.name.indexOf(params.name) > -1) {
    //       item.cilckShow = !item.cilckShow;
    //     }
    //     return item;
    //   });
    //   self.$set(self, "linksDate", arr);
    //   self.$set(self, "nameData", namearr);
    //   Chart.setOption(option, true);
    // });
  }

  //构建优化
  private isOptimizated: boolean = false; //优化结果
  private optimizatedLinkData: any = [];
  private constructOptimizate() {
    let self: any = this;
    const objLinksDate: any = JSON.parse(JSON.stringify(self.linksDate));
    let newLinkData: any = objLinksDate.filter(
      (item: any) =>
        item.target.indexOf("_") <= -1 && item.target.indexOf("0") <= -1
    );
    console.log("Czb", newLinkData);
    if (!newLinkData || newLinkData.length <= 0) {
      self.$message.warning("请先进行模型链构建");
      return;
    }
    self.$refs.chainEchartsCurtain.style.setProperty("z-index", 100); //加载中
    new Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        let mes: string = "有效连接[地震-地质滑坡]，存在地质隐患点。\n有效连接[地质滑坡-火灾]，滑坡点邻域存在可燃植被与潜在火源。\n有效连接[地质滑坡-交通事故]，滑坡点邻域存在道路交通。\n成灾害模型链构建与优化！";
        resolve(mes);
      }, 2000);
    }).then(
      (res: any) => {
        //暂时固定结果
        self.textarea = res;
        self.isOptimizated = true;
        self.optimizatedLinkData = self.setTemporarilyFixed();
        self.$refs.chainEchartsCurtain.style.setProperty("z-index", -10);

        // self.textarea = res;
        // self.isOptimizated = true;
        // self.optimizatedLinkData = newLinkData;
        // self.$refs.chainEchartsCurtain.style.setProperty("z-index", -10);
      },
      (err: any) => {
        self.textarea = err;
        self.isOptimizated = false;
        self.optimizatedLinkData = [];
        self.$refs.chainEchartsCurtain.style.setProperty("z-index", -10);
      }
    );
  }

  private getData() {
    let newNameData: any = [];
    let checkItem: any = [];
    let objNameData: any = JSON.parse(JSON.stringify(this.nameData));

    this.optimizatedLinkData.map((item: any) => {
      if (!checkItem.includes(item.target)) {
        checkItem.push(item.target);
      }
      if (!checkItem.includes(item.source)) {
        checkItem.push(item.source);
      }
      return item;
    });

    let order = [
      {
        name: "地震",
        x: 80,
        y: 80,
      },
      {
        name: "地质滑坡",
        x: 150,
        y: 80,
      },
      {
        name: "交通事故",
        x: 240,
        y: 80,
      },
      {
        name: "火灾",
        x: 240,
        y: 120,
      },
    ];

    console.log("checkItem",checkItem)
    checkItem.map((item: any) => {
      let index = objNameData.findIndex((nd: any) => nd.name === item);
      if (index > -1) {
        let newOrder: any = order.filter((i: any) => i.name === item);
        if (newOrder && newOrder.length > 0) {
          objNameData[index].x = newOrder[0].x;
          objNameData[index].y = newOrder[0].y;
        }
        newNameData.push(objNameData[index]);
      }
      return item;
    });

    console.log("***",{
      linksDate: this.optimizatedLinkData,
      nameData: newNameData,
      tableShowTitles: checkItem,
    })
    return {
      linksDate: this.optimizatedLinkData,
      nameData: newNameData,
      tableShowTitles: checkItem,
    };
  }

  //暂时固定构建优化结果
  private setTemporarilyFixed() {
    this.linksDateForSearch = [
      {
        source: "地震",
        target: "泥石流_0",
      },
      {
        source: "地震",
        target: "山体崩塌_0",
      },
      {
        source: "地震",
        target: "地质滑坡",
      },
      {
        source: "地震",
        target: "海啸_0",
      },

      {
        source: "海啸",
        target: "内涝_0",
      },
      {
        source: "地质滑坡",
        target: "交通事故",
      },
      {
        source: "地质滑坡",
        target: "火灾",
      },
      {
        source: "地质滑坡",
        target: "建筑倒塌_0",
      },
      {
        source: "危化品爆炸",
        target: "火灾_0",
      },
      {
        source: "火灾",
        target: "危化品爆炸_0",
      },
      {
        source: "交通事故",
        target: "危化品泄漏_0",
      },
      {
        source: "建筑倒塌",
        target: "危化品泄漏_0",
      },
      {
        source: "危化品泄漏",
        target: "危化品爆炸_0",
      },
      {
        source: "危化品泄漏",
        target: "水污染事件_0",
      },
    ];

    this.initEcharts();
    return [
      {
        source: "地震",
        target: "地质滑坡",
      },
      {
        source: "地质滑坡",
        target: "交通事故",
      },
      {
        source: "地质滑坡",
        target: "火灾",
      },
    ];
  }

  // 提交
  private submit() {
    if (!this.isOptimizated) {
      this.$message.warning("请先点击构建优化进行模型链优化");
      return;
    }
    let chain: any = this.getData();
    let data: any = {
      data: {
        chain,
      },
      index: 3,
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
@img: "../../../assets/img/model";
.chainView {
  padding: 0 22px 25px 12px;
  .chainEcharts {
    width: 100%;
    height: 70%;
  }
  .chainEchartsCurtain {
    width: calc(100% - 35px);
    height: calc(85% - 54px);
    position: absolute;
    z-index: -10;
    background-color: black;
    opacity: 0.4;
    .loading {
      width: 100%;
      height: 100%;
      background: url(~"@{img}/loading.gif") no-repeat center center;
      background-size: 50px 50px;
    }
  }
  .resultTextarea {
    width: 100%;
    //height: 60px;
    height: 100px;
    background-color: #001d59;
    /deep/ .el-textarea {
      width: 96%;
      height: 94%;
      textarea {
        width: calc(100%-10px);
        height: 100%;
        min-height: 100%;
        max-height: 100%;
        background: #aac6ee;
        border: none;
        color: #000;
        font-size: 14px;
        border: 1px solid #1b76eb;
      }
    }
  }
  .bottom_btn {
    display: flex;
    justify-content: space-around;
    height: 75px;
    align-items: center;
    .btn_item {
      width: 102px;
      height: 47px;
      background: url(~"@{img}/nor.png") no-repeat center center;
      background-size: 102px 47px;
      color: #0ff;
      line-height: 47px;
      font-size: 16px;
      cursor: pointer;
      &:hover,
      &:active {
        background: url(~"@{img}/sel.png") no-repeat center center;
        background-size: 102px 47px;
        color: #ffe236;
      }
    }
  }
}
.chainEcharts {
  background: #001d59;
}
</style>
