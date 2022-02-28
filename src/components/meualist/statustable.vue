<template>
    <div class="wrapperd">
        <!-- 右侧table及各个功能 -->
        <div class="tableinfo">
            <div class="search">
                <span class="font">全部设备：共{{ totalCount }}台</span>
                <div class="searchinput">
                    <Input :style="{width:'180px;'}" search enter-button placeholder="请输入查询内容"/>
                </div>
                <div>
                <Button type="primary" size="large" @click="exportData">
                    <Icon type="ios-download-outline"></Icon>
                    导出表格
                </Button>
                <Button type="primary" size="large" @click="onLargeScreen">
                    <Icon type="ios-desktop-outline"></Icon>
                    查看大屏
                </Button>
                </div>
            </div>
            <div class="content">
                <Table v-loading="loading"
                       element-loading-text="加载中..."
                    :columns="title"
                    :data="content"
                    size="small"
                    ref="table"
                    @on-selection-change="selectTip"
                    :max-height="540"
                ></Table>
                <Button type="primary" icon="ios-search" class="searchbtn" @click="tostatusInfo">按时间序列查询</Button>
                <Button type="primary" icon="ios-search" class="searchbtn" @click="toScheduleStatistics">按班组统计</Button>
                <Page style="position:absolute;bottom:0em; margin-top: 10%" :total="totalCount" :current="pageNum"
                      :page-size="10" show-elevator show-sizer show-total placement="top"
                      @on-change="handlePage"></Page>
            </div>
            <!--      <Modal v-model="statusinfoshow" class="statusstyle" fullscreen footer-hide>-->
            <!--        <statusinfonew :statusinfonew="{selections,statusinfoshow}" @modelshow="modelshow"></statusinfonew>-->
            <!--      </Modal>-->
        </div>
    </div>
</template>
<script>
// import statusinfo from "../departs/statusinfo";
// import statusinfonew from "../departs/statusinfonew";
// import {post} from "@/apis/restUtils";

export default {
    // components: { statusinfonew },
    data() {
        return {
            nodeKey: "",
            pageNum: 1,
            totalCount: 11,
            statusinfoshow: false, //详情弹窗是否展示
            dateChoose: "", //table选择开始结束时间
            currentPage: 1, //分页当前页数,
            title: [
                {
                    title: "机床名称",   //"客户名称",
                    key: "alias",
                    sortable: true,
                    width: 200
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
                                            ? "#ed4014" : params.row.status == "停机"
                                                ? "#fffc02" : params.row.status == "未连接" ?
                                                    "#808080" : "#e9e9e9",
                                    borderRadius: "50%",
                                    marginRight: "8px"
                                }
                            }),
                            h("strong", params.row.status)
                        ]);
                    }
                },

                {
                    title: "加工时间",
                    key: "workTime",
                    sortable: true
                },
                {
                    title: "加工件数",
                    key: "workPieces",
                    sortable: true
                },
                {
                    title: "利用率",
                    key: "utilization",
                    sortable: true,
                    render: (h, params) => {
                        return h('span', (() => {
                            let utilization = params.row.utilization;
                            return utilization + '%';
                        })());
                    }
                },
                {
                    title: "报警次数",
                    key: "alarmCount",
                    sortable: true
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
                // {
                //   name: "南京宁庆机床数控有限公司",
                //   model: "VC1480G",
                //   serial: "VC1480G",
                //   CNC: "VC1480G",
                //   productionDate: "2019.7.28",
                //   status: "加工",
                //   workTime: "2小时",
                //   warning: "..."
                // },
            ],
            selections: [], //操作中选中的所选项数组
            loading: true,
        };
    },
    methods: {
        // handlePage(value) {
        //     post("/organization/node/trigger", {key: this.nodeKey, pageNo: value, pageSize: 10}, reponse => {
        //         var replyStatus = reponse.data;
        //         if (replyStatus == null) {
        //             return;
        //         }
        //         this.content = replyStatus.plcInfoBeans;
        //         this.totalCount = replyStatus.total;
        //     });
        // },
        // table导出表格
        exportData() {
            this.$refs.table.exportCsv({
                filename: "equipsList"
            });
        },
        modelshow(val) {
            this.statusinfoshow = val;
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
            this.$emit('onselection', {'selections': this.selections, 'statusinfoshow': this.statusinfoshow});
            // 已选择的当前信息（数组）
            console.log(selection);
        },
        // 列表跳转详细信息页面
        tostatusInfo() {
            this.statusinfoshow = true;
            this.$emit('onshowstatusinfo', {'selections': this.selections, 'statusinfoshow': this.statusinfoshow});
            this.statusinfoshow = false;
        },
        toScheduleStatistics(){

        },
        onLargeScreen(){
            this.$router.push({path: '/bigScreen?nodeKey=' + this.nodeKey});
        }
    }
};
</script>
<style scoped>
.wrapperd {
    width: 100%;
    height: 100%;
    margin: 0% auto;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /*overflow: auto;*/
}

.wrapper > div {
    height: 90%;
    background-color: white;
    border-radius: 3px;
}

.treelist {
    width: 16%;
    padding-top: 2em;
}

.statusstyle {
    /* min-height: 860px; */
}

.tableinfo {
    width: 100%;
    padding: 2em -1em;
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