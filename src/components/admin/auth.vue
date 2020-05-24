<template>
  <div class="wrapper">
    <Menu
      :theme="theme1"
        mode="vertical"
        active-name="Auth"
        @on-select="selectMenu"
        >
      <MenuItem name="/user" :class="user?'red':''">
        <span>客户管理</span>
      </MenuItem>
      <MenuItem name="/role" :class="role?'red':''">
        <span>角色管理</span>
      </MenuItem>
      <MenuItem name="/ability" :class="ability?'red':''">
        <span>能力管理</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      theme1: "light",
      user : false,
      role : false,
      ability : false
    }
  },
  methods: {
    allFalse() {
      (this.user = false),
      (this.role = false),
      (this.ability = false);
    },
    selectMenu(name) {
      if(name == "/user") {
        this.allFalse();
        this.user = true;
      }
      if(name == "/role") {
        this.allFalse();
        this.role = true;
      }
      if(name == "/ability") {
        this.allFalse();
        this.ability = true;
      }
    }
  },
};
</script>

<style scoped>
.wrapper {
  width: 98%;
  height: 95%;
  margin: 1% auto;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
}
</style>