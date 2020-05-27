<template>
  <div class="wrapper">
    <div class="title titletip">
      <h3 class="cpname">南京远控信息科技有限公司</h3>
      <h2>设备监控平台</h2>
      <span @click="back">返回上一级</span>
    </div>
    <div class="content">
      <!-- 首页左侧 -->
      <div class="leftcontent">
        <div class="headList">
          <ul>
            <li class="title1">
              <div class="with15">区域</div>
              <div class="with10">机床总数</div>
              <div class="with25">机床实时状态及数量</div>
            </li>
            <li v-for="(item,index) in headlist" :key="index">
              <div class="with15">{{item.area}}</div>
              <div class="with10">{{item.total}}台</div>
              <div class="with25">
                <template>
                  <div class="statusline">
                    <!-- status:  1加工，2故障，3停机，4关机，5断开 -->
                    <div
                      v-for="(value,index) in item.list"
                      :key="index"
                      :style="{width:value.percent}"
                      :class="value.status==1?'process':value.status==2?'breakdown':value.status==3?'stop':value.status==4?'off':'interrupt'"
                    ></div>
                  </div>
                </template>
              </div>
            </li>
          </ul>
        </div>
        <div class="headBottom" style="overflow-y:scroll; overflow-x:scroll;">
          <div id="myChartBottom" :style="{width: '95%', height: '500px'}"></div>
        </div>
      </div>
      <div class="map">
        <!-- 中国地图 -->
        <div id="myChartChina" :style="{width: '100%', height: '400px'}"></div>
        <div class="infolist" >
          <ul>
            <li class="title">
              <div>序号</div>
              <div>报警时间</div>
              <div>机床型号</div>
              <div>出厂编号</div>
              <div>客户名称</div>
              <div>报警编号</div>
            </li>
            <div style="overflow-y:scroll; overflow-x:scroll;">
              <li v-for="(item,index) in infolist" :key="index" style="font-size:0.8rem;">
                <div>{{item.index}}</div>
                <div>{{item.warningTime}}</div>
                <div>{{item.plcType}}</div>
                <div>{{item.sn}}</div>
                <div>{{item.name}}</div>
                <div>{{item.warningCode}}</div>
              </li>
          </div>
          </ul>
        </div>
      </div>
      <!-- 首页右侧 -->
      <div class="echartinfo" style="margin-top:0;">
        <div>
          <div id="myChartRight" :style="{width: '95%', height: '62%'}"></div>
          <div class="infolist1" style="margin-top:0;">
            <ul>
              <li class="title">
                <div>加工</div>
                <div>故障</div>
                <div>停机</div>
                <div>未连接</div>
              </li>
              <li style="font-size:0.8rem;">
                <div>{{statusNum[0].value}}</div>
                <div>{{statusNum[1].value}}</div>
                <div>{{statusNum[2].value}}</div>
                <div>{{statusNum[3].value}}</div>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <div id="myChartRightBottom" :style="{width: '95%', height: '86%'}"></div>
          <div class="infolist1">
            <ul>
              <li class="title" style="white-space: wrapper;font-size:0.9rem;">
                <div>龙门移动式</div>
                <div>卧式加工中心</div>
                <div>立式加工中心</div>
                <div>横梁移动式</div>
                <div style="font-size:0.8rem">
                  高速型材
                  <br />复材加工中心
                </div>
              </li>
              <li style="font-size:0.8rem;">
                <div>144</div>
                <div>48</div>
                <div>149</div>
                <div>72</div>
                <div>74</div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import "echarts/map/js/china.js";
