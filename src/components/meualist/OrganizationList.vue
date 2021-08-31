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
import {get} from "@/apis/restUtils";
import editOrganizationModal from "@/components/meualist/editOrganizationModal";
import {post} from "@/apis/restUtils";

export default {
  name: "OrganizationList",
  data() {
    return {
      tableData: [],
      columns04: [
        {
          title: '名称',
          key: 'name',
          resizable: true,
        }, {
          title: '类型',
          key: 'type',
          resizable: true,
          render: (h, params) => {
            return h('span', (() => {
              for (let orgType of this.orgTypeList) {
                if (orgType.id === params.row.type) {
                  return orgType.typeName;
                }
              }
            })());
          }
        },
        {
          title: '地址（位置）',
          key: 'location',
          resizable: true,
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      orgTypeList: [],
      parentId: '',
    }
  },
  mounted: function () {
    get("/organization/getAllOrgType", response => {
      this.orgTypeList = response.data;
      this.refresh();
    })
  },
  methods: {
    edit(row, isModify, tableData) {
      let that = this;
      this.$Modal.confirm({
        title: '编辑',
        render: (h) => {
          return h(editOrganizationModal, {
            ref: 'editOrganizationModal',
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
            post("/organization/updateOrganization", row, response => {
              if (response.data.status === "fail") {
                alert("Organization Editor + 保存错误");
              }
              that.refresh();
              that.$emit('refresh');
            })
          } else {
            post("/organization/addOrganization", row, response => {
              if (response.data.status === "fail") {
                alert("Organization Editor + 保存错误");
              } else {
                console.log("response.data.result: ", response.data.result)
                tableData[0].id = response.data.result;
              }
              that.refresh();
              that.$emit('refresh');
            })
          }
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
      post("/organization/deleteOrganization", row, response => {
        console.log("response.status: ", response.status)
        this.tableData.splice(index, 1);
        this.$emit('refresh');
      })
    },
    add() {
      this.tableData.unshift({
        name: '',
        type: '',
        location: '',
        parentId: this.parentId,
      })
      this.edit(this.tableData[0], false, this.tableData)
    },
    refresh() {
      if(this.parentId === undefined || this.parentId == null || this.parentId === ''){
        return;
      }
      this.tableData = [];
      get("/organization/getDirectChildrenOrg?parentId=" + this.parentId, resposne => {
        this.tableData = resposne.data;
      });
    }
  }
}
</script>

<style scoped>

</style>