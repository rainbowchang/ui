<template>
  <div style="display: block">
    <div class="c_button">
      <Button type="primary" ghost size="small" @click="add">新增</Button>
    </div>
    <div>
      <Table highlight-row height="auto" width="auto" border :columns="columns04" :data="tableData">
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
import {get, post, formatDate} from "@/apis/restUtils";
import editScheduleInstModal from "@/components/meualist/editScheduleInstModal";


export default {
  name: "ScheduleInstList",
  data() {
    return {
      tableData: [],
      columns04: [
        {
          title: '名称',
          key: 'name',
          resizable: true,
        },
        // {
        //   title: '所属组织',
        //   key: 'organizationId',
        //   resizable: true,
        // },
        {
          title: '所属日期',
          key: 'scheduleDate',
          resizable: true,
          render: (h, params) => {
            return h('span', (() => {
              return formatDate(params.row.scheduleDate, 'yyyy-MM-dd');
            })());
          }
        },
        {
          title: '开始时间',
          key: 'beginTime',
          resizable: true,
          render: (h, params) => {
            return h('span', (() => {
              return formatDate(params.row.beginTime, 'yyyy-MM-dd hh:mm:ss');
            })());
          }
        },
        {
          title: '结束时间',
          key: 'endTime',
          resizable: true,
          render: (h, params) => {
            return h('span', (() => {
              return formatDate(params.row.endTime, 'yyyy-MM-dd hh:mm:ss');
            })());
          }
        },
        // {
        //   title: '休息日标识',
        //   key: 'weekendFlag',
        //   resizable: true,
        // },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      parentId: '',
    }
  },
  mounted: function () {
    this.refresh();
  },
  methods: {
    edit(row, isModify, tableData){
      let that = this;
      this.$Modal.confirm({
        render: (h) => {
          return h(editScheduleInstModal, {
            ref: 'editScheduleInstModal',
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
          if (isModify) {
            post("/organization/updateScheduleInst", row, response => {
              if (response.data.status === "fail") {
                alert("ScheduleInst Editor + 保存错误");
              }
              that.refresh();
            })
          }
          // else {
          //   // row.organizationId = this.parentId;
          //   post("/organization/addScheduleInst", row, response => {
          //     if (response.data.status === "fail") {
          //       alert("Organization Editor + 保存错误");
          //     } else {
          //       console.log("response.data.result: ", response.data.result)
          //       tableData[0].id = response.data.result;
          //     }
          //     that.refresh();
          //   })
          // }
          this.$Modal.remove();
        },
        onCancel() {
          if (!(tableData === undefined || tableData == null)) {
            tableData.shift();
          }
        },

      });
    },
    remove(row, index) {
      post("/organization/deleteScheduleInst", row, response => {
        console.log("response.status: ", response.status)
        this.tableData.splice(index, 1);
      })
    },
    add() {
      post("/organization/createScheduleInst", {"organizationId": this.parentId}, ()=>{
        this.refresh();
      })
    },
    refresh() {
      if (this.parentId === undefined || this.parentId == null || this.parentId === '') {
        return;
      }
      this.tableData = [];
      get("/organization/getOrganizationScheduleInst?parentId=" + this.parentId, resposne => {
        this.tableData = resposne.data;
      });
    },
  }
}
</script>

<style scoped>

</style>