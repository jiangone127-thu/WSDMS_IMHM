<template>
  <div class="full">
    <div class="fire_title"></div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con OptimizationView">
      <div class="Optimization zkb_scrollbar">
        <el-form ref="form" :model="Opt" label-width="160px">
          <el-form-item label="灾前影像左片参数">
            <div class="import_box">
              <div class="import_in" id="file3_div"></div>
              <input class="import_file_result" ref="file3_result" type="text" value="" />
              <input
                class="import_hide"
                id="file3"
                @change="changeflie3"
                type="file"
                name="file3"
              />
            </div>
          </el-form-item>
          <el-form-item label="灾前影像右片参数">
            <div class="import_box">
              <div class="import_in" id="file4_div"></div>
              <input class="import_file_result" ref="file4_result" type="text"  value="" />
              <input
                class="import_hide"
                id="file4"
                @change="changeflie4"
                type="file"
                name="file4"
              />
            </div>
          </el-form-item>
          <el-form-item label="灾后影像左片参数">
            <div class="import_box">
              <div class="import_in" id="file1_div"></div>
              <input class="import_file_result" ref="file1_result" type="text"  value="" />
              <input
                class="import_hide"
                id="file1"
                @change="changeflie1"
                type="file"
                name="file1"
              />
            </div>
          </el-form-item>
          <el-form-item label="灾后影像右片参数">
            <div class="import_box">
              <div class="import_in" id="file2_div"></div>
              <input class="import_file_result" ref="file2_result" type="text"  value="" />
              <input
                class="import_hide"
                id="file2"
                @change="changeflie2"
                type="file"
                name="file2"
              />
            </div>
          </el-form-item>
          <el-form-item label="建筑物影像">
            <div class="import_box">
              <div class="import_in" id="file9_div"></div>
              <input class="import_file_result" ref="file9_result" type="text"  value="" />
              <input
                class="import_hide"
                id="file9"
                @change="changeflie9"
                type="file"
                name="file9"
              />
            </div>
          </el-form-item>
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
import { disasterServer } from "@/api/installServer";
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
    file1: "",
    file3: "",
    file4: "",
    file2: "",
    file9: "",
  };
  private inputObj: any;
  private file3: any;

  @Prop() private defaultData?: any;

  private mounted() {
    this.setFileBtn();

    if (this.defaultData) {
      this.Opt = this.defaultData;
    }
  }

  private setFileBtn() {
    let file1_div: any = document.getElementById("file1_div");
    let file1: any = document.getElementById("file1");
    file1_div.addEventListener(
      "click",
      function (e) {
        if (file1) {
          file1.click();
        }
        e.preventDefault(); 
      },
      false
    );

    let file2_div: any = document.getElementById("file2_div");
    let file2: any = document.getElementById("file2");
    file2_div.addEventListener(
      "click",
      function (e) {
        if (file2) {
          file2.click();
        }
        e.preventDefault(); 
      },
      false
    );

    let file3_div: any = document.getElementById("file3_div");
    let file3: any = document.getElementById("file3");
    file3_div.addEventListener(
      "click",
      function (e) {
        if (file3) {
          file3.click();
        }
        e.preventDefault();
      },
      false
    );

    let file4_div: any = document.getElementById("file4_div");
    let file4: any = document.getElementById("file4");
    file4_div.addEventListener(
      "click",
      function (e) {
        if (file4) {
          file4.click();
        }
        e.preventDefault(); 
      },
      false
    );

    let file9_div: any = document.getElementById("file9_div");
    let file9: any = document.getElementById("file9");
    file9_div.addEventListener(
      "click",
      function (e) {
        if (file9) {
          file9.click();
        }
        e.preventDefault(); 
      },
      false
    );
  }

  // 取消
  private empty() {
    (this.$refs["form"] as any).resetFields();
  }
  // 提交
  private submit() {
    this.$Bus.$emit("clearAll");
    jQuery.ajax({
      type: "POST",
      url: "/Building/JZWDT01/demo/file10",
      data: "",
      dataType: "json",
      async: false,
    });
    this.$Bus.$emit("BuildingModel");
  }

  private changeflie3(event) {
    let fileResultValue: any = event.target.value.split('\\');
    (this.$refs as any).file3_result.value = fileResultValue[fileResultValue.length-1];

    jQuery.ajaxFileUpload({
      type: "POST",
      url: "http://192.168.20.165:8081/JZWDT01/demo/file3",
      data: {},
      secureuri: false,
      fileElementId: "file3",
      dataType: "json",
      async: false,
    });
    /* disasterServer.BuildingDown(file).then((result: any)=>{
      console.log(result,"res")
    }) */
  }
  private changeflie4(event) {
    let fileResultValue: any = event.target.value.split('\\');
    (this.$refs as any).file4_result.value = fileResultValue[fileResultValue.length-1];
    jQuery.ajaxFileUpload({
      type: "POST",
      url: "http://192.168.20.165:8081/JZWDT01/demo/file4",
      data: {},
      secureuri: false,
      fileElementId: "file4",
      dataType: "json",
      async: false,
    });
    /* disasterServer.BuildingDown(file).then((result: any)=>{
      console.log(result,"res")
    }) */
  }
  private changeflie2(event) {
    let fileResultValue: any = event.target.value.split('\\');
    (this.$refs as any).file2_result.value = fileResultValue[fileResultValue.length-1];
    jQuery.ajaxFileUpload({
      type: "POST",
      url: "http://192.168.20.165:8081/JZWDT01/demo/file2",
      data: {},
      secureuri: false,
      fileElementId: "file2",
      dataType: "json",
      async: false,
    });
    /* disasterServer.BuildingDown(file).then((result: any)=>{
      console.log(result,"res")
    }) */
  }
  private changeflie1(event) {
    let fileResultValue: any = event.target.value.split('\\');
    (this.$refs as any).file1_result.value = fileResultValue[fileResultValue.length-1];
    jQuery.ajaxFileUpload({
      type: "POST",
      url: "http://192.168.20.165:8081/JZWDT01/demo/file1",
      data: {},
      secureuri: false,
      fileElementId: "file1",
      dataType: "json",
      async: false,
    });
    /* disasterServer.BuildingDown(file).then((result: any)=>{
      console.log(result,"res")
    }) */
  }
  private changeflie9(event) {
    let fileResultValue: any = event.target.value.split('\\');
    (this.$refs as any).file9_result.value = fileResultValue[fileResultValue.length-1];
    jQuery.ajaxFileUpload({
      type: "POST",
      url: "http://192.168.20.165:8081/JZWDT01/demo/file9",
      data: {},
      secureuri: false,
      fileElementId: "file9",
      dataType: "json",
      async: false,
    });
    /* disasterServer.BuildingDown(file).then((result: any)=>{
      console.log(result,"res")
    }) */
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
  background: url(~"@{img}/view/Architecture.png") no-repeat center left;
}
.OptimizationView {
  padding: 0 22px 25px 12px;
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
      cursor: pointer;
      color: #0ff;
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
.import_box {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  .import_in {
    display: block;
    width: 60px;
    height: 24px;
    background: url(~"@{img}/view/import_in_nor.png") no-repeat center;
    background-size: 100%;
    &:hover,
    &.active {
      background: url(~"@{img}/view/import_in_sel.png") no-repeat center;
      background-size: 100%;
    }
  }
  .import_hide {
    display: none;
  }
  .import_file_result{
    border: solid 1px;
    width: 80px;
    height: 22px;
    margin-left: 5px;
    border-radius: 5px;
    color: #0ff;
  }
}
</style>
