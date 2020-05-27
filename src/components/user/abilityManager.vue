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
         </Table>
    </div>
  </div>
</template>
<script>
    import abilityInfoModal from "./abilityInfoModal";
    import {post,get} from "@/apis/restUtils"
    export default {
        data () {
            return {
                columns12: [
                    {
                        title: 'Name',
                        slot: 'name',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: '类型',
                        key: 'type',
                        resizable: true,
                        width: 180
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '描述',
                        key: 'description'
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
                ]
            }
        },
        mounted: function() {
            get("/admin/getAllAbilities", reponse => {
                this.tableData = reponse.data;
            })
        },
        methods: {
            edit (row, isModify) {
		        this.$Modal.confirm({
		          title: '能力信息',
		          render: (h) => {
		            return h(abilityInfoModal, {
		              ref: 'abilityInfoModal',
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
                        post("/admin/modifyAbility", row, reponse => {
                            if(reponse.data.status == "fail") {
                                alert("ModifyAbility " + reponse.data.status + " 该能力不存在");
                            }else {
                                console.log("ModifyAbility Reply", reponse.data.status);
                            }
                        }) 
                    }else {
                        post("/admin/addAbility", row, reponse => {
                            if(reponse.data.status == "fail") {
                                alert("AddAbility " + reponse.data.status + " 该能力已存在");
                            }else {
                                console.log("AddAbility Reply", reponse.data.status);
                            }
                        }) 
                    }
                    this.$Modal.remove()
                  },
                  onCancel() {
                      console.log("click cancel")
                      get("/admin/getAllAbilities", reponse => {
                        this.tableData = reponse.data;
                        console.log("Get reply", this.tableData);
                      })
                  }
		        });
            },
            add () {
                this.tableData.unshift({
                    "name" : "",
                    "type": "",
                    "content": "",
                    "description": ""
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
                post("/admin/delAbility", row, reponse => {
                    if(reponse.data.status == "fail") {
                        alert("DelAbility " + reponse.data.status + " 该能力正在被使用");
                    }else {
                        this.tableData.splice(index, 1);
                        console.log("DelAbility Reply", reponse.data.status);
                    }
                    
                })
            }
        }
    };
</script>
<style>
</style>

