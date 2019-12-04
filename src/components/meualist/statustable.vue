<template>
  <div class="wrapper">
    <!-- 右侧table及各个功能 -->
    <div class="tableinfo">
      <div class="search">
        <span class="font">全部设备：共6台</span>
        <div class="searchinput">
          <Input :style="{width:'180px;'}" search enter-button placeholder="请输入查询内容" />
        </div>
        <Button type="primary" size="large" @click="exportData">
          <Icon type="ios-download-outline"></Icon>导出表格
        </Button>
      </div>
      <div class="content">
        <Table
          :columns="title"
          :data="content"
          size="small"
          ref="table"
          @on-selection-change="selectTip"
          :max-height="540"
        ></Table>
        <Button type="primary" icon="ios-search" class="searchbtn">按时间序列查询</Button>
        <!-- page-sizes分页数组，page-size分页当前一页的条数，total总条数 -->
        <Page style="position:absolute;bottom:1em;" :total="100" show-elevator show-sizer />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateChoose: "", //table选择开始结束时间
      currentPage: 1, //分页当前页数,
      title: [
        {
          title: "客户名称",
          key: "name",
          sortable: true,
          width: 300
        },
        {
          title: "机床型号",
          key: "model",
          sortable: true
        },
        {
          title: "机床序列号",
          key: "serial",
          sortable: true
        },
        {
          title: "系统型号",
          key: "CNC",
          sortable: true
        },
        {
          title: "出厂日期",
          key: "productionDate",
          sortable: true
        },
        {
          title: "当前状态",
          key: "status",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h("icon", {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  width: "8px",
                  height: "8px",
                  backgroundColor:
                    params.row.status == "加工"
                      ? "#19be6b"
                      : params.row.status == "故障"
                      ? "#ed4014"
                      : "#808695",
                  borderRadius: "50%",
                  marginRight: "8px"
                }
              }),
              h("strong", params.row.status)
            ]);
          }
        },
        {
          title: "报警标记",
          key: "warning",
          sortable: true
        },
        {
          title: "操作",
          type: "selection",
          width: 60,
          align: "center"
        }
      ],
      content: [
        {
          name: "南京宁庆机床数控有限公司",
          model: "VC1480G",
          serial: "VC1480G",
          CNC: "VC1480G",
          productionDate: "2019.7.28",
          status: "加工",
          warning: "..."
        },
        {
          name: "南京宁庆机床数控有限公司",
          model: "VC1480G",
          serial: "VC1480G",
          CNC: "VC1480G",
          productionDate: "2019.7.28",
          status: "关机",
          warning: "..."
        },
        {
          name: "南京宁庆机床数控有限公司",
          model: "VC1480G",
          serial: "VC1480G",
          CNC: "VC1480G",
          productionDate: "2019.7.28",
          status: "故障",
          warning: "..."
        },
        {
          name: "南京宁庆机床数控有限公司",
          model: "VC1480G",
          serial: "VC1480G",
          CNC: "VC1480G",
          productionDate: "2019.7.28",
          status: "加工",
          warning: "..."
        },
        {
          name: "南京宁庆机床数控有限公司",
          model: "VC1480G",
          serial: "VC1480G",
          CNC: "VC1480G",
          productionDate: "2019.7.28",
          status: "加工",
          warning: "..."
        },
        {
          name: "南京宁庆机床数控有限公司",
          model: "VC1480G",
          serial: "VC1480G",
          CNC: "VC1480G",
          productionDate: "2019.7.28",
          status: "加工",
          warning: "..."
        }
      ],
      selections: [] //操作中选中的所选项数组
    };
  },
  methods: {
    // table导出表格
    exportData() {
      this.$refs.table.exportCsv({
        filename: "The original data"
      });
    },
     //   分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 选择要查看详细信息的列
    selectTip(selection) {
      this.selections = selection;
    },

  }
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 95%;
  margin: 1% auto;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: auto;
}
.wrapper > div {
  height: 100%;
  background-color: white;
  border-radius: 3px;
}
.treelist {
  width: 16%;
  padding-top: 2em;
}
.tableinfo {
  width: 100%;
  padding: 2em 1em;
}
.font {
  font-size: 16px;
  font-weight: bold;
  margin-right: 1em;
}
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
}
.searchinput {
  width: 240px;
  display: flex;
  flex-direction: row;
}
.searchbtn {
  float: right;
  margin: 2em 1em;
}
/* 分页 */
.pagenum {
  text-align: center;
  position: absolute;
  bottom: 5em;
}
</style>