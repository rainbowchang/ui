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
                     <div class="layout-title">
                        <MenuItem name="equipstatus">
                            <!--<Icon type="ios-keypad"></Icon> -->
                            <h3>个人信息中心</h3>
                        </MenuItem>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="equipstatus">
                            <Icon type="ios-keypad"></Icon>
                            返回
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem></BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout :style="{minHeight: '67vh'}">
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <div class="demo-drawer-profile">
                        <Row>
                            <Col span="12">
                                Full Name: Aresn
                            </Col>
                            <Col span="12">
                                Account: aresn@aresn.com
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                City: BeiJing
                            </Col>
                            <Col span="12">
                                Country: China
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                Birthday: May 14, 1991
                            </Col>
                            <Col span="12">
                                Website: <a href="https://dev.iviewui.com" target="_blank">https://dev.iviewui.com</a>
                                </Col>
                        </Row>
                        Message: Hello, Developer
                    </div>

                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                showUserManager: true,
                showAbilityManager: false,
                showRoleManager:false
            };
        },
        methods:{
        
            setDefaultValue(){
                this.showUserManager = false;
                this.showAbilityManager = false;
                this.showRoleManager = false;
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
.layout-title{
    width: 200px;
    margin: 0 auto;
    text-align: center;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    text-align: right;
    margin-left: 90%;
}
.layout-footer-center{
    text-align: center;
}

.demo-drawer-profile{
    width: 78%;
    font-size: 18px;
    margin-left: 10%
}
.demo-drawer-profile .ivu-col{
    margin-bottom: 20px;
}
</style>