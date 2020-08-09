<template>
  <div style="display: block">
    <div>
        <Input v-model="snSvalue" placeholder="设备sn" style="width: auto">
        </Input>
        <Select v-model="userStateSvalue" style="width:200px" placeholder="使用状态">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" icon="ios-search">搜索</Button>
        <Table highlight-row height="350" width= "1000" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="name">
               <strong>{{ row.name }}</strong>
           </template>
           <template slot-scope="{ row }" slot="action">
               <Button v-show="editButtonShow" type="primary" size="small" style="margin-right: 5px" @click="edit(row)">修改</Button>
               <Button v-show="agreeButtonShow" type="primary" size="small" style="margin-right: 5px" @click="agree(row)">同意</Button>
               <Button v-show="disAgreeButtonShow" type="error" size="small" @click="disAgree(row)">不同意</Button>
              <Button v-show="cancelButtonShow" type="error" size="small" style="margin-right: 5px" @click="cancel(row)">撤销</Button>
            </template>
         </Table>
         <Modal v-model="agreeModal" title="同意审批"
             @on-ok="onAgreeok"
             @on-cancel="OnAgreeCancel">
            <p>是否要同意此申请</p>
        </Modal>
        <Modal v-model="disAgreeModal" title="拒绝审批"
             @on-ok="onDisAgreeOk"
             @on-cancel="onDisAgreeCancel">
            <p>是否确定拒绝</p>
        </Modal>
    </div>
  </div>
</template>
<script>
    // import {post,get} from "@/apis/restUtils"
    export default {
        data () {
            return {
                agreeModal: false,
                disAgreeModal: false,
                disAgreeButtonShow: true,
                agreeButtonShow:true,
                editButtonShow: true,
                rowData:"",
                columns12: [],
                tableData: []
            }
        },
        mounted: function(){
            this.columns12 = this.getTableColumns();
            this.tableData = this.getTableData();
        },
        methods: {
            agree (row) {
                this.agreeModal = true;
                this.rowData = row;
            },
            disAgree (row) {
                this.disAgreeModal = true;
                this.rowData = row;
            },
            edit (row) {
                this.agreeModal = true;
                this.rowData = row;
                alert(JSON.stringify(row));
            },
            cancel (row) {
                this.disAgreeModal = true;
                this.rowData = row;
            },
            onAgreeok(){
                 alert(JSON.stringify(this.rowData));
            },
            OnAgreeCancel(){
                alert(JSON.stringify(this.rowData));
            },
            onDisAgreeOk(){
               alert(JSON.stringify(this.rowData));
            },
            onDisAgreeCancel(){
                alert(JSON.stringify(this.rowData));
            },
            getTableColumns(){
                return [
                    {
                        title: '激活码',
                        key: 'activeCode',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '功能编码',
                        key: 'funcCode',
                        // resizable: true,
                        // width: 180
                    },
                    {
                        title: '功能',
                        key: 'funcContent'
                    },
                    {
                        title: '用户Id',
                        key: 'userId'
                    },
                    {
                        title: '用户名称',
                        key: 'userName'
                    },
                    {
                        title: '生成日期',
                        key: 'startDate'
                    },
                    {
                        title: '有效截止日期',
                        key: 'endDate'
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
                        title: '设备sn',
                        key: 'sn'
                    },
                    {
                        title: '设备名称',
                        key: 'deviceName'
                    },
                    {
                        title: '备注',
                        key: 'memo'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ];
            },
            getTableData(){

                return [
                    {
                        activeCode: '123456',
                        funcCode: "funct_001",
                        funcContent: '机床细节',
                        userId: "user-002",
                        userName: "张三",
                        startDate: "2020-09-08",
                        endDate: "2020-09-08",
                        useState: "使用中",
                        approvalState: "已获取",
                        sn: "sn-001",
                        deviceName: "device-002",
                        memo: ""
                    }
                ];
            }
        }


     };
</script>

