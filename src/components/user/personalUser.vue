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
                                        用户id: {{userData.customerId}}
                                    </Col>
                                    <Col span="12">
                                        用户名称: {{userData.name}}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        城市: {{userData.province}}
                                    </Col>
                                    <Col span="12">
                                        地址: {{userData.address}}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        联系方式: {{userData.tel}}
                                    </Col>
                                    <Col span="12">
                                        角色: {{userData.roles}}
                                        </Col>
                                </Row>
                                
                            </div>
                            <div style="display: block">
                                <div>
                                    <Table highlight-row height="350" width= "900" border :columns="columns12" :data="tableData">
                                        <template slot-scope="{ row }" slot="name">
                                           <strong>{{ row.name }}</strong>
                                       </template>
                                       <template slot-scope="{ row, index }" slot="action">
                                           <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, true)">编辑</Button>
                                           <Button type="error" size="small" @click="remove(row, index)">删除</Button>
                                        </template>
                                     </Table>
                                </div>
                              </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {post} from "@/apis/restUtils"
    export default {
        data () {
            return {
                showUserManager: true,
                showAbilityManager: false,
                showRoleManager:false,
                userData: {
                    'customerId' : "ui12345678",
                    'name' : '宁庆机床厂',
                    'province' : '南京',
                    'address' : '玄武区四牌楼2号',
                    'tel' : '13458902345',
                    'roles' : ["ADMIN","ROOT"]
                }
            };
        },
        mounted : function() {
            post("/customer/getByName", localStorage.getItem("UserName"), reponse => {
                this.userData = reponse.data
            })
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