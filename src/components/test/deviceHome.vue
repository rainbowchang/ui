<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow:auto;
    display: flex;
    flex-direction: row;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <div class="layout">
            <Layout :style="{padding: '0 24px 24px'}">
                 <Content :style="{padding: '24px', minHeight: '100%', background: '#fff'}">
                  <Table  width="550" height="500" border :columns="funcColumns" :data="funcData">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                        <Button type="error" size="small" @click="remove(index)">Delete</Button>
                    </template>
                  </Table>
               </Content>
           </Layout>
            <Layout :style="{padding: '0 24px 24px; minHeight:100px'}">
                <Content :style="{padding: '24px', minHeight: '100%', background: '#fff'}">
                    <Table width="550" height="500" border :columns="relatedColumns" :data="relatedData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                            <Button type="error" size="small" @click="remove(index)">Delete</Button>
                        </template>
                      </Table>
                </Content>
            </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                funcColumns:[],
                funcData:[],
                relatedColumns:[],
                relatedData:[]
            }
        },
        mounted: function(){
            this.funcColumns = this.getFuncColumns();
            this.funcData = this.getFuncData();
            this.relatedColumns = this.getRelatedColumns();
            this.relatedData = this.getRelatedData();
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            getFuncData(){
                return  [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ];
            },
            getFuncColumns(){
                return  [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ];
            },
            getRelatedData(){
                return[
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    }
                ];
            },
            getRelatedColumns(){
                return  [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ];
            }
        }
    }
</script>

