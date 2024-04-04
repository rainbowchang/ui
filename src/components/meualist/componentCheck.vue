<template>
  <div style="display: block">
    <div class="c_button">
      <Button type="primary" ghost size="small" @click="add">新增</Button>
      <Button type="primary" ghost size="small" @click="exports">导出</Button>
    </div>
    <div>
      <Table highlight-row height="auto" width="auto" border :columns="columns12" :data="tableData">
        <template slot-scope="{ row }" slot="id">
          <strong>{{ row.id }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, true)">编辑</Button>
          <Button type="error" size="small" @click="remove(row,index)">删除</Button>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import {post} from "@/apis/restUtils";
import editComponentCheckModal from "./editComponentCheckModal";

export default {
  data() {
    return {
      columns12: [
        {
          title: 'ID',
          slot: 'id',
          resizable: true,
          visible: false,
          // width: 180
        },
        {
          title: 'SN',
          key: 'componentSn',
          resizable: true,
          // width: 180
        },        {
          title: '齿顶圆直径(mm)',
          key: 'col1',
          resizable: true,
          // width: 180
        },
        {
          title: '总厚(mm)',
          key: 'col2',
          resizable: true,
          // width: 180
        },
        {
          title: '齿宽(mm)',
          key: 'col3',
          resizable: true,
          // width: 180
        },
        {
          title: '基准面侧内孔外口直径(mm)',
          key: 'col4',
          resizable: true,
          // width: 180
        },
        {
          title: '基准面侧内孔内口直径(mm)',
          key: 'col5',
          resizable: true,
          // width: 180
        },
        {
          title: '非基准面侧内孔外口直径(mm)',
          key: 'col6',
          resizable: true,
          // width: 180
        },
        {
          title: '非基准面侧内孔内口直径(mm)',
          key: 'col7',
          resizable: true,
          // width: 180
        },
        {
          title: '内孔中间台阶直径(mm)',
          key: 'col8',
          resizable: true,
          // width: 180
        },
        {
          title: '内孔中间台阶厚度(mm)',
          key: 'col9',
          resizable: true,
          // width: 180
        },
        {
          title: '基准面侧内孔深度(mm)',
          key: 'col10',
          resizable: true,
          // width: 180
        },
        {
          title: '非基准面侧内孔深度(mm)',
          key: 'col11',
          resizable: true,
          // width: 180
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tableData: [
      ]
    }
  },
  mounted: function () {
    post("/componentCheck/getComponentCheckInfo", {}, reponse => {
      this.tableData = reponse.data;
    })
  },
  methods: {
    edit(row, isModify, tableData) {
      this.$Modal.confirm({
        title: '自检录入',
        render: (h) => {
          return h(editComponentCheckModal, {
            ref: 'editComponentCheckModal',   //!!????
            props: {
              row: row,
            },
            on: {
              onModifyOk: (key) => {
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
          if (isModify) {
            post("/organization/deviceInfo/modifyDeviceInfo", row, reponse => {
              if (reponse.data.status == "fail") {
                alert("ModifyDeviceInfo", reponse.data.status, "该设备不存在");
              } else {
                console.log("ModifyDeviceInfo Reply", reponse.status);
              }
            })
          } else {
            post("/organization/deviceInfo/addDeviceInfo", row, reponse => {
              if (reponse.data.status == "fail") {
                alert("ModifyDeviceInfo", reponse.data.status, "该设备不存在");
              } else {
                console.log("ModifyDeviceInfo Reply", reponse.status);
              }
            })
          }

          this.$Modal.remove()
        },
        onCancel() {
          if (!(tableData === undefined || tableData == null)) {
            tableData.shift();
          }
        }
      });
    },
    add() {
      this.tableData.unshift({
        id: '',
        col1: '',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6: '',
        col7: '',
        col8: '',
        col9: '',
        col10: '',
        col11: ''
      })
      this.edit(this.tableData[0], false, this.tableData)
    },
    exports(){
      post("/componentCheck/export", {}, response => {
        console.log(response.data);
      })
    }
    // remove(row, index) {
    //
    // }
  }

};

</script>