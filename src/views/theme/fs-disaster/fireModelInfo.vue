<template>
  <div class="full fullRight">
    <div class="fire_title"></div>
    <!-- <div class="goback" @click="goback">返回</div> -->
    <div class="fire_con OptimizationView">
      <div class="Optimization zkb_scrollbar">
        <div class="right-search">
          <input
            class="search-input"
            type="text"
            placeholder="Search the model"
            v-model="searchVal"
            @keyup.13 = "seachBtn"
          />
          <i class="icon-search"></i>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="UPLATLD"
              width="150">
            </el-table-column>
            <el-table-column
              prop="text"
              label="FMOO1"
              >
            </el-table-column>
          </el-table>
        </div>
        <div class="bottom_btn">
          <div class="btn_item" @click="submit">执行模拟</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { szFireModelServe } from "@/api/installServer";
import { modulePath } from "@/config";

interface opt {
  // sceneId: string | number;
  // accidentRoad: [] | string | object;
  [key: string]: any;
}

@Component({
  name: "fireModelInfo",
  components: {},
})
export default class fireModelInfo extends Vue {
  @Prop() private defaultData?: any;
  private Opt: opt = {
    coordinate: "", //
    seep: "1.4",
    direction: "45",
    temperature: "22.3",
    humidity: "21",
    startTime: "",
    duration: "24",
    scale: "1",
  };
  private searchVal: any = '';
  private tableData: any = [
    {
      name: 'Name',
      text: 'Fire model',
    }, {
      name: 'Type',
      text: '10600',
    }, {
      name: 'Function',
      text: 'simulation',
    }, {
      name: 'Provider',
      text: 'Tsinghua university',
    }, {
      name: 'Disaster URL',
      text: 'https://192.168.223.108//fire',
    }, {
      name: 'QoS value',
      text: '10.0',
    }, {
      name: 'Description',
      text: 'This model is used for foreset fire simulation',
    }
  ]
  private mounted() {
    if (this.defaultData) {
      this.Opt = this.defaultData;
    }
    
  }

  // 提交
  private submit() {
    
  }
  
}
</script>
<style lang="less" scoped>
@img: "../../../assets/img/fireView/fsfireView";
@img2: "../../../assets/img";
.fire_title {
  background: url(~"@{img}/title.png") no-repeat center left;
}
.OptimizationView {
  padding: 0 22px 25px 12px;
  .right-search{
    width: 65%;
    height: 30px;
    line-height: 30px;
    border: 1px solid rgb(33, 149, 179);
    display: flex;
    padding-left: 12px;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 20px;
    background: ~"url(@{img}/beijing.png)";
    border-radius: 2px;
    input {
      background: none;
      outline: none;
      resize: none;
      border: none;
      width: calc(100% - 30px);
      color: #0ff;
    }
    input::-webkit-input-placeholder{
      color: #0ff;
    }
    .icon-search {
      width: 30px;
      height: 30px;
      background: ~"url(@{img}/search.png)" no-repeat center center;
      background-color: rgb(34, 69, 101);
      cursor: pointer;
    }
  }
  .table{
    .el-table{
      color: #0ff;
    }
    /deep/.el-table .cell{
      line-height: 14px;
    }
    /deep/.el-table th, /deep/.el-table tr{
      background-color: rgb(2, 33, 57);
    }
    /deep/.el-table--enable-row-hover .el-table__body tr:hover>td{
      background-color: rgb(2, 33, 57);
    }
    /deep/.el-table thead{
      color: #0ff;
    }
    .el-table--border, .el-table--group{
      border: 1px solid rgb(3, 101, 134);
    }
    .el-table--border::after, .el-table--group::after, .el-table::before{
      background-color: rgb(3, 101, 134);
    }
    /deep/.el-table td, /deep/.el-table th.is-leaf{
      border: 1px solid rgb(7, 48, 91);
    }
    /deep/.el-table--border td, /deep/.el-table--border th, /deep/.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
      border: 1px solid rgb(7, 48, 91);
    }
  }
  .bottom_btn {
    display: flex;
    justify-content: space-around;
    height: 75px;
    align-items: center;
    .btn_item {
      width: 132px;
      height: 42px;
      background: url(~"@{img2}/model/nor.png") no-repeat center center;
      background-size: 132px 42px;
      line-height: 42px;
      font-size: 16px;
      cursor: pointer;
      color: #0ff;
      &:hover,
      &:active {
        background: url(~"@{img2}/model/sel.png") no-repeat center center;
        background-size: 132px 42px;
      }
    }
  }
}
</style>
