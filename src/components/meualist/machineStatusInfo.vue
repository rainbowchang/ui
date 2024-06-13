<!--汇总机床的统计信息-->
<template>
    <div class="wrappers">
        <div class="top">
            <!--            <el-button type="primary" icon="el-icon-arrow-left" @click="back">上一层</el-button>-->
            <div></div>
            <span>机床作业统计</span>
            <div></div>
        </div>
        <div class="currentdata">
            <div></div>
            <DatePicker
                type="daterange"
                :style="{width:'240px'}"
                placement="bottom-end"
                placeholder="请选择开始日期——结束日期"
                style="width: 200px;margin-bottom:1em;"
                @on-change="onDateChange"
            ></DatePicker>

            <el-select @change="selectChanged($event)" v-model="scheduleInstTmp" filterable clearable placeholder="..."
                       style="width: 450px">
                <el-option v-for="item in scheduleInstList" :key="item.id" :label="item.name" :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                </el-option>
            </el-select>
            <div></div>
        </div>
        <div class="separator"></div>
        <div class="content">
            <div class="listmid">
                <div class="separator"></div>
                <div>
                    <div :id="timeAxisList.lineChart" class="lineChartClass" style=" margin-bottom: -1.4%">
                    </div>
                </div>
                <div class="separator"></div>
                <div>
                    <div :id="timeAxisList.chart" class="timeAxis" style=" margin-bottom: -1.4%">
                    </div>
                </div>
                <div class="colorline">
                    <div>
                        <div class="process"></div>
                        <span>加工：{{
                                (timeAxisList.status === undefined || timeAxisList.status == null) ? '0' : timeAxisList.status.workTime
                            }}</span>
                    </div>
                    <div>
                        <div class="stop"></div>
                        <span>停机：{{
                                (timeAxisList.status === undefined || timeAxisList.status == null) ? '0' : timeAxisList.status.stopTime
                            }}</span>
                    </div>
                    <div>
                        <div class="none"></div>
                        <span>未连接：{{
                                (timeAxisList.status === undefined || timeAxisList.status == null) ? '0' : timeAxisList.status.offlineTime
                            }}</span>
                    </div>
                </div>
                <div class="separator"></div>
<!--                <div>-->
<!--                    <div :id="metalist.loadChart" class="PieceChartClass" style=" margin-bottom: -1.4%">-->
<!--                    </div>-->
<!--                </div>-->
                <div class="separator"></div>
                <div>
                    <div :id="metalist.pieceChart" class="PieceChartClass" style=" margin-bottom: -1.4%">
                    </div>
                </div>
                <div class="separator"></div>
                <div>
                    <div id="work-circle" class="PieceChartClass" style=" margin-bottom: -1.4%">
                    </div>
                </div>
                <div class="separator"></div>
                <div class="headBottom">
                    <div :id="metalist.bottom" :style="{width: '100%', height: '100%'}">
                    </div>
                </div>
                <div class="separator"></div>
                <div>
                    <div :id="metalist.chart" class="PieceChartClass">
                    </div>
                </div>
                <div class="separator"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {post, formatDate, getTimeAxis, timestampToHMS, getDateTimeFromTimestamp} from "@/apis/restUtils";

