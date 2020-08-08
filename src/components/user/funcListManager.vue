<template>
  <div style="display: block">
    <div>
        <Table highlight-row height="350" width= "1000" border :columns="tableColumns" :data="tableData">
           <template slot-scope="{ row , index}" slot="action">
               <Button v-show="editButtonShow" type="primary" size="small" style="margin-right: 5px" @click="edit(row,  index)">修改</Button>
            </template>
         </Table>
    </div>
  </div>
</template>
<script>
    // import {post,get} from "@/apis/restUtils"
    import funcEditModal from "./funcEditModal";

    export default {
        data () {
            return {
                editButtonShow: true,
                tableColumns: [],
                tableData: []
            }
        },
        mounted: function(){
            this.tableColumns = this.getTableColumns();
            this.tableData = this.getTableData();
        },
        methods: {
            edit (row, index) {
                this.$Modal.confirm({
                  title: '角色信息',
                  render: (h) => {
                    return h(funcEditModal, {
                      ref: 'funcEditModal',
                      props: {
                        row: row,
                        index: index
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
                    row.name = "xiaowen";
                    this.$Modal.remove()
                  },
                  onCancel() {
                      console.log("click cancel") 
                  }
                });
            },
            cancel (row) {
                console.log(row);
            },
            getTableColumns(){
                return [
                    {
                        title: '功能编码',
                        key: 'funcCode'
                    },
                    {
                        title: '功能',
                        key: 'funcContent'
                    },
                    {
                        title: '功能描述',
                        key: 'description'
                    },
                    {
                        title: '功能描述',
                        key: 'description'
                    }
                ];
            },
            getTableData(){

                return [
                    {
                        funcCode: 'func_001',
                        funcContent: '机床细节',
                        description: "有关机床等主要细节监控"
                    },
                    {
                        funcCode: 'func_002',
                        funcContent: '大屏监控',
                        description: "对大屏监控"
                    }
                ];
            }
        }


     };
</script>

