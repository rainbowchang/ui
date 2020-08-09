<template>
    <div style="display: block">
        <div style="margin-top:3%">  
            <Table highlight-row height="390" width= "1000" border ref="selection" :columns="activeCodeColumns" :data="activeCodeData" @on-select="selectOne" @on-select-all="selectAll">
                
            </Table>
        </div>
    </div>
</template>
<script>
    // import {post} from "@/apis/restUtils"

    export default {
        data () {
            return {
                rowData: "",
                activeCodeColumns: [],
                activeCodeData: []
            };
        },
        mounted: function() {
            this.activeCodeColumns = this.getActiveCodeColumns();
            this.activeCodeData = this.getActiveCodeData();
        },
        methods:{
            selectOne(selection){
                alert(JSON.stringify(selection));  // select is a array.
            },
            selectAll(selection){
                alert(JSON.stringify(selection)); // select is a array.
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            getActiveCodeData(){
                this.activeCodeData = [];
                if(this.activeCodeData.length == 0){
                   return this.getDefaultActiveCodeData();
                }
            },
            getActiveCodeColumns(){
                return [ 
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                   {
                        title: '激活码',
                        key: 'activeCode'
                    },
                    {
                        title: '功能编码',
                        key: 'funcCode'
                    },
                    {
                        title: '功能',
                        key: 'funcContent'
                    }];
            },
            getDefaultActiveCodeData(){
                return [
                    {
                        activeCode: '23456792',
                        funcCode: 'func_001',
                        funcContent: '精细化控制'
                    },
                    {
                        activeCode: '458456792',
                        funcCode: 'func_002',
                        funcContent: '机床监控'
                    }];
            }
        }

    };
</script>

<style scoped>
.c_button{
     display: flex; 
     justify-content: flex-end; 
     width: 95%
}
</style>