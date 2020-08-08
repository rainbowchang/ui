<template>
  <div style="display: block">
    <div>
        <Table highlight-row height="350" width= "1000" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="name">
               <strong>{{ row.name }}</strong>
           </template>
         </Table>
         <Modal v-model="agreeModal" title="是否要同意此申请"
             @on-ok="ok"
             @on-cancel="cancel">
            <p>申请的信息</p>
        </Modal>
        <Modal v-model="disAgreeModal" title="是否确定拒绝"
             @on-ok="ok"
             @on-cancel="cancel">
            <p>申请的信息</p>
        </Modal>
    </div>
  </div>
</template>
<script>
    // import {post,get} from "@/apis/restUtils"
    export default {
        data () {
            return {
                columns12: [],
                tableData: []
            }
        },
        mounted: function(){
            this.columns12 = this.getTableColumns();
            this.tableData = this.getTableData();
        },
        methods: {
            getTableColumns(){
                return [
                    {
                        title: '激活码',
                        key: 'activeCode'
                    },
                    {
                        title: '功能编码',
                        key: 'funcCode',
                        // width: 180
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
                        title: '生成日期',
                        key: 'startDate'
                    },
                    {
                        title: '原有效截止日期',
                        key: 'endDate'
                    },
                    {
                        title: '延期日期',
                        key: 'delayDate'
                    },
                    {
                        title: '审批状态',
                        key: 'approvalState'
                    }
                    
                ];
            },
            getTableData(){
                return [
                    {
                        activeCode: '12345',
                        funcCode: "func-001",
                        funcContent: '机床细节',
                        sn: "sn-001",
                        deviceName: "sn-001",
                        startDate: "2020-09-08",
                        endDate: "2020-09-08",
                        delayDate: "2020-10-08",
                        approvalState: "审批中"
                    },
                    {
                        activeCode: '456345',
                        funcCode: "func-002",
                        funcContent: '大屏展示',
                        sn: "sn-002",
                        deviceName: "sn-002",
                        startDate: "2020-09-08",
                        endDate: "2020-09-08",
                        delayDate: "2020-10-08",
                        approvalState: "审批中"
                    }
                ];
            }
        }


     };
</script>