export default {
    name: "machineStatusInfo",
    props: ["onMachineId"],
    data() {
        return {
            timeAxisList: [{
                "chart": "timeAxis-",
                "lineChart": "lineChart-",
                "name": '',
                "status": {
                    "workTime": "0",
                    "stopTime": "0",
                    "offlineTime": "0",
                    "workWeight": 0,
                    "workStatusSegmentList": [],
                    "feedOverridesList": [],
                    "spindleOverridesList": [],
                    "timeStampList": []
                }
            }],
            metalist: {},
            scheduleInstList: [],
            machineId: '',
            serial: '',
            scheduleInstTmp: '',
            timeAxisChart: null,
            lineChart: null,
        }
    },
    methods: {
        back() {

        },
        getPieceChart(data, chart) {

            let chartDom = document.getElementById(chart);
            let myChart = this.$echarts.init(chartDom);
            let option;
            let colors = ['#5470C6', '#91CC75']; //, '#EE6666'];
            let pieces = [];
            data.workPiecesSegmentList.forEach(function (item) {
                pieces.push(item.pieces);
            });
            option = {
                // title: {
                //     top: 40,
                //     text: "加工时间/加工件数",
                //     left: 'center'
                // },
                color: colors,
                legend: {
                    data: ['加工时间', '加工件数']
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params){
                        console.log(params);
                        let datetime = params[0].axisValue;
                        let value = '';
                        params.forEach(function (item) {
                            value += '<br>';
                            value += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + item.color + '"></span>'
                            value += item.seriesName + ': ';
                            if(item.seriesName === '加工时间'){
                                value += timestampToHMS(item.data);
                            }
                            if(item.seriesName === '加工件数'){
                                value += item.data;
                            }
                        });
                        return datetime + value;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: data.dateData,
                    axisTick: {
                        alignWithLabel: true
                    },
                },
                series: [{
                    name: '加工时间',
                    data: data.workDurationList,
                    type: 'line'
                }, {
                    name: '加工件数',
                    data: pieces,
                    type: 'bar',
                    yAxisIndex: 1,
                }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '加工时间',
                        min: 0,
                        // max: 250,
                        position: 'left',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} sec'
                        }
                    },
                    {
                        type: 'value',
                        name: '加工件数',
                        min: 0,
                        minInterval: 5,
                        // max: 5,
                        position: 'right',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} pcs'
                        }
                    }
                ],
                grid: {
                    width: "80%",
                }
            };
            option && myChart.setOption(option);
        },
        getLineChart(input, chart) {
            let chartDom = document.getElementById(chart);
            let myChart = this.$echarts.init(chartDom);
            let option;
            let that = this;

            myChart.on('datazoom', function (params) {
                that.onDataZoomChange(params);
            });
            option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let datetime = getDateTimeFromTimestamp(params[0].axisValue);
                        let value = '';
                        params.forEach(function (item) {
                            value += '<br>';
                            value += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + item.color + '"></span>'
                            value += item.seriesName + ': ';
                            value += item.data + '%';
                        });
                        return datetime + value;
                    }
                },
                legend: {
                    data: ['进给', '主轴']
                },
                dataZoom: [{
                    type: 'slider',

                    height: 14,
                    labelFormatter: ''
                }, {
                    type: 'inside',
                    filterMode: 'weakFilter'
                }],
                xAxis: {
                    type: 'category',
                    data: input.timeStampList,
                    axisLabel: {
                        formatter: function (val) {
                            let d = getDateTimeFromTimestamp(val);
                            return d;
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    },
                },
                series: [{
                    name: '进给',
                    data: input.feedOverridesList,
                    type: 'line',
                    smooth: true
                },
                    {
                        name: '主轴',
                        data: input.spindleOverridesList,
                        type: 'line'
                    }
                ]
            };
            option && myChart.setOption(option);
            return myChart;
        },
        getBottom(dateData, workData, bottom) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById(bottom)
            );
            let option = {
                // title: {
                //     top: 40,
                //     text: "阶段时间机床利用率",
                //     left: 'center'
                // },
                color: ["#3398DB"],
                tooltip: {
                    trigger: "axis",
                    formatter: function(params){
                        return Math.round(params[0].value) + '%';  //params[0].value
                    },
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 80,
                    left: "8%",
                    right: "4%",
                    bottom: "3%",
                    width: "80%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: dateData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        }
                    }
                ],
                yAxis: [
                    {
                        name: '利用率占比',
                        type: "value",
                        max: 100,
                        axisLabel: {formatter: "{value} %"}
                    }
                ],
                series: [
                    {
                        name: "百分比",
                        type: "bar",
                        barWidth: "30%",
                        data: workData,
                        itemStyle: {
                            normal: {
                                color: "#009a44"
                            }
                        },
                        color: ["#fffc02", "#808080"]
                    }
                ]
            };
            myChart.setOption(option);
        },
        getPie(pieData, chart) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(chart));
            let option = {
                tooltip: {
                    trigger: "item",
                    // formatter: "{a} <br/>{b} : {c} ({d}%)"
                    formatter: function (item) {
                        return item.data.name + ': ' + timestampToHMS(item.data.value) + '(' + Math.round(item.percent) + '%)';
                    }
                },
                legend: {
                    // orient: "vertical",
                    x: "center",
                    data: ["加工", "故障", "停机", "未连接"]
                },
                series: [
                    {
                        orient: "vertical",
                        x: "right",
                        name: "情况详情",
                        type: "pie",
                        radius: ["0%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: pieData,
                        color: ["#089642", "#fb0200", "#fffc02", "#808080", "#D3D3D3"]
                    }
                ]
            };
            //使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        onDateChange(val) {  //变更时间的事件响应
            let that = this;
            that.scheduleInstTmp = '';
            post("/organization/getScheduleInstByMachine",
                {"machineId": that.machineId, "beginDate": val[0], "endDate": val[1]},
                response => {
                    that.scheduleInstList = [];
                    if (response.data.status === 'fail') {
                        return;
                    }
                    let scheduleinstList01 = response.data.entity;
                    if (scheduleinstList01 === undefined || scheduleinstList01 === null) {
                        return;
                    } else {
                        scheduleinstList01.forEach(function (item, index) {
                            that.scheduleInstList.push({
                                id: item.id,
                                name: item.name + ' (' + formatDate(item.beginTime, 'yyyy-MM-dd hh:mm:ss') + " - " + formatDate(item.endTime, 'yyyy-MM-dd hh:mm:ss') + ')',
                                value: index,
                            });
                        });
                    }
                });

            post("/organization/customer/web/getOneDayStatus",
                {"id": that.machineId, "beginDate": val[0], "endDate": val[1]},
                reponse => {
                    // that.timeAxisList.status = reponse.data;
                    that.getWorkCircle(reponse.data, "work-circle");
                    that.timeAxisList.status = reponse.data;
                    that.timeAxisChart = getTimeAxis(reponse.data, this.timeAxisList.chart, that);
                    that.lineChart = that.getLineChart(reponse.data, this.timeAxisList.lineChart)
                });


            post("/organization/customer/getPeriodStatus",
                {"id": this.machineId, "startDate": val[0], "endDate": val[1]},
                reponse => {
                    this.getBottom(reponse.data.dateData, reponse.data.workData, this.metalist.bottom);
                    this.getPie(reponse.data.pieData, this.metalist.chart);
                    this.getPieceChart(reponse.data, this.metalist.pieceChart);
                });
        },

        selectChanged(val) {
            post("/organization/customer/getOneDayStatusByScheduleInst",
                {"id": this.machineId, "scheduleInst": val},
                reponse => {
                    this.getWorkCircle(reponse.data, "work-circle");
                    this.timeAxisList.status = reponse.data;
                    this.timeAxisChart = getTimeAxis(reponse.data, this.timeAxisList.chart, this);
                    this.lineChart = this.getLineChart(reponse.data, this.timeAxisList.lineChart);
                });
        },

        getWorkCircle(input, chart) {
            let workWeight = (input === undefined || input == null || input.workWeight === undefined ||
                input.workWeight == null) ? 0 : input.workWeight;
            let idleWeight = 100 - workWeight;
            let chartDom = document.getElementById(chart);
            let myChart = this.$echarts.init(chartDom);
            let option;

            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (val) {
                        return Math.round(val.value) + '%'
                    }
                },
                legend: {
                    top: '6%',
                    left: 'center',
                    data: ['加工占比', '空闲占比']
                },
                series: [
                    {
                        name: '加工占比',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: workWeight, name: '加工占比'},
                            {value: idleWeight, name: '空闲占比'},
                        ],
                        color: ["#089642", "#808080"]
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        onDataZoomChange(params) {
            if (params.start === undefined || params.start === null || params.end === undefined || params.end === null) {
                if (params.batch !== undefined && params.batch.length > 0) {
                    let batch = params.batch[0];
                    let start = batch.start;
                    let end = batch.end;
                    this.setDataZoomOption(start, end);
                }
            } else {
                let start = params.start;
                let end = params.end;
                this.setDataZoomOption(start, end);
            }
        },
        setDataZoomOption(start, end) {
            let option = {
                dataZoom: [{
                    type: 'slider',
                    start: start,
                    end: end,
                },
                    {
                        type: 'inside',
                        start: start,
                        end: end,
                    }]
            };
            this.timeAxisChart.setOption(option);
            this.lineChart.setOption(option);
        }
    },
    watch: {
        onMachineId(val) { //需要包含machineId和showFlag
            let that = this;
            if (!val.machineStatusInfoShow) {
                return;
            }
            let id = val.currentMachineId;
            this.machineId = val.currentMachineId;
            let serial = val.serial;
            this.serial = val.serial;
            this.timeAxisList = {
                "chart": "timeAxis-" + id,
                "lineChart": "lineChart-" + id,
                "name": id,
                "status": {
                    "workTime": "0",
                    "stopTime": "0",
                    "offlineTime": "0",
                    "workStatusSegmentList": [],
                    "feedOverridesList": [],
                    "spindleOverridesList": [],
                    "timeStampList": []
                }
            };
            this.metalist = {
                "name": serial,
                "bottom": "bottom-" + id,
                "chart": "metachart-" + id,
                "pieceChart": "pieceChart-" + id,     //TODO   pieceChart
                // "loadChart": "loadChar-" + id,
            }
            post("/organization/customer/web/getOneDayStatus",
                {"id": id, "startDate": "", "endDate": ""},
                reponse => {
                    that.getWorkCircle(reponse.data, "work-circle");
                    that.timeAxisList.status = reponse.data;
                    that.timeAxisChart = getTimeAxis(reponse.data, this.timeAxisList.chart, that);
                    that.lineChart = that.getLineChart(reponse.data, this.timeAxisList.lineChart);

                });

            post("/organization/customer/getPeriodStatus",
                {"id": id, "startDate": "", "endDate": ""},
                reponse => {
                    that.getBottom(reponse.data.dateData, reponse.data.workData, this.metalist.bottom);
                    that.getPie(reponse.data.pieData, this.metalist.chart);
                    that.getPieceChart(reponse.data, this.metalist.pieceChart);
                });
            that.scheduleInstList = [];

            post("/organization/getScheduleInstByMachine",
                {"machineId": id},
                response => {
                    if (response.data.status === 'fail') {
                        return;
                    }
                    let scheduleinstList01 = response.data.entity;
                    if (scheduleinstList01 === undefined || scheduleinstList01 === null) {
                        return;
                    } else {
                        scheduleinstList01.forEach(function (item, index) {
                            that.scheduleInstList.push({
                                id: item.id,
                                name: item.name + ' (' + formatDate(item.beginTime, 'yyyy-MM-dd hh:mm:ss') + " - " + formatDate(item.endTime, 'yyyy-MM-dd hh:mm:ss') + ')',
                                value: index,
                            });
                        });
                    }
                });

        }

    }
}
</script>

<style scoped>
.wrappers {
    width: 100%;
    height: 100%;
    /*min-width: 1240px;*/
    /* min-height: 860px; */
    border-radius: 3px;
    background-color: white;
    position: relative;
    overflow: hidden;
}

.wrapper::-webkit-scrollbar {
    display: none;
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

.PieceChartClass {
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.PieceChartClass > div {
    height: -1%;
    border: 0;
    border-radius: 0;
    margin: 0;
}

.headBottom {
    /*width: 80%;*/
    /*height: 200px;*/
    /*max-width: 980px;*/
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.headBottom > div {
    height: 5%;
    border: 0;
    border-radius: 0;
    margin: 0;
}

.wrapper::-webkit-scrollbar {
    display: block;
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

.listmid {
    width: 70%;
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

.currentdata {
    display: flex;
    flex-direction: row;
    width: 650px;
    justify-content: space-between;
    margin: 0 auto;
    position: absolute;
    /*top: 60px;*/
    left: 0;
    right: 0;
    transform: translateX(6em);
    height: 40px;
}

.currentdata > span {
    cursor: pointer;
    font-size: 16px;
}

.process,
.breakdown,
.stop,
.none {
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

.separator {
    width: 100%;
    height: 60px;
}


</style>