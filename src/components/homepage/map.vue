<template>
  <div class="wrapper">
    <!-- 首页左侧 -->
    <div class="map">
      <h2>设备监控平台</h2>
      <ul class="word">
        <li>
          <span>欧洲</span>
          <div class="europe">
            <div></div>
          </div>
          <span>共10台</span>
        </li>
        <li>
          <span>美洲</span>
          <div class="usa">
            <div></div>
          </div>
          <span>共8台</span>
        </li>
      </ul>
      <!-- 中国地图 -->
      <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div>
    </div>
    <!-- 首页右侧 -->
    <div class="echartinfo">
      <ul>
        <li class="title">
          <div>区域</div>
          <div>机床数量</div>
          <div>实时报警占比</div>
          <div>实时加工占比</div>
        </li>
        <li v-for="(item,index) in infolist" :key="index">
          <div class="font">{{item.area}}</div>
          <div class="font">{{item.number}}台</div>
          <!-- <el-progress
            class="progress warning"
            :text-inside="true"
            :stroke-width="12"
            :percentage="item.warning"
            :style="{width:'18%'}"
          ></el-progress>
          <el-progress
            class="progress"
            :text-inside="true"
            :stroke-width="12"
            :percentage="item.working"
            :style="{width:'18%'}"
          ></el-progress> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import "echarts/map/js/china.js";
// import Heatmap from "heatmap.js";
export default {
  data() {
    return {
      infolist: [
        { area: "宁庆数控", number: "12", warning: 24, working: 16 },
        { area: "华东", number: "6", warning: 54, working: 56 },
        { area: "华北", number: "6", warning: 90, working: 32 },
        { area: "西南", number: "6", warning: 45, working: 14 },
        { area: "西北", number: "6", warning: 90, working: 25 }
      ]
    };
  },
  mounted() {
    this.drawLine();
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #eff4f7;
  padding: 1em 2em 3em 2em;
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
  background-color: #ffffff;
  border-radius: 12px;
}
.map {
  width: 56%;
  height: 100%;
}
.echartinfo {
  width: 43%;
  height: 100%;
  padding-top: 2em;
}
.echartinfo > ul {
  width: 86%;
  height: auto;
  margin: 0 auto;
}
.echartinfo > ul > li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}
.echartinfo > ul > li > div {
  width: 25%;
  text-align: left;
}
.echartinfo > ul > li > .font {
  padding-left: 1em;
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
</style>
