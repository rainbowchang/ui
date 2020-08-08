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
                         <Menu active-name="personalBaseInfo" theme="dark" width="auto"  @on-select="showComponent">
                            <MenuItem name="personalBaseInfo" :style="{margin: '0px 40 '}">
                               <Icon type="md-document" />
                                 用户基本信息  
                            </MenuItem>
                            <MenuItem name="personalActiveCode">
                              <Icon type="md-chatbubbles" />
                                激活码
                            </MenuItem>
                        </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <personalBaseInfo v-show="showPersonalBaseInfo" ref = "refPersonalBaseInfo"></personalBaseInfo>
                            <personalActiveCode v-show="showPersonalActiveCode" ref = "refPersonalActiveCode"></personalActiveCode>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
    </div>
</template>
<script>
    import personalBaseInfo from "./personalBaseInfo";
    import personalActiveCode from "./personalActiveCode";

    export default {
        components:{personalBaseInfo, personalActiveCode},
        data () {
            return {
                showPersonalBaseInfo: true,
                showPersonalActiveCode: false
            };
        },
        methods:{
            showComponent(name){
                this.setDefaultValue();
                switch(name){
                  case "personalBaseInfo":
                     this.showPersonalBaseInfo = true;
                     break;
                  case "personalActiveCode":
                     this.showPersonalActiveCode = true;
                     break;
                   default:
                      break;
                }
            },
            setDefaultValue(){
                this.showPersonalBaseInfo = false;
                this.showPersonalActiveCode = false;
            },
            showMenu(name){
                this.$router.push(name);
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