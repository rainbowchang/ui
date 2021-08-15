<template>
    <div style="display: block">
        <div class="c_button">
            <Button type="primary" ghost size="small" @click="showCode">报警编号</Button>
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
import warningCode from "./warningCode";
import {post} from "@/apis/restUtils";

export default {
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
                    title: '设备名称',
                    key: 'alias',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '机床型号',
                    key: 'model',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '系统型号',
                    key: 'plcType',
                    resizable: true,
                    // width: 180
                },
                {
                    title: 'PLC序列号',
                    key: 'sn',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '所属',
                    key: 'orgId',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '状态',
                    key: 'org',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '最后报警时间',
                    key: 'endTime',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '报警号码',
                    key: 'lastAlarms',
                    resizable: true,
                    // width: 180
                },

            ],
            tableData: []
        }
    },
    mounted: function () {
        post("/plcInfo/getPlcWarning", {}, response => {
            console.log("debug page: ", response.data);
            this.tableData = response.data;
        });
    },
    methods: {
        showCode() {
            this.$Modal.info({
                title: '报警编号',
                render: (h) => {
                    return h(warningCode, {})
                },
                width: '90%',
                height: '90%',
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.c_button {
    margin-top: 1%;
    margin-bottom: 1%;
    display: flex;
    justify-content: flex-end;
    width: 95%
}
</style>