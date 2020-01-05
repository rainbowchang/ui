<template>
  <div class="center-warp">
    <div class="numleft">
      <div class="title unread">
        实时数据
        <span>当前刀位号：1</span>
        <span>当前程序名：NC0035</span>
        <div>
          <template>
            <table class="table-a" width="340" border="1" cellspacing="0" cellpadding="5">
              <tr v-for="(item, i) in tableList" :key="i">
                <td>{{ item.x }}</td>
                <td>{{item.number}}</td>
                <td>
                  <button v-if="item.number" @click="editName(item,i)" class="bottonStyle">编辑</button>
                </td>
              </tr>
            </table>
          </template>
        </div>
      </div>
      <div class="title unread">
        负载
        <div>
          <template>
            <table class="table-b" width="360" border="0" cellspacing="10" cellpadding="5">
              <tr v-for="(item,i) in tableList" :key="i" :class="item.showFlag ? '' : 'backopt'">
                <td style="width:20px;">{{ item.name }}</td>
                <td>
                  <Progress :percent="item.percent" hide-info :stroke-width="20"></Progress>
                </td>
                <td style="width:45px;">
                  <button v-if="item.showFlag" @click="handleSubmit(item,i)" class="bottonStyle">显示</button>
                  <button v-if="!item.showFlag" @click="handleSubmit(item,i)" class="bottonStyle">隐藏</button>
                </td>
              </tr>
            </table>
          </template>
        </div>
      </div>
      <div class="title unread">
        当前给进
        <div style="width:30vw;height:150px;">
          <!-- <div style="text-align: right;">1805mm/min</div> -->
          <div id="myChart5" style="width:30vw;height:200px;"></div>
          <!-- <ruleLine :number="1805"/> -->
        </div>
      </div>
    </div>
    <div class="numright">
      <div class="title unread" style="display: flex;white-space: nowrap;">
        倍率
        <div style="width: 310px;height: 300px;">
          <div id="myChart1" style="width: 240px;height: 240px;"></div>
          <div class="myChart1Title">主轴</div>
        </div>
        <div style="width: 310px;height: 300px;">
          <div id="myChart2" style="width: 240px;height: 240px;"></div>
          <div class="myChart2Title">进给</div>
        </div>
      </div>
      <div class="title unread" style="display: flex;white-space: nowrap;">
        主轴转速
        <div style="width: 250px;height: 240px;">
          <div id="myChart3" style="width: 230px;height: 210px;"></div>
        </div>
        <div style="width: 250px;height: 240px;">
          <div id="myChart4" style="width: 220px;height: 210px;"></div>
        </div>
      </div>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-input placeholder="请输入内容" v-model="itemParam.x" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import ruleLine from "./ruleLine";
