<template>
  <div class="full">
    <div class="fire_title">DMSC orchestration and optimization</div>
    <div class="min-title">Step-2 construct and prune logical chain</div>
    <!-- <div class="goback" @click="goback">return</div> -->
    <div class="fire_con chainView">
      <div class="chainEcharts" ref="chainEcharts" id="chainEcharts">

      </div>
      <div class="bottom_btn">
        <!-- <div class="btn_item" @click="clip">语音输入</div> -->
        <div class="btn_item" @click="submit">Next</div>
        <div class="btn_item" @click="goback">Clear</div>
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
  @Prop() private defaultData?: any;

  private nameData: any = [
    {
      name: "Earthquake",
      x: 250,
      y: 50,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/earthquake.png"),
      symbolSize: 80,
      cilckShow: false,
    },
    {
      name: "Landslide",
      x: 200,
      y: 200,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/landslide.png"),
      symbolSize: 80,
      cilckShow: false,
    },
    {
      name: "Tsunami",
      x: 400,
      y: 200,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/tsunami.png"),
      symbolSize: 80,
      cilckShow: false,
    },
    {
      name: "Flood",
      x: 400,
      y: 400,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/flood.png"),
      symbolSize: 80,
      cilckShow: false,
    },
    {
      name: "Fire",
      x: 300,
      y: 400,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/fire.png"),
      symbolSize: 80,
      cilckShow: false,
    },
    {
      name: "Traffic",
      x: 100,
      y: 400,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/traffic.png"),
      symbolSize: 80,
      cilckShow: false,
    },
    {
      name: "Hazardous Chemicals",
      x: 200,
      y: 600,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/for.png"),
      symbolSize: 80,
      cilckShow: false,
    },
    {
      name: "Water Pollution",
      x: 400,
      y: 600,
      symbol:
          require("../../../../assets/img/fireView/fsfireView/water.png"),
      symbolSize: 80,
      cilckShow: false,
    },
  ];
  private linksDate: any = [
    {
      source: "Earthquake",
      target: "Landslide",
    },
    {
      source: "Flood",
      target: "Landslide",
    },
    {
      source: "Earthquake",
      target: "Tsunami",
    },
    {
      source: "Tsunami",
      target: "Flood",
    },
    {
      source: "Landslide",
      target: "Traffic",
    },
    {
      source: "Fire",
      target: "Hazardous Chemicals",
      lineStyle: {
        curveness: 0.1
      }
    },
    {
      source: "Hazardous Chemicals",
      target: "Fire",
      lineStyle: {
        curveness: 0.1
      }
    },
    {
      source: "Landslide",
      target: "Hazardous Chemicals",
    },
    {
      source: "Traffic",
      target: "Fire",
    },
    {
      source: "Hazardous Chemicals",
      target: "Water Pollution",
    },
  ];

  private mounted() {
    if (this.defaultData) {
      this.chainData = this.defaultData;
      this.linksDate = this.defaultData.linksDate;
      this.nameData = this.defaultData.nameData;
    }
    setTimeout(() => {
      this.initEcharts();
    }, 500);
  }
  // 剪枝
  private clip() {
    console.log("剪枝");
  }

  private initEcharts() {
    let self: any = this;
    const Chart = self.$echarts.init(
      this.$refs.chainEcharts as HTMLCanvasElement
    );
    const option: any = {
      // title: {
      //   text: "Graph 简单示例",

      //   textStyle: {
      //     color: "#fff",
      //   },
      // },
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
            color: "#fff",
            position: 'bottom',
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
    pubdata(self.nameData);
    
    function getImgData(imgSrc) {
      var fun = function (resolve) {
        const canvas:any = document.createElement("canvas");
        const contex:any = canvas.getContext("2d");
        const img:any = new Image();
        let radius:any =''
        img.crossOrigin = "";
        img.onload = function () {
          //设置图形宽高比例
          let center = {
            x: img.width / 2,
            y: img.height / 2,
          };
          var diameter = img.width; //半径
          canvas.width = diameter;
          canvas.height = diameter;
          contex.clearRect(0, 0, diameter, diameter);
          contex.save();
          contex.beginPath();
          radius = img.width / 2;
          contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
          contex.clip(); //裁剪上面的圆形
          contex.drawImage(
            img,
            center.x - radius,
            center.y - radius,
            diameter,
            diameter,
            0,
            0,
            diameter,
            diameter
          ); // 在刚刚裁剪的园上画图
          contex.restore(); // 还原状态
          resolve(canvas.toDataURL("image/png", 1));
        };
        img.src = imgSrc;
      };
      var promise = new Promise(fun);
      return promise;
    }
    
    function pubdata(json) {
      var androidMap = json;
      var picList: any = []; //获取出全部图片
      for (var i = 0; i < androidMap.length; i++) {
        //把图片路径转成canvas
        let p: any = getImgData(androidMap[i].symbol);
        // console.log(p);
        picList.push(p);
      }

      Promise.all(picList).then(function (images) {
        //取出base64 图片 然后赋值到jsondata中
        for (var i = 0; i < images.length; i++) {
          var img = "image://" + images[i];
          // console.log(img);
          androidMap[i].symbol = img;
        } // 把数据设置到Echart中data

        Chart.setOption({
          series: [
            {
              data: androidMap,
              links: self.linksDate,
            },
          ],
        });
      });
    }
    Chart.on("click", function (params) {
      let arr = self.linksDate.map((item: any) => {
        if (item.target.indexOf(params.name) > -1) {
          if (params.data.cilckShow) {
            item.target = params.name;
          } else {
            item.target = params.name + "0";
          }
        }
        if (item.source.indexOf(params.name) > -1) {
          if (params.data.cilckShow) {
            item.source = params.name;
          } else {
            item.source = params.name + "0";
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
  }

  // 提交
  private submit() {
    let data: any = {
      data: {
        chain: {
          nameData: this.nameData,
          linksDate: this.linksDate,
        },
      },
      index: 3,
    };
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
.goback{
  top: 50px;
}
.chainView {
  padding: 0 22px 25px 12px;
  margin-top: 10px;
  .chainEcharts {
    width: 100%;
    height: 80%;
  }
  .bottom_btn {
    display: flex;
    justify-content: space-around;
    height: 75px;
    align-items: center;
    .btn_item {
      width: 112px;
      height: 47px;

      background: url(~"@{img}/nor.png") no-repeat center center;
      background-size: 112px 47px;
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
.chainEcharts {
  background: #001d59;
}
</style>