import {post, get, areas, provinces, getAreaByProvince} from "@/apis/restUtils";
// import Heatmap from "heatmap.js";
export default {
  data() {
    return {
      statusNum: [{name:"加工", value:0}, {name:"故障",value:0}, {name:"停机",value:0}, {name:"未连接",value:0}],
      headlist: [
        {
          id: 1,
          list: [
            { percent: "18%", status: 1 },
            { percent: "12%", status: 2 },
            { percent: "34%", status: 3 },
            { percent: "36%", status: 5 }
          ],
          area: "西南区域",
          total: 100,
          firstNum: 20,
          secondNum: 30,
          thridNum: 10
        },
        {
          id: 1,
          list: [
            { percent: "10%", status: 2 },
            { percent: "28%", status: 3 },
            { percent: "12%", status: 1 },
            { percent: "50%", status: 5 }
          ],
          area: "西北区域",
          total: 70,
          firstNum: 40,
          secondNum: 20,
          thridNum: 15
        },
        {
          id: 1,
          list: [
            { percent: "10%", status: 2 },
            { percent: "28%", status: 3 },
            { percent: "12%", status: 1 },
            { percent: "50%", status: 5 }
          ],
          area: "华东区域",
          total: 80,
          firstNum: 50,
          secondNum: 10,
          thridNum: 10
        },
        {
          id: 1,
          list: [
            { percent: "10%", status: 2 },
            { percent: "28%", status: 3 },
            { percent: "12%", status: 1 },
            { percent: "50%", status: 5 }
          ],
          area: "华北区域",
          total: 90,
          firstNum: 30,
          secondNum: 15,
          thridNum: 20
        },
        {
          id: 1,
          list: [
            { percent: "10%", status: 2 },
            { percent: "28%", status: 3 },
            { percent: "12%", status: 1 },
            { percent: "50%", status: 5 }
          ],
          area: "东北区域",
          total: 80,
          firstNum: 30,
          secondNum: 15,
          thridNum: 20
        },
        {
          id: 1,
          list: [
            { percent: "15%", status: 2 },
            { percent: "8%", status: 3 },
            { percent: "32%", status: 1 },
            { percent: "45%", status: 5 }
          ],
          area: "华南区域",
          total: 60,
          firstNum: 30,
          secondNum: 15,
          thridNum: 20
        }
      ],
      infolist: [
        {
          index: 1,
          name: "客户1",
          plcType: "VCER5512",
          warningTime: "2019.09.20",
          sn: "12638055",
          warnningCode: "7rg6566"
        },
        {
          index: 2,
          name: "客户2",
          plcType: "VC325",
          warningTime: "2019.09.20",
          sn: "12638055",
          warningCode: "7rg6566"
        },
        {
          index: 3,
          name: "客户3",
          plcType: "VJWE32Y",
          warningTime: "2019.09.20",
          sn: "51684155",
          warningCode: "7rg6566"
        },
        {
          index: 4,
          name: "客户4",
          plcType: "NDFW4Y",
          warningTime: "2019.09.20",
          sn: "12638055",
          warningCode: "7rg6566"
        },
        {
          index: 5,
          name: "客户5",
          jcxh: "JRS5555",
          warningTime: "2019.09.20",
          xlh: "12638055",
          warningCode: "7rg6566"
        }
      ]
    };
  },

  mounted() {
    this.sendArea();
    this.sendProvince();
    this.sendWarning();
    this.getBottom();
    this.getRight(this.statusNum);
    this.getRightBottom();
    this.drawLine();
  },
  methods: {
    sendArea(){
      var areaPaths = [];
      areas.forEach(e => {
        areaPaths.push("/按区域分类/" + e)
      })
      post("/organization/getAreaPlcInfo", areaPaths, reponse => {
        if(reponse.data != "") {
          this.headlist = reponse.data;
          this.headlist.forEach(e => {
            this.statusNum[0].value += e.firstNum;
            this.statusNum[1].value += e.secondNum;
            this.statusNum[2].value += e.thridNum;
            this.statusNum[3].value += (e.total - (e.firstNum + e.secondNum + e.thridNum));
          })
          this.getBottom();
          this.getRight(this.statusNum);
          this.getRightBottom();
        }
      });
    },

    sendProvince(){
      var provincePaths = [];
      provinces.forEach(e => provincePaths.push("/按区域分类/" + getAreaByProvince(e) + "/" + e));
      post("/organization/getProvincePlcInfo", provincePaths, reponse => {
        if(reponse.data != "") {
          this.drawLine(reponse.data);
        }
      })
    },
    
    sendWarning(){
      get("/organization/getWarningPlcInfo", reponse => {
        if(reponse.data != ""){
          this.infolist = reponse.data;
        }
      })
    },

    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      var myChartContainer = document.getElementById("myChartChina");
      var resizeMyChartContainer = function() {
        myChartContainer.style.width = 100 + "%"; //页面一半的大小

        myChartContainer.style.height = 50 + "%"; //页面一半的大小
      };
      resizeMyChartContainer();
      var myChartChina = this.$echarts.init(myChartContainer);

      // 绘制图表
      var optionMap = {
        tooltip: {},
        legend: {
          orient: "vertical",
          data: [""]
        },
        selectedMode: "single",
        series: [
          {
            name: "",
            type: "map",
            left: "10%",
            top: "10%",
            zoom: 1.2,
            mapType: "china",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)",
                background: "#3464c6",
                areaStyle: { color: "#3464c6" }
              },
              emphasis: { label: { show: true } }
            },
            showLegendSymbol: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: data
          }
        ]
      };

      myChartChina.setOption(optionMap);
      window.onresize = function() {
        resizeMyChartContainer();
        myChartChina.resize();
      };
    },
    getBottom() {
      // 基于准备好的dom，初始化echarts实例
      // 数据组织
      let titleList = [];
      let seriesList = [];
      if (this.headlist && this.headlist.length > 0) {
        this.headlist.forEach(n => {
          titleList.push(n.area);
          seriesList.push(n.total);
        });
        console.log("series list:",seriesList);
      }
      let myChartBottomElement = document.getElementById("myChartBottom");
      let myChart = this.$echarts.init(
        myChartBottomElement 
      );
      var option = {
        title: {
          text: "单位:台",
          textStyle: {
            fontWeight: "normal", //标题颜色
            color: "#fff",
            fontSize: 12,
            marginTop: 60
          }
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          lineStyle: {
            color: "#fff"
          },
          left: "3%",
          right: "4%",
          bottom: "40%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: titleList,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff",
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              rotate: 50
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#ffffff",
                width: 1 //这里是为了突出显示加上的
              }
            },
            splitLine: {
              //网格线
              show: false
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "50%",
            data: seriesList
          }
        ]
      };
      // var myChart = echarts.init(document.getElementById('myChartBottom'))
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      // myChart.onresize = function(){
      //   myChart.resize();
      // }
      window.addEventListener('resize',() => { myChart.resize(); })
    },
    getRight(data) {
      let option = {
        title: {
          text: "全国机床状态实时分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        color: ["#209345", "#e7141a", "#efea38", "#808080"],
        legend: {
          textStyle: {
            color: "white"
          },
          bottom: -2,
          left: "center",
          data: ["加工", "故障", "停机", "未连接"]
        },
        series: [
          {
            type: "pie",
            radius: ["42%", "53%"], // 半径
            center: ["50%", "50%"],
            selectedMode: "single",
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      let myChart = this.$echarts.init(document.getElementById("myChartRight"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener('resize',() => { myChart.resize(); })
    },
    getRightBottom() {
      let option = {
        title: {
          text: "全国机床产品系列分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        color: ["#e98c49", "#00a0e9", "#9082bd", "#d1c0a6", "#89abd9"],
        legend: {
          textStyle: {
            color: "white"
          },
          bottom: -2,
          left: "center",
          data: [
            "龙门移动式",
            "卧式加工中心",
            "立式加工中心",
            "横梁移动式",
            "高速型材/复材加工中心"
          ]
        },
        series: [
          {
            type: "pie",
            radius: ["42%", "53%"], // 半径
            center: ["50%", "45%"],
            selectedMode: "single",
            data: [
              { value: 140, name: "龙门移动式" },
              { value: 48, name: "卧式加工中心" },
              { value: 149, name: "立式加工中心" },
              { value: 72, name: "横梁移动式" },
              { value: 72, name: "高速型材/复材加工中心" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      let myChart = this.$echarts.init(
        document.getElementById("myChartRightBottom")
      );
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener('resize',() => { myChart.resize(); })
    },
    back() {
      this.$router.push("index");
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.wrapper {
  width: 100%;
  /* height:calc(100% - 100px); */
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/imgs/bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: white;
  overflow-y: auto; 
}
.titletip {
  height: 5%;
  min-height: 80px;
  width: 98%;
  margin: 0 auto;
  position: relative;
  background-image: url("../../assets/imgs/toptitle.png");
  background-size: 100% 95%;
  background-repeat: no-repeat;
  margin-top: 8px;
}
.titletip > .cpname {
  position: absolute;
  left: 4px;
  bottom: 0.5rem;
  font-weight: 300;
}
.titletip > span {
  position: absolute;
  right: 4px;
  bottom: 0.5rem;
  cursor: pointer;
}
.content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
.content > div {
  height: auto;
}
.mapDiv {
  width: 50%;
  height: 50%;
  padding: 10px;
  box-sizing: border-box;
}
.headBottom{
  margin-top:3rem;
  margin-left:2em;
}
.mapCon .title {
  position: absolute;
  z-index: 1;
  height: 34px;
  line-height: 34px;
  font-size: 18px;
  font-weight: 700;
  padding-left: 14px;
  border-left: 6px solid #abd3d5;
  box-sizing: border-box;
}
.mapCon,
.mapChart {
  height: 100%;
  width: 100%;
}
.wrapper > div {
  padding-top: 2em;
}
.map {
  width: 42%;
  height: 90%;
  border-right: 2px solid #28b2f0;
}
.leftcontent {
  width: 29%;
  height: auto;
  padding-top: 2em;
  border-right: 2px solid #28b2f0;
}
.echartinfo {
  width: 29%;
  height: 90%;
  padding-top: 2em;
  display: flex;
  flex-wrap: wrap;
}
.echartinfo > div {
  width: 100%;
}
.infolist {
  margin-top: 4rem;
  width: 100%;
  height: 50%;
}

.infolist1 {
  margin-top: -5rem;
  width: 100%;
  height: auto;
}

.infolist > ul {
  width: 86%;
  height: auto;
  margin: 0 auto;
}
.infolist1 > ul {
  width: 94%;
  height: auto;
  margin: 0 auto;
}

.infolist > ul > div > li{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  border-bottom: 1px solid #1c92b6;
}

.infolist > ul > li,.infolist1 > ul > li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  border-bottom: 1px solid #1c92b6;
}
.infolist > ul > li > div ,.infolist1 > ul > li > div{
  width: 25%;
  text-align: center;
}
.echartinfo > ul > li > .font {
  padding-left: 2em;
}
.infolist .title ,.infolist1 .title{
  background-color: #3364c6;
  border: 0;
}
.title {
  font-size: 0.8rem;
  font-weight: bold;
  word-break: break-all;
  padding: 1%;
}
.title > div {
  padding:0 6px !important;
  border-right: 1px solid white;
}
.title > div:last-child {
  border: 0;
}
.europe,
.usa {
  width: 64px;
  margin: 0 1em;
}
.europe > div,
.usa > div {
  width: 48px;
  height: 12px;
  background-color: #a0a0a0;
  text-align: left;
}
.word {
  margin-left: 3em;
}
.word > li {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.word > li > span {
  font-size: 16px;
}
.usa > div {
  width: 32px;
}
/* 修改进度条样式 */
.progress {
  transform: translateX(-4em);
}
.warning {
  margin-right: 2em;
}
.headList {
  width: 100%;
  height: 50%;
}
.headList > ul {
  width: 86%;
  height: auto;
  margin: 0 auto;
}
.headList > ul > li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}
/* .headList > ul > li > div {
  width: 25%;
  text-align: center;
} */
.with10 {
  width: 15%;
  text-align: center;
}
.with15 {
  white-space: nowrap;
  width: 15%;
  text-align: left;
}
.with25 {
  width: 65%;
  text-align: left;
}
.title1 {
  white-space: nowrap;
  border: 0;
  font-size: 16px;
  font-weight: bold;

}
.statusline {
  width: 90%;
  border-radius: 16px;
  overflow: hidden;
  height: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.statusline > div {
  height: 12px;
  border: 0;
  border-radius: 0;
  margin: 0;
}
.process,
.breakdown,
.stop,
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

.interrupt {
  background-color: #808080;
}
</style>
