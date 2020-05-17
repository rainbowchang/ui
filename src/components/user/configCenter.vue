<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                       <div style="margin-top: -13px;">
                            <Icon type="ios-boat-outline" size = "30" color="white"/>
                       </div>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            机床平台
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            大屏显示
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem><h3>配置管理中心</h3></BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout :style="{minHeight: '67vh'}">
                        <Sider hide-trigger collapsible :collapsed-width="78">
                         <Menu active-name="1" theme="dark" width="auto"  @on-select="showComponent">
                            <MenuItem name="userManager" :style="{margin: '0px 40 '}">
                               <Icon type="md-document" />
                                 用户管理
                            </MenuItem>
                            <MenuItem name="abilityManager">
                              <Icon type="md-chatbubbles" />
                                能力管理
                            </MenuItem>
                        </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <userManager v-show="showUserManager" ref = "refUserManager"></userManager>
                            <abilityManager v-show="showAbilityManager" ref = "refAbilityManager"></abilityManager>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
    import userManager from "./userManager";
    import abilityManager from "./abilityManager";

    export default {
        components:{userManager, abilityManager},
        data () {
            return {
                showUserManager: true,
                showAbilityManager: false
            };
        },
        methods:{
          
            showComponent(name){
                switch(name){
                  case "userManager":
                     this.showUserManager = true;
                     this.showAbilityManager = false;
                     break;
                  case "abilityManager":
                     this.showUserManager = false;
                     this.showAbilityManager = true;
                     break;
                   default:
                      break;
                }
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