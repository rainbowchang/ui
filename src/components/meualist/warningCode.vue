<template>
    <div style="display: block">
        <div class="c_button">
            <form class="select-form">
                <span>告警编号：</span><input placeholder="编号" name="code" v-model="formItem.code"> </input>
                <span>机床型号：</span><input placeholder="型号" name="model" v-model="formItem.model"> </input>
                <span>PLC型号：</span><input placeholder="PLC型号" name="plcType" v-model="formItem.plcType"> </input>
            </form>
            <Button type="primary" ghost size="small" @click="search">查询</Button>
        </div>
        <div>
            <Table highlight-row height="auto" width="auto" border :columns="columns12" :data="tableData">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, true)">编辑</Button>
                    <Button type="error" size="small" @click="remove(row,index)">删除</Button>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
// import {get, post} from "@/apis/restUtils"

import {post} from "@/apis/restUtils";

export default {
    // name: "warningCode"
    data() {
        return {
            columns12: [
                // {
                //   title: 'machineId',
                //   slot: 'id',
                //   resizable: true,
                //   visible: false,
                //   width: 10
                // },
                {
                    title: '告警编号',
                    key: 'code',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '告警内容',
                    key: 'info',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '告警类别',
                    key: 'level',
                    resizable: true,
                    render: (h, params) => {
                        return h('span', (() => {
                            switch (params.row.level) {
                                case 0:
                                    return '警告';
                                case 1:
                                    return '报警';
                                case 2:
                                    return '紧急状态';
                                default:
                                    return '警告';
                            }
                        })());
                    }
                },
                {
                    title: '机床型号',
                    key: 'model',
                    resizable: true,
                    // width: 180
                },
                {
                    title: 'PLC型号',
                    key: 'plcType',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '是否推送',
                    key: 'pushFlag',
                    resizable: true,
                    render: (h, params) => {
                        return h("span", params.row.pushFlag === '0' ? '不推送' : '推送');
                    }
                    // width: 180
                },
                {
                    title: '操作',
                    slot: 'action',
                    resizable: true,
                    align: 'center'
                    // width: 180
                },

            ],
            tableData: [],
            formItem: {}
        }
    },
    mounted: function () {
        post("/plcInfo/getWarningInfo", {}, response => {
            console.log("debug page: ", response.data);
            this.tableData = response.data;
        });
    },
    methods: {
        // edit (row, isModify) {
        //
        // },
        // remove (row, index) {
        //
        // },
        // add () {
        //
        // }

        search(){
            post("/plcInfo/getWarningInfo", JSON.stringify(this.formItem), response => {
                console.log("debug page: ", response.data);
                this.tableData = response.data;
            });
        }
    }
}
</script>

<style scoped>
.c_button {
    margin-top: 1%;
    margin-bottom: 1%;
    display: flex;
    justify-content: flex-end;
    width: 95%;
    height: 95%;
}

.select-form {
    margin-right: 50px;
}
</style>