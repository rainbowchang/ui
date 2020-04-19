<template>
  <div class="center-warp">
    <div class="numleft">
      <h3 style="margin-bottom:2%">当前设备：{{sn.toUpperCase()}}</h3>
      <div class="title unread" style="margin-bottom:6px;">
        实时数据
        <span style="margin-right:0.5em;">当前刀位号：{{toolNumber}}</span>
        <span style="margin-right:0.5em;">当前程序名：{{currentProgram}}</span>
        <span>加工件数：{{workPieces}}</span>
        <div>
          <template>
            <table class="table-a" border="1" cellspacing="0" cellpadding="1" style="width: 100%;">
              <tr v-for="(item, i) in tableList" :key="i">
                <td width="25%" height="25%">{{ item.name + "坐标" }}</td>
                <td>{{item.number}}</td>
                <td width="20%" height="20%">
                  <button @click="editAxisDialog(item,i)" class="bottonStyle">编辑</button>
                </td>
              </tr>
            </table>
          </template>
        </div>
      </div>
      <div class="title unread" style="margin-bottom:6px;">
        负载
        <div style="margin-bottom:2px;">
          <template>
            <table class="table-b" border="0" cellspacing="0" cellpadding="1" style="width: 100%;">
              <tr v-for="(item,i) in tableList" :key="i" :class="item.showFlag ? '' : 'backopt'">
                <td style="width:20px;">{{ item.name }}</td>
                <td style="width:78%;">
                  <Progress :percent="item.percent" hide-info :stroke-width="20"></Progress>
                </td>
                 <td>
                  <span>{{item.load + "%"}}</span>
                </td>
                <td style="width:45px;">
                  <button v-if="item.showFlag" @click="handleSubmit(item,i, false)" class="bottonStyle">隐藏</button>
                  <button v-if="!item.showFlag" @click="handleSubmit(item,i, true)" class="bottonStyle">显示</button>
                </td>
              </tr>
            </table>
          </template>
        </div>
      </div>
      <div class="title unread">
        加工速度
        <div>
          <div style="text-align: right;">{{feedSpeed}}mm/min</div>
          <div id="myChart5" style="width:400%;height:200%;"></div>
          <!-- <ruleLine :number="1805"/> -->
          </div>
        </div>
      </div>
    <div class="numright">
      <div class="title unread" style="display: flex;white-space: nowrap;">
        <span style="width:30%;">倍率</span>
        <div style="width: 310px;height: 200px;margin:0em;margin-right:2em">
          <div id="myChart1" style="width: 250px;height: 250px;"></div>
          <div class="myChart1Title">主轴</div>
        </div>
        <div style="width: 310px;height: 200px;">
          <div id="myChart2" style="width: 250px;height: 250px;margin:0em;"></div>
          <div class="myChart2Title">进给</div>
        </div>
      </div>
      <div class="title unread" style="display: flex;white-space: nowrap;">
        <span style="width:30%">主轴负载/转速</span>
        <div style="width: 310px;height: 200px;">
          <div id="myChart3" style="width: 250px;height: 300px;margin-right:1em;"></div>
          <div class="myChart2Title">负载</div>
        </div>
        <div style="width: 310px;height: 200px;">
          <div id="myChart4" style="width: 250px;height: 300px;margin:0em;"></div>
          <div class="myChart2Title">转速</div>
        </div>
      </div>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-input placeholder="请输入内容" v-model="inputContent" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAxisName(inputContent)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import ruleLine from "./ruleLine";
import {post} from "@/apis/restUtils";

