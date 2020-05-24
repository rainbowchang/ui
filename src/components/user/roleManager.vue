<template>
  <div style="display: block">
     <div class="c_button">
         <Button type="primary" size="small">新增</Button>	
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
             <template slot-scope="{ row }" slot="abilities">
               <label class="c_label" @click="showAbilities(row)">{{ row.abilities }} </label>
           </template>
         </Table>
    </div>
  </div>
</template>
<script>
    import {get} from "@/apis/restUtils"
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
        mounted: {
            function() {
                get("/admin/getAllRoles", reponse => {
                    this.tableData = reponse.data;
                })
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

