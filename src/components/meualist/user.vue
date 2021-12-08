<template>
    <div style="display: block">
        <div class="c_button">
            <Button type="primary" ghost size="small" @click="add">新增</Button>
        </div>
        <div>
            <Table highlight-row height="auto" width="auto" border :columns="columns12" :data="tableData">
                <template slot-scope="{ row }" slot="id">
                    <strong>{{ row.id }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, true)">编辑</Button>
                    <Button type="error" size="small" @click="remove(row,index)">删除</Button>
                </template>
            </Table>

        </div>
    </div>
</template>

<script>
import {post} from "@/apis/restUtils";
import editUserModal from "./editUserModal";

export default {
    name: "user",
    data() {
        return {
            tableData: [],
            columns12: [
                {
                    title: '姓名',
                    key: 'name',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '用户名',
                    key: 'username',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '联系方式',
                    key: 'tel',
                    resizable: true,
                    // width: 180
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
        }
    },
    mounted: function () {
        post("/admin/getUsers", {}, reponse => {
            console.log(reponse.data);
            this.tableData = reponse.data.entity;
        })
    },
    methods: {
        edit(row, isModify, tableData) {
            let that = this;
            this.$Modal.confirm({
                title: '编辑用户信息',
                render: (h) => {
                    return h(editUserModal, {
                        ref: 'editUserModal',
                        props: {
                            row: row,
                            isModify: isModify,
                        },
                        on: {
                            onModifyOk: (key) => {
                                alert(key);
                            }
                        }
                    })
                },
                width: 600,
                closable: false,
                okText: "确定",
                cancelText: "取消",
                loading: true,
                onOk() {
                    if (isModify) {
                        post("/admin/modifyUser", row, response => {
                            if (response.data.status === "fail") {
                                alert("modify user fail ...");
                            }
                            that.refresh();
                        })
                    } else {
                        post("/admin/addUser", row, response => {
                            if (response.data.status === "fail") {
                                alert("add user fail ...");
                            } else {
                                tableData[0].id = response.data.result;
                            }
                            that.refresh();
                        })
                    }
                    this.$Modal.remove();
                },
                onCancel() {
                    if (!(tableData === undefined || tableData == null)) {
                        tableData.shift();
                    }
                }
            });
        },
        add() {
            this.tableData.unshift({
                name: '',
                username: '',
                password: '',
                tel: '',
                roles: [],
            })
            this.edit(this.tableData[0], false, this.tableData)
        },
        // remove(row, index) {
        //
        // }
    }
}
</script>

<style scoped>

</style>