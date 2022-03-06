<template>
    <div class="wrappers">
        <div class="top">
            <el-button type="primary" icon="el-icon-arrow-left" @click="back">上一层</el-button>
            <span>班组统计</span>

            <el-button type="primary" icon="el-icon-download" @click="exportData">导出表格</el-button>

        </div>
        <br>
        <div class="currentdata">
            <DatePicker
                @on-change="changedate"
                @on-ok="suredata"
                type="date"
                confirm
                placeholder="请选择日期"
                style="width: 200px"
            ></DatePicker>
        </div>
        <div>  <br></div>
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
        </div>
    </div>
</template>

<script>
import {post} from "@/apis/restUtils";
export default {
    name: "scheduleStatistics",
    data() {
        return {
            selections: [],
            currentdate: "",
            title: [
                {
                    title: "机床序号",   //"客户名称",
                    key: "model",
                    sortable: true,
                    width: 150
                },
                {
                    title: "加工件数",   //"客户名称",
                    key: "piece1",
                    sortable: true,
                    width: 120
                },
                {
                    title: "加工时间",   //"客户名称",
                    key: "worktime1",
                    sortable: true,
                    width: 120
                },
                {
                    title: "停机时间",   //"客户名称",
                    key: "idletime1",
                    sortable: true,
                    width: 120
                },
                {
                    title: "加工件数",   //"客户名称",
                    key: "piece2",
                    sortable: true,
                    width: 120
                },
                {
                    title: "加工时间",   //"客户名称",
                    key: "worktime2",
                    sortable: true,
                    width: 120
                },
                {
                    title: "停机时间",   //"客户名称",
                    key: "idletime2",
                    sortable: true,
                    width: 120
                },
                {
                    title: "加工件数",   //"客户名称",
                    key: "piece3",
                    sortable: true,
                    width: 120
                },
                {
                    title: "加工时间",   //"客户名称",
                    key: "worktime3",
                    sortable: true,
                    width: 120
                },
                {
                    title: "停机时间",   //"客户名称",
                    key: "idletime3",
                    sortable: true,
                    width: 120
                },
            ],
            content:[

            ]
        }
    },
    watch:{
        scheduleStatistics(val){
            console.log("statusinfonew 表格选中的行信息", val.selections, "   ", val.scheduleStatisticsShow);
            if (val.scheduleStatisticsShow) {
                this.selections = val.selections;
            }
        }
    },
    methods: {
        back() {
            this.$emit("onstatusinfoback");
        },
        changedate(e) {
            console.log("时间选择", e);
            this.currentdate = e;
        },
        suredata() {
            console.log("当前确认的日期", this.currentdate);
            post("/organization/getScheduleStatistics", {"selections": this.selections, "date": this.currentdate},
                response => {
                    console.log(response);
                    this.content = response.data;
                });

        },
        exportData() {
            post("/organization/exportScheduleStatistics", {"selections": this.selections, "date": this.currentdate},
                response => {
                    console.log(response);
                });
        },
    },

    mounted: function () {


    }
}
</script>

<style scoped>
.wrappers {
    width: 100%;
    height: 100%;
    min-width: 1240px;
    /* min-height: 860px; */
    border-radius: 3px;
    background-color: white;
    position: relative;
    overflow: hidden;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

.chartsshow {
    width: 100%;
    height: 40%;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1em;
    overflow: auto;
}

.chartsshow > div {
    width: 100%;
    min-height: 190px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
}

.pieshow {
    width: 20%;
}

.headBottom {
    width: 60%;
    height: 100%;
    max-width: 980px;
}

.top {
    width: 100%;
    padding: 0 2em;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.top > span {
    font-size: 18px;
    font-weight: bold;
}

.content {
    width: 100%;
    height: 85%;
    position: absolute;
    top: 100px;
    border-bottom: 2px solid gray;
    overflow: auto;
}

.content > div {
    width: 100%;
}

.infolist {
    width: 100%;
    min-height: 280px;
}

.listcontent {
    width: 100%;
}

/* 分页 */
.pagenum {
    text-align: center;
    position: absolute;
    bottom: 5em;
}

/* 列表内容 */
.listcontent {
    width: 100%;
}

.listcontent > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 1em 1em;
    margin-bottom: 1.5em;
}

/* 列表左侧 */
.listleft {
    width: 15%;
    font-size: 16px;
    font-weight: bold;
    height: auto;
}

/* 列表中间 */
.listmid {
    width: 70%;
}

.colorline {
    width: 90%;
    display: flex;
    flex-direction: row;
    padding-left: 80px;
}

.colorline > div {
    width: 32%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0em;
    justify-content: center;
}

/* 列表右侧 */
.listright {
    width: 25%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.listright > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.listright > div > span {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
}

.process,
.breakdown,
.stop,
.none,
.interrupt {
    width: 50px;
    height: 12px;
    border-radius: 12px;
    background-color: #089642;
    margin-right: 0.5em;
}

.breakdown {
    width: 0px;
    background-color: #ffffff;
}

.stop {
    background-color: #fffc02;
}

.none {
    background-color: #808080
}

.interrupt {
    background-color: #808080;
}

.statusline {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.statusline > div {
    height: -1%;
    border: 0;
    border-radius: 0;
    margin: 0;
}

.timeAxis {
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.timeAxis > div {
    height: -1%;
    border: 0;
    border-radius: 0;
    margin: 0;
}

.lineChartClass {
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.lineChartClass > div {
    height: -1%;
    border: 0;
    border-radius: 0;
    margin: 0;
}

.timeline {
    width: 100%;
    height: 4%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e9;
}

.timeline > div {
    width: 13%;
    height: 10%;
    border-right: 1px solid #e9e9e9;
}

.timeshow {
    border: 0;
    /* background-color: #efefef; */
    height: 18px;
    align-items: center;
}

.timeshow > div {
    border: 0;
    text-align: right;
    transform: translateX(1em);
    margin-top: 2%
}

.currentdata {
    display: flex;
    flex-direction: row;
    width: 240px;
    justify-content: space-between;
    margin: 0 auto;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateX(6em);
}

.currentdata > span {
    cursor: pointer;
    font-size: 16px;
}

.date {
    color: #2c86ce;
}

.listleft.listleft1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: right;
}
</style>