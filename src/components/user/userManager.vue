<template>
  <div style="display: block">
    <div>
        <Table highlight-row height="350" width= "900" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="name">
               <strong>{{ row.name }}</strong>
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

    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '用户名称',
                        slot: 'name',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: '地址',
                        key: 'address'
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
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        roles: "1个角色"
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        roles: "2个角色"
                    }
                ]
            }
        },
        methods: {
            edit (row) {
		        this.$Modal.confirm({
		          title: '用户信息',
		          render: (h) => {
		            return h(userInfoModal, {
		              ref: 'userInfo',
		              props: {
		                row: row,
		              },
		              on:{
		                showInfo:(key) =>{
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
		             this.$Modal.remove();
		          }
		        });
            },
            remove (index) {
                this.tableData.splice(index, 1);
            },
            showRoles (row){
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${row.name}<br>
                              Age：${row.age}<br>
                              Address：${row.address}`
                });
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

