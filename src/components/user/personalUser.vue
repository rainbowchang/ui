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
                             <div class="c_button">
                                 <Button type="primary" size="small" @click="getActiveCode()">获取激活码</Button>   
                            </div>
                             <h3>激活码：</h3>
                            <div style="display: block">
                                <div style="margin-left:2%; margin-top:3%">
                                    <Table highlight-row height="350" width= "1100" border :columns="activeCodeColumns" :data="activeCodeData">
                                        <template slot-scope="{ row }" slot="name">
                                           <strong>{{ row.name }}</strong>
                                       </template>
                                       <template slot-scope="{ row }" slot="action">
                                           <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">延期</Button>
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
    import activeCodeGetter from "./ActiveCodeGetter";

    export default {
        data () {
            return {
                userData: {
                    'customerId' : "ui12345678",
                    'name' : '宁庆机床厂',
                    'province' : '南京',
                    'address' : '玄武区四牌楼2号',
                    'tel' : '13458902345',
                    'roles' : ["ADMIN","ROOT"]
                },
                activeCodeColumns: [],
                activeCodeData: []
            };
        },
        mounted : function() {
            post("/customer/getByName", localStorage.getItem("UserName"), reponse => {
                this.userData = reponse.data
            })
            this.activeCodeColumns = this.getActiveCodeColumns();
            this.activeCodeData = this.getActiveCodeData();
        },
        methods:{
            showMenu(name){
                this.$router.push(name);
            },
            showDeviceInfo(){
                this.$router.push("equipstatus");
            },
            showMapInfo(){
                this.$router.push("map");
            },
            getActiveCode(){
                this.$Modal.confirm({
                  title: '获取激活码信息',
                  render: (h) => {
                    return h(activeCodeGetter, {
                      ref: 'activeCodeGetter',
                      on:{
                        onModifyOk:(key) =>{
                          alert(key);
                        }
                      }
                    })
                  },
                  width: 1300,
                  closable: false,
                  okText: "确定",
                  cancelText: "取消",
                  loading: true,
                  onOk() {
                    this.$Modal.remove()
                  },
                  onCancel() {
                    
                  }
                });
            },
            getActiveCodeColumns(){
                return [ 
                   {
                        title: '激活码',
                        slot: 'activeCode'
                    },
                    {
                        title: '功能编码',
                        key: 'funcCode'
                    },
                    {
                        title: '功能',
                        key: 'funcContent'
                    },
                    {
                        title: '设备sn',
                        key: 'sn'
                    },
                    {
                        title: '设备名称',
                        key: 'deviceName'
                    },
                    {
                        title: '使用状态',
                        key: 'useState'
                    },
                    {
                        title: '获取状态',
                        key: 'approvalState'
                    },
                    {
                        title: '生成日期',
                        key: 'createDate'
                    },
                    {
                        title: '有效截止日期',
                        key: 'endDate'
                    },
                    {
                        title: '更新日期',
                        key: 'updateDate'
                    },
                    {
                        title: '描述',
                        key: 'memo',
                        width: 180
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }];
            },
            getActiveCodeData(){
                return [
                    {
                        activeCode: '23456792',
                        funcCode: 'func_001',
                        funcContent: '精细化控制',
                        sn: 'sn-001',
                        deviceName: '宁庆机床001',
                        useState: '已使用',
                        approvalState: '已获取',
                        createDate: '2019-09-01',
                        endDate: '2021-09-01',
                        updateDate: '2020-03-01',
                        memo: "获取相关的精细化数据"
                    },
                    {
                        activeCode: '458456792',
                        funcCode: 'func_002',
                        funcContent: '机床监控',
                        sn: 'sn-002',
                        deviceName: '宁庆机床002',
                        useState: '未使用',
                        approvalState: '已拒绝',
                        createDate: '',
                        endDate: '',
                        updateDate: '',
                        memo: "获取实时的监控数据"
                    }];
            },
            cancle(row){
                alert(JSON.stringify(row));
            },
            edit(row){
                 alert(JSON.stringify(row));
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
    font-size: 15px;
    margin-left: 10%
}
.demo-drawer-profile .ivu-col{
    margin-bottom: 20px;
}
.c_button{
     display: flex; 
     justify-content: flex-end; 
     width: 95%
}
</style>