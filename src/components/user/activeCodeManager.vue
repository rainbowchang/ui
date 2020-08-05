<template>
  <div style="display: block">
    <div>
        <Table highlight-row height="350" width= "1000" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="name">
               <strong>{{ row.name }}</strong>
           </template>
           <template slot-scope="{ row }" slot="action">
               <Button v-show="editButtonShow" type="primary" size="small" style="margin-right: 5px" @click="edit(row)">修改</Button>
               <Button v-show="agreeButtonShow" type="primary" size="small" style="margin-right: 5px" @click="agree(row)">同意</Button>
               <Button v-show="disAgreeButtonShow" type="error" size="small" @click="disAgree(row)">不同意</Button>
              <Button v-show="cancelButtonShow" type="primary" size="small" style="margin-right: 5px" @click="cacel(row)">撤销</Button>
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
                agreeModal: false,
                disAgreeModal: false,
                disAgreeButtonShow: true,
                agreeButtonShow:true,
                editButtonShow: true,
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
                console.log(row);
            },
            disAgree (row) {
                this.disAgreeModal = true;
                  console.log(row);
            },
            edit (row) {
                this.agreeModal = true;
                console.log(row);
                alert(JSON.stringify(row));
            },
            cancel (row) {
                this.disAgreeModal = true;
                console.log(row);
            },
            getTableColumns(){
                return [
                    {
                        title: '激活码',
                        slot: 'activeCode',
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
                        name: 'John Brown',
                        type: "api",
                        content: 'New York No. 1 Lake Park',
                        description: "a"
                    },
                    {
                        name: 'Jim Green',
                        type: "page",
                        content: 'London No. 1 Lake Park',
                        description: "b"
                    },
                    {
                        name: 'Joe Black',
                        type: "api",
                        content: 'Sydney No. 1 Lake Park',
                        description: "c"
                    },
                    {
                        name: 'Jon Snow',
                        type: "api",
                        content: 'Ottawa No. 2 Lake Park',
                        description: "d"
                    },
                    {
                        name: 'Jon Snow',
                        type: "tree",
                        content: 'Ottawa No. 2 Lake Park',
                        description: "e"
                    },
                    {
                        name: 'Jon Snow',
                        type: "tree",
                        content: 'Ottawa No. 2 Lake Park',
                        description: "f"
                    },
                    {
                        name: 'Jon Snow',
                        type: "tree",
                        content: 'Ottawa No. 2 Lake Park',
                        description: "g"
                    }
                ];
            }
        }


     };
</script>

