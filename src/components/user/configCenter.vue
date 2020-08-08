<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="index"  @on-select="showMenu">
                    <div class="layout-logo">
                       <div style="margin-top: -13px;">
                            <Icon type="ios-boat-outline" size = "30" color="white"/>
                       </div>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="equipstatus">
                            <Icon type="ios-keypad"></Icon>
                            设备平台
                        </MenuItem>
                        <MenuItem name="map">
                            <Icon type="ios-analytics"></Icon>
                            机床分布
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 20px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem><h3>配置管理中心</h3></BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '270px', background: '#fff'}">
                    <Layout :style="{minHeight: '67vh'}">
                        <Sider hide-trigger collapsible :collapsed-width="78">
                         <Menu active-name="userManager" theme="dark" width="auto"  @on-select="showComponent">
                            <MenuItem name="userManager" :style="{margin: '0px 40 '}">
                               <Icon type="md-document" />
                                 用户管理
                                  
                            </MenuItem>
                            <MenuItem name="roleManager">
                              <Icon type="md-chatbubbles" />
                                角色管理
                            </MenuItem>
                            <MenuItem name="abilityManager">
                              <Icon type="md-chatbubbles" />
                                权限管理
                            </MenuItem>
                            <MenuItem name="activeCodeManager">
                              <Icon type="md-chatbubbles" />
                                激活码管理
                            </MenuItem>
                            <MenuItem name="funcListManager">
                              <Icon type="md-chatbubbles" />
                                功能列表
                            </MenuItem>
                        </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <userManager v-show="showUserManager" ref = "refUserManager"></userManager>
                            <abilityManager v-show="showAbilityManager" ref = "refAbilityManager"></abilityManager>
                             <roleManager v-show="showRoleManager" ref = "RefRoleManager"></roleManager>
                             <activeCodeManager v-show="showActiveCodeManager" ref = "RefActiveCodeManager"></activeCodeManager>
                             <funcListManager v-show="showFuncListManager" ref = "RefFuncListManager"></funcListManager>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
    </div>
</template>
<script>
    import userManager from "./userManager";
    import roleManager from "./roleManager";
    import abilityManager from "./abilityManager";
    import activeCodeManager from "./activeCodeManager";
    import funcListManager from "./funcListManager";

    export default {
        components:{userManager, roleManager, abilityManager, activeCodeManager,
        funcListManager},
        data () {
            return {
                showUserManager: true,
                showAbilityManager: false,
                showRoleManager:false,
                showActiveCodeManager: false,
                showFuncListManager: false
            };
        },
        methods:{
            showComponent(name){
                this.setDefaultValue();
                switch(name){
                  case "userManager":
                     this.showUserManager = true;
                     break;
                  case "abilityManager":
                     this.showAbilityManager = true;
                     break;
                 case "roleManager":
                     this.showRoleManager = true;
                     break;
                 case "activeCodeManager":
                     this.showActiveCodeManager = true;
                     break;
                 case "funcListManager":
                     this.showFuncListManager = true;
                     break;
                   default:
                      break;
                }
            },
            setDefaultValue(){
                this.showUserManager = false;
                this.showAbilityManager = false;
                this.showRoleManager = false;
                this.showActiveCodeManager = false;
                this.showFuncListManager = false;
            },
            showMenu(name){
                this.$router.push(name);
            },
            showDeviceInfo(){
                this.$router.push("equipstatus");
            },
            showMapInfo(){
                this.$router.push("map");
            }
        }

    };
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 50px;
    height: 30px; 
    float: left;
    position: absolute;
    top: 15px;
    left: 10px;
    text-align: left;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    text-align: center;
}
.layout-footer-center{
    text-align: center;
}
</style>