<template>
  <div style="display: block">
     <div class="c_button">
         <Button type="primary">新增</Button>	
    </div>
    <div>
        <Table highlight-row height="350" width= "900" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="name">
               <strong>{{ row.name }}</strong>
           </template>
           <template slot-scope="{ row, index }" slot="action">
               <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
               <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
         </Table>
    </div>
  </div>
</template>
<script>
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
                        content: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        type: "page",
                        content: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        type: "api",
                        content: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        type: "api",
                        content: 'Ottawa No. 2 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        type: "tree",
                        content: 'Ottawa No. 2 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        type: "tree",
                        content: 'Ottawa No. 2 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        type: "tree",
                        content: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData[index].name}<br>Type：${this.tableData[index].type}<br>Content：${this.tableData[index].content}`
                });

            },
            remove (index) {
                this.tableData.splice(index, 1);
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
</style>

