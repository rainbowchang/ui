<!--将组织机构下所有机器的时间滚动条汇总到一起-->
<template>
    <div class="wrappers">
        <div class="top">
            <el-button type="primary" icon="el-icon-arrow-left" @click="back">上一层</el-button>
            <span>时间作业状态</span>
            <div></div>
        </div>
        <div class="currentdata">
            <div></div>
            <DatePicker
                @on-change="changedate"
                @on-ok="suredata"
                type="date"
                confirm
                placeholder="请选择日期"
                style="width: 200px"
            ></DatePicker>
            <div></div>
        </div>
        <div class="content">
            <Tabs value="name1">
                <TabPane label="设备序列号" name="name1">
                    <div class="infolist">
                        <div class="listcontent">
                            <div v-for="(item,index) in timeAxisList" :key="index">
                                <div class="listleft listleft1">{{ item.name }}</div>
                                <!-- 中间图表 -->
                                <div class="listmid">
                                    <div>
                                        <div :id="item.chart" class="timeAxis" style=" margin-bottom: -1.4%">

                                        </div>
                                    </div>
                                    <div class="colorline">
                                        <!--                    <div>-->
                                        <!--                      <div class="breakdown"></div>-->
                                        <!--                      <span></span>-->
                                        <!--                    </div>-->
                                        <div>
                                            <div class="process"></div>
                                            <span>加工：{{ item.status.workTime }}</span>
                                        </div>
                                        <div>
                                            <div class="stop"></div>
                                            <span>停机：{{ item.status.stopTime }}</span>
                                        </div>
                                        <div>
                                            <div class="none"></div>
                                            <span>未连接：{{ item.status.offlineTime }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import {post, getTimeAxis} from "@/apis/restUtils"

export default {
    name: "statusinfonew",
    props: ["statusinfonew"],
    data() {
        return {
            dateChoose2: "",
            dateChoose1: "",
            currentdate: "",
            currentPage: 1, //分页当前页数,
            selections: [],
            timeAxisList: [],
            flagOfTimeAxis: true,
        }
    },
    methods: {

        //返回上一层
        back() {
            this.$emit("onstatusinfoback");
        },
        //日期改变
        changedate(e) {
            console.log("时间选择", e);
            this.currentdate = e;
        },
        //确认日期
        suredata() {
            console.log("当前确认的日期", this.currentdate);
            for (let i = 0; i < this.selections.length; i++) {
                post("/organization/customer/getOneDayStatus", {"id": this.selections[i].id, "date": this.currentdate},
                    reponse => {
                        this.timeAxisList[i].status = reponse.data;
                        console.log("timeAxisList: ", this.timeAxisList[i]);
                        getTimeAxis(reponse.data, this.timeAxisList[i].chart, this);
                    });
            }
        },
    },
    watch: {
        statusinfonew(val) {
            console.log("statusinfonew 表格选中的行信息", val.selections, "   ", val.statusinfoshow);
            if (val.statusinfoshow) {
                this.selections = val.selections;
                this.timeAxisList = [];
                for (let selection of this.selections) {
                    this.timeAxisList.push({
                        "chart": "timeAxis-" + selection.id,
                        "lineChart": "lineChart-" + selection.id,
                        "name": selection.alias,
                        "status": {
                            "workTime": "0",
                            "stopTime": "0",
                            "offlineTime": "0",
                            "workStatusSegmentList": [],
                            "feedOverridesList": [],
                            "spindleOverridesList": [],
                            "timeStampList": []
                        }
                    })
                }
                for (let i = 0; i < this.selections.length; i++) {
                    let id = this.selections[i].id;
                    post("/organization/customer/getOneDayStatus",
                        {"id": id, "date": ""},
                        reponse => {
                            this.timeAxisList[i].status = reponse.data;
                            console.log("timeAxisList: ", this.timeAxisList[i]);
                            getTimeAxis(reponse.data, this.timeAxisList[i].chart, this);
                        }
                    );
                }
            }
        }
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
    height: 90%;
    position: absolute;
    top: 70px;
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
    top: 40px;
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