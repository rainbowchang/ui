// 此页面为客户管理主页面
<template>
  <div class="wrapper">
    <div class="top">
      <div class="title">
        <el-button type="primary" icon="el-icon-arrow-left" @click="back">上一层</el-button>
        <span>设备列表（南京宁庆数控机床制造有限公司，共6台）</span>
        <div>
          <el-date-picker
            :style="{width:'240px'}"
            v-model="dateChoose"
            type="daterange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
      <div class="equipment">
        <div class="imgbox">
          <img src="../../../static/picture/五轴.png" alt />
        </div>
        <div class="firstinfo">
          <ul>
            <ol>
              序列号：
              <span>ZHUGANGZHUI</span>
            </ol>
            <ol>
              机床号：
              <span>ZHUGANGZHUI</span>
            </ol>
            <ol>
              数控型号：
              <span>ZHUGANGZHUI</span>
            </ol>
          </ul>
        </div>
        <div class="secondinfo">
          <ul>
            <ol>
              出厂日期：
              <span>2019-07-03</span>
            </ol>
            <ol>
              验收日期：
              <span>2019-07-03</span>
            </ol>
            <ol>
              保修日期：
              <span>2019-07-03</span>
            </ol>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Tabs value="name1" class="tabs">
        <TabPane label="历史报警" name="name1">
          <history></history>
        </TabPane>
        <TabPane label="实时状态" name="name2">实时状态
           <real-status></real-status>
        </TabPane>
        <TabPane label="生产状态" name="name3">
          <production-status></production-status>
        </TabPane>
        <TabPane label="维修保养记录" name="name4">维修保养记录</TabPane>
        <TabPane label="机床地位" name="name5">
          <machine-map></machine-map>
        </TabPane>
        <TabPane label="锁机" name="name6">锁机</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import realStatus from "./realStatus"; //实时状态
import productionStatus from "./productionStatus"; //引入生产状态组件
import history from "./history"; //引入历史报警组件
import machineMap from "./machineMap";//引入机床地位图组件
export default {
  data() {
    return {
      dateChoose: ""
    };
  },
  methods: {
    //返回上一层
    back() {
      this.$router.go(-1);
    }
  },
  components: {realStatus, productionStatus, history,machineMap}
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrapper > .top,
.wrapper > .bottom {
  width: 98%;
  height: 30%;
  background-color: white;
  border-radius: 3px;
  margin: 0 auto;
  margin-top: 2em;
}
.wrapper > .bottom {
  height: 64%;
  margin-top: 1em;
}
/* 上半截信息 */
.title {
  padding: 0 2em;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.title > span {
  font-size: 16px;
  font-weight: bold;
}
.equipment {
  width: 100%;
  height: 72%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.imgbox {
  margin-left: 4em;
  width: 160px;
  height: 160px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgbox > img {
  width: 90%;
  height: auto;
}
.firstinfo,
.secondinfo {
  width: 240px;
  margin-left: 2em;
  font-size: 16px;
  font-weight: bold;
}
.firstinfo ol,
.secondinfo ol {
  margin-bottom: 0.8em;
}
.firstinfo span,
.secondinfo span {
  margin-left: 1em;
}
/* 下半截列表 tab切换 */
.tabs {
  text-align: center;
  width: 96%;
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
  padding-top: 1em;
}
</style>

