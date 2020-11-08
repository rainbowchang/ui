<template>
  <div class="wrappers">
    <div class="top">
      <el-button type="primary" icon="el-icon-arrow-left" @click="back">上一层</el-button>
      <span>时间作业状态</span>
      <div>
        <!-- <el-date-picker
          :style="{width:'240px'}"
          v-model="dateChoose"
          type="daterange"
          range-separator="——"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>-->
      </div>
    </div>
    <div class="currentdata">
      <DatePicker
        @on-change="changedate"
        @on-ok="suredata"
        type="date"
        confirm
        placeholder="请选择日期"
        style="width: 200px"
      ></DatePicker>
    </div>
    <div class="content">
      <Tabs value="name1">
        <TabPane label="设备序列号" name="name1">
          <div class="infolist">
            <div class="listcontent">
              <div v-for="(item,index) in statuslist" :key="index">
                <!-- 列表左侧名称 -->
                <div class="listleft listleft1">{{item.name}}</div>
                <!-- 中间图表 -->
                <div class="listmid">
                  <div>
                    <div class="statusline" style=" margin-bottom: -1.4%">
                      <!-- status:  1加工，2故障，3停机，4无状态，5断开 -->
                      <div
                        v-for="(value,index) in item.list"
                        :key="index"
                        :style="{width:value.percent}"
                        :class="value.status=='work'?'process':value.status=='alarm'?'breakdown':value.status=='stop'?'stop':value.status=='none'?'none':'interrupt'"
                      ></div>
                    </div>
                   <!--  <div class="timeline">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div> -->
                    <div class="timeline timeshow">
                      <div>04:00</div>
                      <div>08:00</div>
                      <div>12:00</div>
                      <div>16:00</div>
                      <div>20:00</div>
                      <div>24:00</div>
                    </div>
                  </div>
                  <div class="colorline"> 
                    <div>
                      <div class="process"></div>
                      <span>加工：{{item.timeWork}}</span>
                    </div>
                    <div>
                      <div class="breakdown"></div>
                      <span>故障：{{item.timeAlarm}}</span>
                    </div>
                    <div>
                      <div class="stop"></div>
                      <span>停机：{{item.timeStop}}</span>
                    </div>
                  </div>
                </div>
                <!-- 右侧环装图 -->
                <div class="listright">
                  <div>
                    <span>故障占比</span>
                    <i-circle :percent="item.alarmWeight" stroke-color="#ff5500" :size="80">
                      <span class="demo-Circle-inner" style="font-size:16px">{{Math.round(item.alarmWeight)}}%</span>
                    </i-circle>
                  </div>
                  <div>
                    <span>加工占比</span>
                    <i-circle :percent="item.workWeight" stroke-color="#089642" :size="80">
                      <span class="demo-Circle-inner" style="font-size:16px">{{Math.round(item.workWeight)}}%</span>
                    </i-circle>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <div class="chartsshow">
      <div v-for="(value,index) in metalist" :key="index">
        <div class="listleft listleft1">{{value.name}}</div>
        <div class="headBottom">
          <div :id="value.bottom" :style="{width: '100%', height: '100%'}"></div>
        </div>
        <div class="pieshow">
          <DatePicker
            type="daterange"
            :style="{width:'240px'}"
            placement="bottom-end"
            placeholder="请选择开始日期——结束日期"
            style="width: 200px;margin-bottom:1em;"
            @on-change="value.func"
          ></DatePicker>
          <div :id="value.chart" :style="{width: '100%', height: '100%'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {post} from "@/apis/restUtils"
