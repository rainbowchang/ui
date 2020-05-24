<template>
  <div style="display: block">
    <div>
        <Table highlight-row height="350" width= "900" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="customerId">
               <strong>{{ row.customerId }}</strong>
           </template>
           <template slot-scope="{ row, index }" slot="action">
               <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
               <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
            <template slot-scope="{ row }" slot="roles">
               <label class="c_label" @click="showRoles(row)">{{ row.roles }} </label>
           </template>
         </Table>
    </div>
  </div>
</template>
<script>
    import userInfoModal from "./userInfoModal";
    import {get,post} from "@/apis/restUtils"
    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '用户ID',
                        slot: 'customerId',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: '用户名称',
                        key: 'name',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '电话',
                        key: 'tel'
                    },
                    {
                        title: '公司',
                        key: 'company'
                    },
                    {
                        title: '角色列表',
                        slot: 'roles'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                tableData: [
                    {
                        customerId: '1',
                        name: 'John Brown',
                        address: 'New York No. 1 Lake Park',
                        tel: '111',
                        company: 'nq',
                        roles: "1个角色"
                    },
                    {
                        customerId: '2',
                        name: 'Jim Green',
                        address: 'London No. 1 Lake Park',
                        tel: '111',
                        company: 'nq',
                        roles: "2个角色"
                    }
                ],
            }
        },
        mounted: function() {
            get("/admin/getAllUsers", reponse => {
                this.tableData = reponse.data;
            })
        },
        methods: {
            edit (row) {
		        this.$Modal.confirm({
		          title: '用户信息',
		          render: (h) => {
		            return h(userInfoModal, {
		              ref: 'userInfoModal',
		              props: {
                        row: row,
		              },
		              on:{
		                onModifyOk:(key) =>{
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
                    console.log("click ok")
                    post("/admin/modifyUser", row, reponse => {
                        console.log("Modify reply", reponse.status);
                    }) 
                    this.$Modal.remove()
                  },
                  onCancel() {
                      console.log("click cancel")
                      get("/admin/getAllUsers", reponse => {
                        console.log("Get reply", reponse.status);
                        this.tableData = reponse.data;
                      })
                  }
		        });
            },
            remove (index) {
                this.tableData.splice(index, 1);
            },
            showRoles (row){
                this.$Modal.info({
                    title: '角色列表',
                    content: this.getRoles(row)
                });
            },
            getRoles(row){
            	return `Name：${row.name}<br>
                              Age：${row.age}<br>
                              Address：${row.address}`
            },
            handleSubmit(){
                
            }
        }
    };
</script>
<style>
.c_button{
     display: flex; 
     justify-content: flex-end; 
     width: 95%
}
.c_label{
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}
</style>

