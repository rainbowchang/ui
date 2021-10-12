<template>
    
    <div class="layout">
        <div class="baseInfo">
            <Row>
                <Col span="12">
                    租户Code: {{userData.corpCode}}
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
                    注册时间: {{userData.registerDate}}
                </Col>
                <Col span="12">
                    有效截止日期: {{userData.endDate}}
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
    </div>
</template>
<script>
    import {get} from "@/apis/restUtils"
    import delayHistoryModal from "./delayHistoryModal";

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
        mounted: function() {
            this.activeCodeColumns = this.getActiveCodeColumns();
            this.activeCodeData = this.getActiveCodeData();
            this.getUserData();
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
            delay(row){
                 alert(JSON.stringify(row));
            },
            getUserData() {
                get("/admin/getCurrentUser", reponse => {
                    this.userData = reponse.data
                })
            },
            delayHistory(row){
               this.$Modal.confirm({
                  title: '获取激活码信息',
                  render: (h) => {
                    return h(delayHistoryModal, {
                      ref: 'delayHistoryModal',
                      props:{
                        row: row
                      },
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
            getActiveCode(){
               
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
            }
        }

    };
</script>

<style scoped>
.layout{
    border: 0px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    height: auto;
}
.baseInfo{
    width: 78%;
    font-size: 15px;
    margin-left: 10%;
    margin-top: 2%;
    margin-bottom: 2%;
}
.c_button{
     display: flex; 
     justify-content: flex-end; 
     width: 95%
}
</style>