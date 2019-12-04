<template>
  <div class="wrapper">
    <Menu
      mode="horizontal"
      :theme="theme1"
      active-name="Homepage"
      class="menu"
      @on-select="selectMenu"
      style="background:#595959;"
    >
      <div class="logo">
        <span>NINGQING</span>
        <span style="font-size:4px">®</span>
      </div>
      <MenuItem name="/index" :class="index?'red':''">首页</MenuItem>
      <MenuItem name="/equipstatus" :class="equipstatus?'red':''">
        <span>设备状态</span>
      </MenuItem>
      <MenuItem name="/warning" :class="warning?'red':''">
        <span>设备报警</span>
      </MenuItem>
      <MenuItem name="/information" :class="information?'red':''">
        <span>设备信息</span>
      </MenuItem>
      <MenuItem name="/debugging" :class="debugging?'red':''">
        <span>设备运维</span>
      </MenuItem>
      <MenuItem name="/management" :class="management?'red':''">
        <span>客户管理</span>
      </MenuItem>
      <MenuItem name="/history" :class="history?'red':''">
        <span>维修记录</span>
      </MenuItem>
      <MenuItem name="/faraway" :class="faraway?'red':''">
        <span>远程操作</span>
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <span>你好，xxx</span>
        </template>
        <MenuItem name="exit">
          <span>退出</span>
        </MenuItem>
      </Submenu>
    </Menu>
    <div class="viewpage">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  data() {
    return {
      theme1: "primary",
      index: false,
      equipstatus: true,
      warning: false,
      information: false,
      debugging: false,
      management: false,
      history: false,
      faraway: false
    };
  },
  methods: {
    allfalse() {
      (this.index = false),
        (this.equipstatus = false),
        (this.warning = false),
        (this.information = false),
        (this.debugging = false),
        (this.management = false),
        (this.history = false),
        (this.faraway = false);
    },
    selectMenu(name) {
      if (name == "/index") {
        this.allfalse();
        this.index = true;
      }
      if (name == "/equipstatus") {
        this.allfalse();
        this.equipstatus = true;
      }
      if (name == "/warning") {
        this.allfalse();
        this.warning = true;
      }
      if (name == "/information") {
        this.allfalse();
        this.information = true;
      }
      if (name == "/debugging") {
        this.allfalse();
        this.debugging = true;
      }
      if (name == "/management") {
        this.allfalse();
        this.management = true;
      }
      if (name == "/history") {
        this.allfalse();
        this.history = true;
      }
      if (name == "/faraway") {
        this.allfalse();
        this.faraway = true;
      }

      this.$router.push(name);
    }
  },
  mounted() {
    this.$router.push("/equipstatus");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.wrapper {
  width: 100vw;
  height: 100vh;
  min-height: 768px;
  min-width: 1024px;
  padding-bottom: 3em;
  background-color: #eff4f7;
}
.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.red {
  background-color: #e93223;
}
.logo {
  color: white;
  cursor: default;
}
.viewpage {
  width: 100%;
  position: absolute;
  top: 60px;
  bottom: 0;
  height: auto;
}
.icon {
  width: auto;
  height: 1em;
  margin-right: 0.5em;
}
</style>