export default {
  props: ["statusinfo"],
  data() {
    return {
      dateChoose2: "",
      dateChoose1: "",
      currentdate: "",
      currentPage: 1, //分页当前页数,
      selections: [],
      statuslist: [
        {
          timeWork: "",
          timeAlarm: "",
          timeStop: "",
          list: [
            { percent: "18%", status: 'work' },
            { percent: "66%", status: 'alarm' },
            { percent: "36%", status: 'stop' }
          ],
          name: "ZHUGANGZHI-1",
        },
        {
          timeWork: "",
          timeAlarm: "",
          timeStop: "",
          list: [
            { percent: "10%", status: 'alarm' },
            { percent: "40%", status: 'stop' },
            { percent: "50%", status: 'work' }
          ],
          name: "ZHUGANGZHI-2"
        },
        {
          timeWork: "",
          timeAlarm: "",
          timeStop: "",
          list: [
            { percent: "10%", status: 'alarm' },
            { percent: "28%", status: 'stop' },
            { percent: "62%", status: 'work' },
          ],
          name: "ZHUGANGZHI-3"
        }
      ], //状态数组status状态，percent百分比
      metalist: [
        {
          func: function(){},
          chart: "myChart2",
          bottom: "bottom-sn-1",
          name: "ZHUGANGZHI-1"
        },
        {
          func: function(){},
          chart: "myChart3",
          bottom: "myChartBottom3",
          name: "ZHUGANGZHI-2"
        }
      ]
    };
  },
  methods: {
    //返回上一层
    back() {
      this.$emit("modelshow", false);
    },
    //   分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //去人日期
    suredata() {
      console.log("当前确认的日期", this.currentdate);
      this.statuslist = [];
      for(let i = 0; i < this.selections.length; i++){
        post("/organization/customer/getOneDayStatus", {"serial":this.selections[i].serial,"date":this.currentdate}, 
          reponse => {
            this.statuslist.splice(i,0,reponse.data);
        });
      }  
    },
    //日期改变
    changedate(e) {
      console.log("第一个pie状图上方时间选择", e);
      this.currentdate = e;
    },
    cahngedate1(e) {
      this.dateChoose1 = e;
    },
    cahngedate2(e) {
      this.dateChoose2 = e;
      console.log("第二个pie状图上方时间选择", this.dateChoose2);
    },
    getBottom(dateData, workData, bottom) {
      console.log("workdata", workData);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById(bottom)
      );
      let option = {
         title: {
            text: "阶段时间机床利用率",
            left: 'center'
         },
        color: ["#3398DB"], 
        tooltip: {
          trigger: "axis",
          formatter: "{c}%",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: dateData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            name:'利用率占比',
            type: "value",
            max: 100,
            axisLabel: {formatter: "{value} %"}
          }
        ],
        series: [
          {
            name: "百分比",
            type: "bar",
            barWidth: "30%",
            data: workData,
            itemStyle: {
              normal: {
                color: "#009a44"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    getpie(pieData, chart) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(chart));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["加工", "故障", "停机", "无状态"]
        },
        series: [
          {
            orient: "vertical",
            x: "right",
            name: "情况详情",
            type: "pie",
            radius: ["0%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: pieData,
            color: ["#089642", "#fb0200", "#fffc02", "#808080", "#D3D3D3"]
          }
        ]
      };
      //使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getBottom2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("myChartBottom3")
      );
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2019-10-01",
              "2019-10-02",
              "2019-10-03",
              "2019-10-04",
              "2019-10-05",
              "2019-10-06",
              "2019-10-07",
              "2019-10-08",
              "2019-10-09",
              "2019-10-10",
              "2019-10-11",
              "2019-10-12",
              "2019-10-13",
              "2019-10-14",
              "2019-10-15"
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "百分比",
            type: "bar",
            barWidth: "30%",
            data: [10, 52, 20, 34, 39, 30, 22, 68, 32, 15, 59, 64, 21, 54, 89],
            itemStyle: {
              normal: {
                color: "#009a44"
              }
            }
          }
        ]
      };
      // var myChart = echarts.init(document.getElementById('myChartBottom'))
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getpie2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["加工", "故障", "停机", "未连接"]
        },
        series: [
          {
            orient: "vertical",
            x: "right",
            name: "情况详情",
            type: "pie",
            radius: ["0%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              { value: 335, name: "加工" },
              { value: 310, name: "故障" },
              { value: 234, name: "停机" },
              { value: 135, name: "未连接" }
            ],
            color: ["#089642", "#fb0200", "#fffc02", "#808080"]
          }
        ]
      };
      // var myChart = echarts.init(document.getElementById('myChart2'))
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  watch: {
    statusinfo(val) {
      console.log("表格选中的行信息", val.selections);
      if (val.statusinfoshow) {
        // this.getBottom();
        // this.getpie();
        // this.getBottom2();
        // this.getpie2();
        this.selections = val.selections;
        this.metalist = [];

        for(let selection of this.selections){
          let serial = selection.serial;
          let getBottom = this.getBottom;
          let getPie = this.getpie
          this.metalist.push({"name":serial,"bottom":"bottom-"+serial,"chart":"chart-"+serial,
            "func":function(e){
              post("/organization/customer/getPeriodStatus",
                {"serial":serial,"startDate":e[0],"endDate":e[1]},
                reponse => {
                  getBottom(reponse.data.dateData, reponse.data.workData, "bottom-"+serial);
                  getPie(reponse.data.pieData, "chart-"+serial);
              });
            }})
        }

        this.statuslist = [];
        for(let i = 0; i < this.selections.length; i++){  
          let serial = this.selections[i].serial; 
          post("/organization/customer/getOneDayStatus", 
            {"serial":serial,"date":""}, 
            reponse => {
              this.statuslist.splice(i,0,reponse.data);
              console.log("status list" , this.statuslist);
          });
        }

        for(let selection of this.selections){
          let serial = selection.serial;
          post("/organization/customer/getPeriodStatus",
            {"serial":serial,"startDate":"","endDate":""},
            reponse => {
              this.getBottom(reponse.data.dateData, reponse.data.workData, "bottom-"+serial);
              this.getpie(reponse.data.pieData, "chart-"+serial);
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.wrappers {
  width: 100%;
  height: 100%;
  min-width: 1240px;
  /* min-height: 860px; */
  border-radius: 3px;
  background-color: white;
  position: relative;
  overflow: hidden;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
.chartsshow {
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1em;
  overflow: auto;
}
.chartsshow > div {
  width: 100%;
  min-height: 190px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
}
.pieshow {
  width: 20%;
}
.headBottom {
  width: 60%;
  height: 100%;
  max-width: 980px;
}
.top {
  width: 100%;
  padding: 0 2em;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.top > span {
  font-size: 18px;
  font-weight: bold;
}
.content {
  width: 100%;
  height: 45%;
  position: absolute;
  top: 100px;
  border-bottom: 2px solid gray;
  overflow: auto;
}
.content > div {
  width: 100%;
}
.infolist {
  width: 100%;
  min-height: 280px;
}
.listcontent {
  width: 100%;
}
/* 分页 */
.pagenum {
  text-align: center;
  position: absolute;
  bottom: 5em;
}
/* 列表内容 */
.listcontent {
  width: 100%;
}
.listcontent > div {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1em 1em;
  margin-bottom: 1.5em;
}
/* 列表左侧 */
.listleft {
  width: 15%;
  font-size: 16px;
  font-weight: bold;
  height: auto;
}
/* 列表中间 */
.listmid {
  width: 70%;
}
.colorline {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.colorline > div {
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4em;
  justify-content: center;
}
/* 列表右侧 */
.listright {
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.listright > div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.listright > div > span {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}
.process,
.breakdown,
.stop,
.none,
.interrupt {
  width: 64px;
  height: 12px;
  border-radius: 12px;
  background-color: #089642;
  margin-right: 0.5em;
}
.breakdown {
  background-color: #fb0200;
}
.stop {
  background-color: #fffc02;
}

.none{
  background-color: #C0C0C0
}

.interrupt {
  background-color: #808080;
}
.statusline {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.statusline > div {
  height: -1%;
  border: 0;
  border-radius: 0;
  margin: 0;
}
.timeline {
  width: 100%;
  height: 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e9e9e9;
}
.timeline > div {
  width: 13%;
  height: 10%;
  border-right: 1px solid #e9e9e9;
}
.timeshow {
  border: 0;
  /* background-color: #efefef; */
  height: 18px;
  align-items: center;
}
.timeshow > div {
  border: 0;
  text-align: right;
  transform: translateX(1em);
  margin-top: 2%
}
.currentdata {
  display: flex;
  flex-direction: row;
  width: 240px;
  justify-content: space-between;
  margin: 0 auto;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateX(6em);
}
.currentdata > span {
  cursor: pointer;
  font-size: 16px;
}
.date {
  color: #2c86ce;
}
.listleft.listleft1 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

