<template>
  <div style="width: 100%; height: 100%" ref="disasterGraphEchart"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
@Component({
  name: "graphEchart",
  components: {},
})
export default class graphEchart extends Vue {
  @Prop() private echartData?: any;
  private myChart:any = null
  @Watch("echartData")
  private fireDataChange() {
    this.initEchart();
  }

  private mounted() {
    this.initEchart();
  }

  private initEchart() {
    let that = this
    that.myChart = (that as any).$echarts.init(
      that.$refs.disasterGraphEchart as HTMLCanvasElement
    );
    var option = {
      series: [
        {
          type: "graph",
           //"edgeSymbol":"arrow",//circle,arrow//线两边显示箭头或圆
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [3, 7],
          // force: {
          //   repulsion: 400, //枝干线的长短
          //   edgeLength: 50,
          // },
          layout: "none",
          roam: true,
          itemStyle: {
            normal: {
              color: "#fff", //文字颜色
            },
          },
          label: {
            normal: {
              show:true,//是否显示文字
              position: 'bottom',
              fontSize: 18
            },
          },
          //线的样式
          lineStyle: {
            normal: {
              opacity: 1, // width: 5,
              curveness: 0.2,
              color: "#dcdcdc",
            },
          },
        },
      ],
    };
    that.myChart.setOption(option, true);
    // 关系链数据
    var links = [
      {
        source: "hz",
        target: "m1",
        lineStyle: {
          curveness: 0
        },
      },
      {
        source: "hz",
        target: "m2",
        lineStyle: {
          curveness: 0
        }
      },
      {
        source: "hz",
        target: "m3",
        lineStyle: {
          curveness: 0
        }
      },
      {
        source: "hz",
        target: "m4",
        lineStyle: {
          curveness: 0
        }
      },
      {
        source: "hz",
        target: "whp",
      },
      {
        source: "whp",
        target: "swr",
      },
      {
        source: "jt",
        target: "whp",
      },
      {
        source: "jt",
        target: "hz",
      },
      {
        source: "hp",
        target: "jt",
      },
      {
        source: "hp",
        target: "hz",
      },
      {
        source: "dz",
        target: "hx",
      },
      {
        source: "dz",
        target: "hp",
      },
    ]; 
    // 数据
    var data = [
      {
        name: "火灾模型群",
        // name:'Fire',
        symbolSize: 100,
        symbol:
          require("../../../assets/img/fireView/fsfireView/fire.png"),
        id: "hz",
        x:50,
        y:120,
      },
      {
        name: "模型1",
        // name:'Model 1',
        symbol:
          require("../../../assets/img/fireView/fsfireView/model.png"),
        symbolSize: 80,
        id: "m1",
        x:40,
        y:150,
      },
      {
        name: "模型2",
        // name:'Model 2',
        symbol:
          require("../../../assets/img/fireView/fsfireView/model.png"),
        symbolSize: 80,
        id: "m2",
        x:60,
        y:100,
      },
      {
        name: "模型3",
        // name:'Model 3',
        symbol:
          require("../../../assets/img/fireView/fsfireView/model.png"),
        symbolSize: 80,
        id: "m3",
        x:20,
        y:100,
      },
      {
        name: "模型4",
        // name:'Model 4',
        symbol:
          require("../../../assets/img/fireView/fsfireView/model.png"),
        symbolSize: 80,
        id: "m4",
        x:10,
        y:140,
      },
      {
        name: "交通模型群",
        // name:'Traffic',
        symbolSize: 100,
        symbol:
          require("../../../assets/img/fireView/fsfireView/traffic.png"),
        id: "jt",
        x:120,
        y:110,
      },
      {
        name: "危化品模型群",
        // name:'Hazardous Chemicals',
        symbol:
          require("../../../assets/img/fireView/fsfireView/for.png"),
        symbolSize: 100,
        id: "whp",
        x:100,
        y:150,
      },
      {
        name: "水污染模型群",
        // name:'Water Pollution',
        symbol:
          require("../../../assets/img/fireView/fsfireView/water.png"),
        symbolSize: 100,
        id: "swr",
        x:150,
        y:150,
      },
      {
        name: "海啸模型群",
        // name:'Tsunami',
        symbol:
          require("../../../assets/img/fireView/fsfireView/tsunami.png"),
        symbolSize: 100,
        id: "hx",
        x:30,
        y:60,
      },
      {
        name: "地震模型群",
        // name:'Earthquake',
        symbol:
          require("../../../assets/img/fireView/fsfireView/earthquake.png"),
        symbolSize: 100,
        id: "dz",
        x:70,
        y:70,
      },
      {
        name: "滑坡模型群",
        // name:'Landslide',
        symbol:
          require("../../../assets/img/fireView/fsfireView/landslide.png"),
        symbolSize: 100,
        id: "hp",
        x:120,
        y:80,
      },
    ];
    pubdata(data);
    
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

        that.myChart.setOption({
          series: [
            {
              data: androidMap,
              links: links,
            },
          ],
        });
      });
    }

    //echarts图表点击跳转
    // that.myChart.on("click", function (params) {
    //   if (params.data.id) {
    //     var val = params.data.name; 
    //     alert(val);
    //   } else {
    //     alert("您点击节点信息！");
    //   }
    // }); 
  }
}
</script>
<style lang="less" scoped>
</style>