export default {
  components: {
    // ruleLine
  },
  props: ["detailinfo"],
  data() {
    return {
      inputContent: "",
      sn: "",
      workPieces: 0,
      feedSpeed: 0,
      itemParam: {},
      dialogVisible: false,
      tableList: [
        {
          number: "100000.0000",
          name: "X",
          percent: 50,
          load: 100,
          showFlag: true
        },
        {
          number: "100000.0000",
          name: "Y",
          percent: 30,
          load: 60,
          showFlag: true
        },
        {
          number: "100000.0000",
          name: "Z",
          percent: 90,
          load: 190,
          showFlag: true
        },
        {
          number: "100000.0000",
          name: "A",
          percent: 60,
          load: 120,
          showFlag: true
        },
        {
          number: null,
          name: "B",
          percent: 80,
          load: 160,
          showFlag: true
        },
        {
          number: null,
          name: "C",
          percent: 80,
          load: 160,
          showFlag: true
        },
        {
          number: null,
          name: "SP1",
          percent: 80,
          load: 160,
          showFlag: true
        },
        {
          number: null,
          name: "SP2",
          percent: 80,
          load: 160,
          showFlag: true
        }
      ]
    };
  },
  mounted() {
    this.getOverrides("myChart1", 0);
    this.getOverrides("myChart2", 0);
    this.getSpindleSpeed(0);
    this.getfeedSpeed(0);
  },
  watch: {
    detailinfo(val) {
      console.log("前一个页面传递来的信息", val);
      this.tableList = val.table;
      this.sn = val.sn;
      this.workPieces = val.workPieces;
      this.feedSpeed = val.feedSpeed;
      this.toolNumber=val.toolNumber;
      this.currentProgram=val.currentProgram;
      this.getOverrides("myChart1", val.spindleOverrides, 50,120, 14);
      this.getOverrides("myChart2", val.feedOverrides, 0,120, 12);
      this.getOverrides("myChart3", this.getSpindleLoad(), 0,100, 10);
      this.getSpindleSpeed(val.spindleSpeed, val.maxSpindleSpeed);
      this.getfeedSpeed(val.feedSpeed);
    }
  },
  methods: {
    getSpindleLoad(){
      return this.tableList[6].load;
    },
    // 倍率:主轴，进给
    getOverrides(charName, overrides, min, max, splitNumber) {
      console.log("overides:", overrides);
      let data = {
        value: Math.abs(overrides)
      };
      let showValue = data.value;
      if(data.value < min){
        showValue = min;
      }
      let option = {
        tooltip: {
          enterable: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "倍率 : {data.value}%" //数据格式
        },
        series: [
          {
            max: max,
            min: min,
            textStyle: {
              fontSize: 13
            },
            color: ["gray", "transparent"],
            splitNumber: splitNumber,
            name: "",
            type: "gauge",
            //仪表盘轴线相关配置。
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [(showValue - min) / (max-min), "#2d8cf0"],
                  [1, "gray"]
                ]
              }
            },
            splitLine: {
              show: true
            },
            //刻度样式。
            axisTick: {
              show: false
            },
            pointer: {
              // 仪表盘指针。
              show: false, // 是否显示指针,默认 true。
              length: "0%", // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 0 // 指针宽度,默认 8。
            },
            //刻度标签。
            axisLabel: {
              show: true,
              distance: -60,
              formatter: function(value) {
                switch (value) {
                  case 55:
                    return ""; //隐藏
                  case 65:
                    return ""; //隐藏
                  case 75:
                    return ""; //隐藏
                  case 85:
                    return ""; //隐藏
                  case 95:
                    return ""; //隐藏
                  case 105:
                    return ""; //隐藏
                  case 115:
                    return ""; //隐藏
                  default:
                    return value;
                }

              }
            },
            detail: {
              formatter: "{value}%",
              offsetCenter: [0, 0],
              textStyle: {
                fontSize: 14
              }
            },
            data: [{ value: data.value }]
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById(charName));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getSpindleSpeed(spindleSpeed, maxSpindleSpeed) {
      //this.getSpindleSpeedOveral(spindleSpeed,maxSpindleSpeed);
      this.getSpindleSpeedDetail(spindleSpeed, maxSpindleSpeed);
    },
    getSpindleSpeedOveral(spindleSpeed, maxSpindleSpeed){
      // 仪表盘所需数据
      if(maxSpindleSpeed == null){
        maxSpindleSpeed = 30000;
      }
      var data = {
        value: spindleSpeed
      };
      let option = {
        tooltip: {
          // 本系列特定的 tooltip 设定。
          show: true,
          formatter: "{b}：{c}%",
          backgroundColor: "rgba(50,50,50,0.7)", // 提示框浮层的背景颜色。注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
          borderColor: "#333", // 提示框浮层的边框颜色。...
          borderWidth: 0, // 提示框浮层的边框宽。...
          padding: 5, // 提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。...
          textStyle: {
            // 提示框浮层的文本样式。...
            // color ,fontStyle ,fontWeight ,fontFamily ,fontSize ,lineHeight ,.......
          }
        },
        series: [
          {
            max: maxSpindleSpeed,
            min: 0,
            splitNumber: 2,
            color: ["grey", "transparent"],
            name: "业务指标",
            type: "gauge",
            center: ["50%", "50%"], // 仪表盘位置(圆心坐标)
            // startAngle: 270,
            //结束角度。
            // endAngle: 0,
            //仪表盘轴线相关配置。
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [data.value / 30000, "#2d8cf0"],
                  [1, "gray"]
                ]
              }
            },
            splitLine: {
              show: true
            },
            //刻度样式。
            axisTick: {
              show: false
            },
            //刻度标签。
            axisLabel: {
              show: true,
              distance: -65
            },
            pointer: {
              // 仪表盘指针。
              show: false, // 是否显示指针,默认 true。
              length: "70%", // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 5 // 指针宽度,默认 8。
            },
            detail: {
              formatter: "{value}rpm",
              offsetCenter: [0, 0],
              textStyle: {
                fontSize: 14
              }
            },
            data: [{ value: data.value }]
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getSpindleSpeedDetail(spindleSpeed, maxSpindleSpeed) {
      if(maxSpindleSpeed == null){
        maxSpindleSpeed = 30000;
      }
      var data = {
        value: spindleSpeed
      };
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            max: maxSpindleSpeed,
            min: 0,
            color: ["gray", "transparent"],
            splitNumber: 10,
            center: ["50%", "50%"], // 仪表盘位置(圆心坐标)
            name: "业务指标",
            type: "gauge",
            //仪表盘轴线相关配置。
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  // [data.value / 30000, "gray"],
                  [0.8, "green"],
                  [0.9, "#e6a23c"],
                  [1, "#ed4014"]
                ]
              }
            },
            splitLine: {
              show: true
            },
            pointer: {
              // 仪表盘指针。
              show: true, // 是否显示指针,默认 true。
              length: "65%", // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 5 // 指针宽度,默认 8。
            },
            //刻度样式。
            axisTick: {
              show: false
            },
            //刻度标签。
            axisLabel: {
              show: true,
              color: "gray",
              fontSize: 10,
              padding: 2,
              distance: -65,
              formatter: function(value) {
                switch (value) {
                  case 1500:
                    return ""; //隐藏
                  case 4500:
                    return ""; //隐藏
                  case 7500:
                    return ""; //隐藏
                  case 10500:
                    return ""; //隐藏
                  case 13500:
                    return ""; //隐藏
                  case 16500:
                    return ""; //隐藏
                  case 19500:
                    return ""; //隐藏
                  case 22500:
                    return ""; //隐藏
                  case 25500:
                    return ""; //隐藏
                  case 28500:
                    return ""; //隐藏
                  default:
                    return value;
                }
              }
            },
            detail: {
              formatter: "",
              textStyle: {
                fontSize: 12
              }
            },
            data: [{ value: data.value }]
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getfeedSpeed(feedSpeed) {
      var data = {
        value: feedSpeed
      };
      let myChart = this.$echarts.init(document.getElementById("myChart5"));
      let option = {
        yAxis: [
          {
            type: "category",
            data: [""],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "category",
            data: [""],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        xAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        tooltip: {
          formatter: "{a}: {c}"
        },
        grid: {
          containLabel: true,
          width: "95%",
          height: 80,
          left: 0,
          top: 5,
          bottom: 0
        },
        series: [
          {
            name: "差",
            splitNumber: 8,
            data: [5000],
            type: "bar",
            yAxisIndex: 0,
            stack: "range",
            silent: true,
            barWidth: 50,
            color: "#dddddd"
          },
          {
            name: "实际值",
            data: [data.value],
            type: "bar",
            yAxisIndex: 1,
            barWidth: 50,
            color: "#2d8cf0",
            z: 3
          }
        ]
      };
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    handleSubmit(item, index, show) {
      this.tableList[index].showFlag = show;
      var param = {
          currentName: item.name,
          sn: this.sn,
          show: show
      }
      post("/plcInfo/updateAxis", param,response=>{
         var result = response.data;
         if(result.status == "fail"){
           alert(result.message);
         }
      });
      console.log(item, index);
    },
    editAxisDialog(item, index) {
      console.log(item, index);
      this.itemParam = item;
      this.inputContent = item.name;
      this.itemParam.currentName = item.name;
      this.dialogVisible = true;
    },
    editAxisName(name) {
      console.log("name",name);
      this.itemParam.newName = name;
      this.itemParam.sn = this.sn;
      post("/plcInfo/updateAxis", this.itemParam,response=>{
         var result = response.data;
         if(result.status == "fail"){
           alert(result.message);
         }
      });
      this.dialogVisible = false;
    },
    handleClose() {
      console.log(this.itemParam);
    }
  }
};
</script>
<style scoped lang="less">
.center-warp {
  display: flex;
  overflow: auto;
  overflow-x: hidden;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  .numleft {
    width: 30vw !important;
    transform: translateX(2em);
  }
  .numright {
    width: 42vw !important;
    padding-left: 4em;
  }
}
.title {
  font-size: 17px;
  margin-left: 10px;
}
.unread {
  position: relative;
  margin-bottom: 2em;
}
.unread:after {
  content: " ";
  position: absolute;
  left: -13px;
  top: 8px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 4px;
}
.table-a {
  border: 0px solid gray;
  td {
    text-align: center;
    .bottonStyle {
      width: 100%;
      border: 0;
    }
  }
}
.table-b {
  td {
    text-align: center;
    .bottonStyle {
      width: 100%;
      border: 0;
      white-space: nowrap;
      background-color:lightGray;
    }
  }
}
.myChart1Title {
  position: relative;
    bottom: 23%;
  /* text-align: center; */
  left: 43%;
  /* right: 10px; */
}
.myChart2Title {
  position: relative;
  bottom: 23%;
  right: -42%;
}
.backopt {
  opacity: 0.3;
}
</style>