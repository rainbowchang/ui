<template>
  <div style="display: block">
     <div class="c_button">
         <Button type="primary" size="small" @click="add">新增</Button>	
    </div>
    <div>
        <Table highlight-row height="350" width= "900" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="name">
               <strong>{{ row.name }}</strong>
           </template>
           <template slot-scope="{ row, index }" slot="action">
               <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, true)">编辑</Button>
               <Button type="error" size="small" @click="remove(row, index)">删除</Button>
            </template>
             <template slot-scope="{ row }" slot="abilities">
               <label class="c_label" @click="showAbilities(row)">{{ row.abilities }} </label>
           </template>
         </Table>
    </div>
  </div>
</template>
<script>
    import roleInfoModal from "./roleInfoModal";
    import {post,get} from "@/apis/restUtils"
    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '角色名称',
                        slot: 'name',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: '能力',
                        slot: 'abilities'
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
                        abilities: "0个角色"
                    },
                    {
                        name: 'Jim Green',
                        abilities: "0个角色"
                    },
                    {
                        name: 'Joe Black',
                        abilities: "0个角色"
                    },
                    {
                        name: 'Jon Snow',
                        abilities: "0个角色"
                    },
                    {
                        name: 'Jon Snow',
                        abilities: "0个角色"
                    },
                    {
                        name: 'Jon Snow',
                        abilities: "0个角色"
                    },
                    {
                        name: 'Jon Snow',
                        abilities: "0个角色"
                    }
                ]
            }
        },
        mounted: function() {
            get("/admin/getAllRoles", reponse => {
                this.tableData = reponse.data;
            })
        },
        methods: {
            edit (row, isModify) {
		        this.$Modal.confirm({
		          title: '角色信息',
		          render: (h) => {
		            return h(roleInfoModal, {
		              ref: 'roleInfoModal',
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
                    if(isModify) {
                        post("/admin/modifyRole", row, reponse => {
                            if(reponse.data.status == "fail") {
                                alert("ModifyAbility " + reponse.data.status + " 该角色不存在");
                            }else {
                                console.log("DelAbility Reply " + reponse.data.status);
                            }
                        }) 
                    }else {
                        post("/admin/addRole", row, reponse => {
                            if(reponse.data.status == "fail") {
                                alert("AddAbility " + reponse.data.status + " 该角色已存在");
                            }else {
                                console.log("DelAbility Reply " + reponse.data.status);
                            }
                        }) 
                    }
                    this.$Modal.remove()
                  },
                  onCancel() {
                      console.log("click cancel")
                      get("/admin/getAllRoles", reponse => {
                        console.log("Get reply", reponse.status);
                        this.tableData = reponse.data;
                      })
                  }
		        });
            },
            add() {
                this.tableData.unshift({
                    "name" : "",
                    "abilities": []
                })
                this.edit(this.tableData[0],false)
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData[index].name}<br>Type：${this.tableData[index].type}<br>Content：${this.tableData[index].content}`
                });

            },
            remove (row, index) {
                post("/admin/delRole", row, reponse => {
                    if(reponse.data.status == "fail") {
                            alert("DelyRole " + reponse.data.status + " 该角色正在被使用");
                        }else {
                            this.tableData.splice(index, 1);
                            console.log("DelRole Reply", reponse.data.status);
                        }
                })
            },
            showAbilities (row) {
                alert(row.abilities);
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

