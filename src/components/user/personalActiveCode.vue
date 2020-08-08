<template>
    <div style="display: block">
         <h3>激活码</h3>
        <div style="margin-top:3%">  
            <Table highlight-row height="390" width= "1000" border :columns="activeCodeColumns" :data="activeCodeData">
                <template slot-scope="{ row }" slot="name">
                   <strong>{{ row.name }}</strong>
               </template>
               <template slot-scope="{ row }" slot="action">
                   <Button type="primary" size="small" style="margin-right: 5px" @click="delay(row)">延期</Button>
                    <Button type="primary" size="small" style="margin-right: 5px" @click="delayHistory(row)">延期历史</Button>
                </template>
             </Table>
              <Modal v-model="showDelayModal" title="是否要同意此申请"
                 @on-ok="delayOk"
                 @on-cancel="delayCancel">
                <p>申请的信息</p>
            </Modal>
        </div>
    </div>
</template>
<script>
    import {post} from "@/apis/restUtils"
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
        },
        methods:{
            delay(row){
                 alert(JSON.stringify(row));
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
            getActiveCodeData(){
                this.activeCodeData = [];
                post("/license/customer/getLicenseByCustomerName", localStorage.getItem("UserName"), reponse => {
                    reponse.data.forEach(element => {
                        this.convertToActiveCodeData(element)   
                    });
                })
                if(this.activeCodeData.size == 0){
                   return this.getDefaultActiveCodeData();
                }
            },
            convertToActiveCodeData(data) {
                this.activeCodeData.push({})
                var index = this.activeCodeData.length - 1
                this.activeCodeData[index].activeCode = data.activeCode
                this.activeCodeData[index].funcCode = data.facility.id
                this.activeCodeData[index].funcContent = data.facility.name
                this.activeCodeData[index].useState = data.usingState
                this.activeCodeData[index].approvalState = data.acquiringState
                this.activeCodeData[index].sn = data.sn
                this.activeCodeData[index].createDate = data.createDate
                this.activeCodeData[index].endDate = data.expirationDate
                this.activeCodeData[index].updateDate = data.createDate
                this.activeCodeData[index].memo = data.description
                post("/organization/deviceInfo/getDeviceInfoBySn", data.sn, reponse => {
                    console.log("AAA", index, this.activeCodeData[index])
                    this.activeCodeData[index].deviceName = reponse.data.name
                    this.activeCodeColumns = this.getActiveCodeColumns();
                })
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
                        width: 120
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }];
            },
            getDefaultActiveCodeData(){
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
.c_button{
     display: flex; 
     justify-content: flex-end; 
     width: 95%
}
</style>