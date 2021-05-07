<template>
  <div style="display: block">
  	<div class="c_button">
         <Button type="primary" ghost size="small" @click="add">新增</Button>

    </div>
    <div>
        <Table highlight-row height="auto" width= "auto" border :columns="columns12" :data="tableData">
            <template slot-scope="{ row }" slot="id">
               <strong>{{ row.id }}</strong>
           </template>
           <template slot-scope="{ row, index }" slot="action">
               <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, true)">编辑</Button>
               <Button type="error" size="small" @click="remove(row,index)">删除</Button>
                <Button type="error" size="small" @click="bindActiveCode(row)">绑定激活码</Button>
            </template>
         </Table>
    </div>
  </div>
</template>
<script>
    import editDeviceInfoModal from "./editDeviceInfoModal";
    // import addDeviceInfoModal from "./addDeviceInfoModal";
    import {get,post} from "@/apis/restUtils"
    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '设备ID',
                        slot: 'id',
                        resizable: true,
                        visible: false,
                        // width: 180
                    },
                    {
                        title: '设备SN',
                        key: 'sn',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '设备名称',
                        key: 'name',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '终端用户名称ID',
                        key: 'userId',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '终端用户名称',
                        key: 'userName',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '终端用户地区',
                        key: 'area',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '工厂',
                        key: 'factory'
                    },
                    {
                        title: '车间',
                        key: 'workshop'
                    },
                    {
                        title: '生产线',
                        key: 'productLine'
                    },
                    {
                        title: 'OEM厂商',
                        key: 'oemCompany'
                    },
                    {
                        title: 'OEMID',
                        key: 'oemId'
                    },
                    {
                        title: '机床型号',
                        key: 'model'
                    },
                    {
                        title: '出厂编号',
                        key: 'factoryNumber'
                    },
                    {
                        title: '最大主轴转速',
                        key: 'maxSpindleSpeed'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                tableData: [
                    // {
                    //     sn: 'sn-001',
                    //     name: '南京设备001',
                    //     userId: '0002345',
                    //     userName: '章三',
                    //     area: '东南区域',
                    //     factory: "工厂",
                    //     shop:"车间",
                    //     productLine:"生产线",
                    //     oemCompany:"宁庆机床厂",
                    //     oemId:"000034567",
                    //     deviceModel:"plc-009123",
                    //     factoryNumber:"f-001234",
                    //     maxSpeed:"300000"
                    // },
                    //  {
                    //     sn: 'sn-002',
                    //     name: '南京设备002234234',
                    //     userId: '0004566',
                    //     userName: '李四',
                    //     area: '东南区域',
                    //     factory: "工厂",
                    //     shop:"车间",
                    //     productLine:"生产线",
                    //     oemCompany:"海天机床厂",
                    //     oemId:"000034567",
                    //     deviceModel:"plc-009123",
                    //     factoryNumber:"f-001234",
                    //     maxSpeed:"300000"
                    // }
                ]
            }
        },
        mounted: function() {
            get("/organization/deviceInfo/getDeviceInfos", reponse => {
                this.tableData = reponse.data;
            })
        },
        methods: {
            edit (row, isModify) {
		        this.$Modal.confirm({
		          title: '编辑设备信息',
		          render: (h) => {
		            return h(editDeviceInfoModal, {
		              ref: 'editDeviceInfoModal',
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
                    console.log("click ok");
                    if(isModify) {
                        post("/organization/deviceInfo/modifyDeviceInfo", row, reponse => {
                            if(reponse.data.status == "fail") {
                                alert("ModifyDeviceInfo", reponse.data.status, "该设备不存在");
                            }else {
                                console.log("ModifyDeviceInfo Reply", reponse.status);
                            }
                        }) 
                    }else {
                        post("/organization/deviceInfo/addDeviceInfo", row, reponse => {
                            if(reponse.data.status == "fail") {
                                alert("ModifyDeviceInfo", reponse.data.status, "该设备不存在");
                            }else {
                                console.log("ModifyDeviceInfo Reply", reponse.status);
                            }
                        }) 
                    }
                    
                    this.$Modal.remove()
                  },
                  onCancel() {
                      console.log("click cancel")
                      get("/organization/deviceInfo/getDeviceInfos", reponse => {
                        console.log("Get reply", reponse.status);
                        this.tableData = reponse.data;
                      })
                  }
		        });
            },
            add() {
		        this.tableData.unshift({
                    sn: '',
                    name: '',
                    userId: '',
                    userName: '',
                    area: '',
                    factory: "",
                    workshop:"",
                    productLine:"",
                    oemCompany:"",
                    oemId:"",
                    model:"",
                    factoryNumber:"",
                    maxSpindleSpeed:""
                })
                this.edit(this.tableData[0],false)
            },
            remove (row, index) {
                console.log("user", row)
                post("/organization/deviceInfo/delDeviceInfo", row, reponse => {
                    console.log("DelUser Reply", reponse.status)
                    this.tableData.splice(index, 1);
                })
            },
            bindActiveCode(row){
              alert("绑定激活码：" + JSON.stringify(row));   
            }
        }
    };
</script>
<style>
.c_button{
	margin-top: 1%;
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