export default {
  components: {
    // ruleLine
  },
  props: ["detailinfo"],
  data() {
    return {
      itemParam: {},
      dialogVisible: false,
      tableList: [
        {
          x: "X坐标",
          number: "100000.0000",
          name: "X",
          percent: 50,
          showFlag: true
        },
        {
          x: "Y坐标",
          number: "100000.0000",
          name: "Y",
          percent: 30,
          showFlag: true
        },
        {
          x: "Z坐标",
          number: "100000.0000",
          name: "Z",
          percent: 90,
          showFlag: true
        },
        {
          x: "A坐标",
          number: "100000.0000",
          name: "A",
          percent: 60,
          showFlag: true
        },
        {
          x: "B坐标",
          number: null,
          name: "B",
          percent: 80,
          showFlag: true
        },
        {
          x: "C坐标",
          number: null,
          name: "C",
          percent: 80,
          showFlag: true
        },
        {
          x: "SP1坐标",
          number: null,
          name: "SP1",
          percent: 80,
          showFlag: true
        },
        {
          x: "SP2坐标",
          number: null,
          name: "SP2",
          percent: 80,
          showFlag: true
        }
      ]
    };
  },
  mounted() {
    this.getRightBottom();
    this.getRightBottom2();
    this.getRightBottom3();
    this.getRightBottom4();
    this.getRightBottom5();
  },
  watch: {
    detailinfo(val) {
      console.log("前一个页面传递来的信息", val);
      this.tableList = val.table;
      this.getRightBottom(val.feedOverrides);
      this.getRightBottom2(val.spindleOverrides);
      this.getRightBottom3(val.feedSpeed);
      this.getRightBottom4(val.feedSpeed);
      this.getRightBottom5(val.spindleSpeed);
    }
  },
  methods: {
    getRightBottom(feedOverrides) {
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            max: 120,
            min: 50,
            splitNumber: 14,
            name: "业务指标",
            type: "gauge",
            //仪表盘轴线相关配置。
            axisLine: {
              show: true
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
              textStyle: {
                fontSize: 12
              }
            },
            data: [{ value: feedOverrides, name: "主轴" }]
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getRightBottom2(spindleOverrides) {
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            max: 120,
            min: 0,
            splitNumber: 24,
            name: "业务指标",
            type: "gauge",
            //仪表盘轴线相关配置。
            axisLine: {
              show: true
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
              distance: -60,
              formatter: function(value) {
                switch (value) {
                  case 5:
                    return ""; //隐藏
                  case 15:
                    return ""; //隐藏
                  case 25:
                    return ""; //隐藏
                  case 35:
                    return ""; //隐藏
                  case 45:
                    return ""; //隐藏
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
              textStyle: {
                fontSize: 12
              }
            },
            data: [{ value: spindleOverrides, name: "主轴" }]
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getRightBottom3(feedSpeed) {
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            max: 30000,
            min: 0,
            splitNumber: 2,
            name: "业务指标",
            type: "gauge",
            startAngle: 270,
            //结束角度。
            endAngle: 0,
            //仪表盘轴线相关配置。
            axisLine: {
              show: true
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
            detail: {
              formatter: "{value}rpm",
              textStyle: {
                fontSize: 12
              }
            },
            data: [{ value: feedSpeed }]
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getRightBottom4(feedSpeed) {
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            max: 30000,
            min: 0,
            splitNumber: 20,
            name: "业务指标",
            type: "gauge",
            //仪表盘轴线相关配置。
            axisLine: {
              show: true
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
                  // case 105:
                  //     return '';//隐藏
                  // case 115:
                  //     return '';//隐藏
                  default:
                    return value;
                }
              }
            },
            detail: {
              formatter: "{value}rpm",
              textStyle: {
                fontSize: 12
              }
            },
            data: [{ value: feedSpeed }]
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("myChart4"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getRightBottom5(spindleSpeed) {
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
          height: 120,
          left: 0,
          top: 50
        },
        series: [
          {
            name: "差",
            splitNumber: 8,
            data: [80000],
            type: "bar",
            yAxisIndex: 0,
            stack: "range",
            silent: true,
            barWidth: 50,
            color: "#dddddd"
          },
          {
            name: "实际值",
            data: [spindleSpeed],
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
    handleSubmit(item, index) {
      this.tableList[index].showFlag = !this.tableList[index].showFlag;
      console.log(item, index);
    },
    editName(item, index) {
      console.log(item, index);
      this.itemParam = item;
      this.dialogVisible = true;
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
  border: 1px solid gray;
  td {
    text-align: center;
    .bottonStyle {
      width: 100px;
      border: 0;
    }
  }
}
.table-b {
  td {
    text-align: center;
    .bottonStyle {
      width: 40px;
      border: 0;
    }
  }
}
.myChart1Title {
  position: absolute;
  bottom: 20px;
  /* text-align: center; */
  left: 20%;
  /* right: 10px; */
}
.myChart2Title {
  position: absolute;
  bottom: 20px;
  right: 27%;
}
.backopt {
  opacity: 0.3;
}
</style>