<template>
    <div style="display: block">
        <div>
            <Table highlight-row height="auto" width= "auto" border :columns="columns12" :data="tableData">
                <template slot-scope="{ row }" slot="id">
                    <strong>{{ row.id }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, true)">编辑</Button>
                    <Button type="error" size="small" @click="remove(row,index)">删除</Button>
                    <Button type="error" size="small" @click="bindActiveCode(row)">绑定激活码</Button>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
    // import {get,post} from "@/apis/restUtils"

    import {get} from "@/apis/restUtils";

    export default {
        data () {
            return {
                columns12: [
                    {
                        title: 'AgentID',
                        slot: 'id',
                        resizable: true,
                        visible: false,
                        // width: 180
                    },
                    {
                        title: 'AgentSN',
                        key: 'sn',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '用户名称',
                        key: 'userName',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '在线状态',  //在线 离线
                        key: 'online',
                        render: (h, params) => {
                            return h("div", [
                                h("icon", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        width: "8px",
                                        height: "8px",
                                        backgroundColor:
                                            params.row.online ? "#19be6b" : "#808080",
                                        borderRadius: "50%",
                                        marginRight: "8px"
                                    }
                                }),
                                h("strong", params.row.online ? '在线': '未连接')
                            ]);
                        }
                    },
                ],
                tableData: [
                ]
            }
        },
        mounted: function() {
            get("/organization/agent/getAgentInfo", reponse => {
                console.log("debug page: ", reponse.data)
                this.tableData = reponse.data;
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>