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
                  <Tooltip content="3 done / 3 in progress / 4 to do" style="width: 100%">
                    <Progress :percent="item.firstNum" :success-percent="item.secondNum" />
                  </Tooltip>
                </template>
              </div>
            </li>
          </ul>
        </div>
        <div class="headBottom"  style="margin-top:3rem;margin-left:2em;">
          <div id="myChartBottom" :style="{width: '90%', height: '500px'}"></div>
        </div>
      </div>
      <div class="map">
        <!-- 中国地图 -->
        <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div>
        <div class="infolist">
          <ul>
            <li class="title">
              <div>序号</div>
              <div>报警时间</div>
              <div>机床型号</div>
              <div>机床序列号</div>
              <div>客户名称</div>
              <div>报警编号</div>
            </li>
            <li v-for="(item,index) in infolist" :key="index">
              <div>{{item.index}}</div>
              <div>{{item.warningtime}}</div>
              <div>{{item.jcxh}}</div>
              <div>{{item.xlh}}</div>
              <div>{{item.name}}</div>
              <div>{{item.warncode}}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 首页右侧 -->
      <div class="echartinfo" style="margin-top:0;">
        <div id="myChartRight" :style="{width: '90%', height: '32%'}"></div>
        <div class="infolist" style="margin-top:0;">
          <ul>
            <li class="title">
              <div>加工</div>
              <div>故障</div>
              <div>修机</div>
              <div>未连接</div>
            </li>
            <li>
              <div>120</div>
              <div>120</div>
              <div>46</div>
              <div>192</div>
            </li>
          </ul>
        </div>
        <div id="myChartRightBottom" :style="{width: '90%', height: '34%'}"></div>
        <div class="infolist">
          <ul>
            <li class="title">
              <div>龙门移动式</div>
              <div>卧式加工中心</div>
              <div>立式加工中心</div>
              <div>横梁移动式</div>
              <div>高速型材/复材加工中心</div>
            </li>
            <li>
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
</template>
<script>
import "echarts/map/js/china.js";
// import Heatmap from "heatmap.js";
export default {
  data() {
    return {
      headlist: [
        {
          id: 1,
          area: "西南办事处",
          total: 100,
          firstNum: 20,
          secondNum: 30,
          thridNum: 10
        },
        {
          id: 1,
          area: "西北办事处",
          total: 70,
          firstNum: 40,
          secondNum: 20,
          thridNum: 15
        },
        {
          id: 1,
          area: "华东办事处",
          total: 80,
          firstNum: 50,
          secondNum: 10,
          thridNum: 10
        },
        {
          id: 1,
          area: "华北办事处",
          total: 90,
          firstNum: 30,
          secondNum: 15,
          thridNum: 20
        },
        {
          id: 1,
          area: "东北办事处",
          total: 80,
          firstNum: 30,
          secondNum: 15,
          thridNum: 20
        },
        {
          id: 1,
          area: "华南办事处",
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
          jcxh: "VCER5512",
          warningtime: "2019.09.20",
          xlh: "12638055",
          warncode: "7rg6566"
        },
        {
          index: 2,
          name: "客户2",
          jcxh: "VC325",
          warningtime: "2019.09.20",
          xlh: "12638055",
          warncode: "7rg6566"
        },
        {
          index: 3,
          name: "客户3",
          jcxh: "VJWE32Y",
          warningtime: "2019.09.20",
          xlh: "51684155",
          warncode: "7rg6566"
        },
        {
          index: 4,
          name: "客户4",
          jcxh: "NDFW4Y",
          warningtime: "2019.09.20",
          xlh: "12638055",
          warncode: "7rg6566"
        },
        {
          index: 5,
          name: "客户5",
          jcxh: "JRS5555",
          warningtime: "2019.09.20",
          xlh: "12638055",
          warncode: "7rg6566"
        }
      ]
    };
  },
  mounted() {
    this.drawLine();
    this.getBottom();
    this.getRight();
    this.getRightBottom();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChartContainer = document.getElementById("myChartChina");
      var resizeMyChartContainer = function() {
        myChartContainer.style.width = document.body.offsetWidth / 2 + "px"; //页面一半的大小
      };
      resizeMyChartContainer();
      var myChartChina = this.$echarts.init(myChartContainer);

      function randomData() {
        return Math.round(Math.random() * 500);
      }
      // 绘制图表
      var optionMap = {
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "left",
          data: [""]
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: "10%",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          color: ["#0b50b9", "#c3e2f4"]
        },
        selectedMode: "single",
        series: [
          {
            name: "",
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
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
            data: [
              { name: "北京", value: randomData() },
              { name: "天津", value: randomData() },
              { name: "上海", value: randomData() },
              { name: "重庆", value: randomData() },
              { name: "河北", value: randomData() },
              { name: "河南", value: randomData() },
              { name: "云南", value: randomData() },
              { name: "辽宁", value: randomData() },
              { name: "黑龙江", value: randomData() },
              { name: "湖南", value: randomData() },
              { name: "安徽", value: randomData() },
              { name: "山东", value: randomData() },
              { name: "新疆", value: randomData() },
              { name: "江苏", value: randomData() },
              { name: "浙江", value: randomData() },
              { name: "江西", value: randomData() },
              { name: "湖北", value: randomData() },
              { name: "广西", value: randomData() },
              { name: "甘肃", value: randomData() },
              { name: "山西", value: randomData() },
              { name: "内蒙古", value: randomData() },
              { name: "陕西", value: randomData() },
              { name: "吉林", value: randomData() },
              { name: "福建", value: randomData() },
              { name: "贵州", value: randomData() },
              { name: "广东", value: randomData() },
              { name: "青海", value: randomData() },
              { name: "西藏", value: randomData() },
              { name: "四川", value: randomData() },
              { name: "宁夏", value: randomData() },
              { name: "海南", value: randomData() },
              { name: "台湾", value: randomData() },
              { name: "香港", value: randomData() },
              { name: "澳门", value: randomData() }
            ]
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
      }
      let myChart = this.$echarts.init(
        document.getElementById("myChartBottom")
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
          bottom: "3%",
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
    },
    getRight() {
      let option = {
        title: {
          text: "全国机床状态实时分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["加工", "故障", "修机", "未连接"]
        },
        series: [
          {
            type: "pie",
            radius: ["42%", "53%"], // 半径
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 120, name: "加工" },
              { value: 120, name: "故障" },
              { value: 46, name: "修机" },
              { value: 192, name: "未连接" }
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

      let myChart = this.$echarts.init(document.getElementById("myChartRight"));
      // // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getRightBottom() {
      console.log("2");
      let option = {
        title: {
          text: "全国机床产品系列分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: -8,
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
            center: ["50%", "50%"],
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
  background: -webkit-linear-gradient(45deg, #263e7d, #278bc7, #263e7d);
  background: linear-gradient(45deg, #263e7d, #278bc7, #263e7d);
  color: white;
}
.titletip {
  height: 5%;
  min-height: 80px;
  width: 98%;
  border-bottom: 2px solid #28b2f0;
  margin: 0 auto;
  position: relative;
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
  height: 98%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.content > div {
  height: 98%;
}
.mapDiv {
  width: 50%;
  height: 50%;
  padding: 10px;
  box-sizing: border-box;
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
  height: 90%;
  padding-top: 2em;
  border-right: 2px solid #28b2f0;
}
.echartinfo {
  width: 29%;
  height: 90%;
  padding-top: 2em;
}
.infolist {
  margin-top: 4rem;
  width: 100%;
  height: auto;
}
.infolist > ul {
  width: 86%;
  height: auto;
  margin: 0 auto;
}
.infolist > ul > li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  border-bottom: 1px solid #1c92b6;
}
.infolist > ul > li > div {
  width: 25%;
  text-align: center;
}
.echartinfo > ul > li > .font {
  padding-left: 1em;
}
.infolist .title {
  background-color: #3364c6;
  border: 0;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.title > div {
  padding-left: 12px !important;
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
  height: auto;
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
  border-bottom: 1px solid #1c92b6;
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
  width: 15%;
  text-align: left;
}
.with25 {
  width: 65%;
  text-align: left;
}
.title1 {
  border: 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
