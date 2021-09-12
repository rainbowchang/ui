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
            <DatePicker
                type="daterange"
                :style="{width:'240px'}"
                placement="bottom-end"
                placeholder="请选择开始日期——结束日期"
                style="width: 200px;margin-bottom:1em;"
                @on-change="onDateChange"
            ></DatePicker>

            <el-select @change="selectChanged" filterable clearable placeholder="..."
                       style="width: 100%">
                <el-option v-for="item in scheduleInstList" :key="item.id" :label="item.name" :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                </el-option>
            </el-select>

        </div>
        <div class="content">

            <div class="listmid">
                <div>
                    <div :id="timeAxisList.chart" class="timeAxis" style=" margin-bottom: -1.4%">

                    </div>
                </div>
                <div class="colorline">
                    <div>
                        <div class="breakdown"></div>
                        <span></span>
                    </div>
                    <div>
                        <div class="process"></div>
                        <span>加工：{{
                                (timeAxisList.status === 'undefined' || timeAxisList.status == null) ? '0' : timeAxisList.status.workTime
                            }}</span>
                    </div>

                    <div>
                        <div class="stop"></div>
                        <span>停机：{{
                                (timeAxisList.status === 'undefined' || timeAxisList.status == null) ? '0' : timeAxisList.status.stopTime
                            }}</span>
                    </div>
                    <div>
                        <div class="none"></div>
                        <span>未连接：{{
                                (timeAxisList.status === 'undefined' || timeAxisList.status == null) ? '0' : timeAxisList.status.offlineTime
                            }}</span>
                    </div>
                </div>
                <div>
                    <div :id="timeAxisList.lineChart" class="lineChartClass" style=" margin-bottom: -1.4%">

                    </div>
                </div>

                <div>
                    <span>加工占比</span>
                    <i-circle :percent="(timeAxisList.status === 'undefined' || timeAxisList.status == null || timeAxisList.status.workWeight ==='undefined' || timeAxisList.status.workWeight == null) ? 0: timeAxisList.status.workWeight" stroke-color="#089642" :size="80">
                        <span class="demo-Circle-inner" style="font-size:16px">{{
                                Math.round((timeAxisList.status === 'undefined' || timeAxisList.status == null || timeAxisList.status.workWeight ==='undefined' || timeAxisList.status.workWeight == null) ? 0: timeAxisList.status.workWeight)
                            }}%</span>
                    </i-circle>
                </div>

                <div class="headBottom">
                    <div :id="metalist.bottom" :style="{width: '100%', height: '100%'}">


                    </div>
                </div>
                <div>
                    <div :id="metalist.chart" :style="{width: '100%', height: '100%'}">


                    </div>
                </div>

                <div>
                    <div :id="metalist.pieceChart" :style="{width: '100%', height: '100%'}">


                    </div>
                </div>

            </div>


        </div>


    </div>
</template>

<script>
import {post, formatDate} from "@/apis/restUtils";

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
            }}],
            metalist: {},
            scheduleInstList: [],
            machineId: '',
            serial: '',
        }
    },
    methods: {
        back() {

        },
        getTimeAxis(input, chart) {
            let chartDom = document.getElementById(chart);
            let myChart = this.$echarts.init(chartDom);
            let option;

            let dataCount = input.workStatusSegmentList.length;
            let startTime = input.beginTime;
            let endTime = input.endTime;
            let categories = [];
            categories.push(input.name);
            let types = [
                {name: '加工', color: '#089642'},
                {name: '停机', color: '#fffc02'},
                {name: '未连接', color: '#808080'},
            ];
            let data = [];
            let thisEcharts = this.$echarts;
            categories.forEach(function (category, index) {
                for (let i = 0; i < dataCount; i++) {
                    let status = input.workStatusSegmentList[i].status;
                    let typeItem;
                    if (status === 'WORKING') {
                        typeItem = types[0];
                    } else if (status === 'IDLE') {
                        typeItem = types[1];
                    } else {
                        typeItem = types[2];
                    }

                    let duration = input.workStatusSegmentList[i].endTimeStamp - input.workStatusSegmentList[i].beginTimeStamp;
                    data.push({
                        name: typeItem.name,
                        value: [
                            index,
                            input.workStatusSegmentList[i].beginTimeStamp,
                            input.workStatusSegmentList[i].endTimeStamp,
                            duration
                        ],
                        itemStyle: {
                            normal: {
                                color: typeItem.color
                            }
                        }
                    });
                }
            });

            function renderItem(params, api) {
                let categoryIndex = api.value(0);
                let start = api.coord([api.value(1), categoryIndex]);
                let end = api.coord([api.value(2), categoryIndex]);
                let height = api.size([0, 1])[1] * 0.6;
                let rectShape = thisEcharts.graphic.clipRectByRect({
                    x: start[0],
                    y: start[1] - height / 2,
                    width: end[0] - start[0],
                    height: height
                }, {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                });

                return rectShape && {
                    type: 'rect',
                    transition: ['shape'],
                    shape: rectShape,
                    style: api.style()
                };
            }

            function getDateFromTime(time) {
                let date = new Date(time * 1000);
                return `${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}`;
            }

            option = {
                tooltip: {
                    formatter: function (params) {
                        return params.marker + params.name + ': ' + params.value[3] + ' 秒';
                    }
                },
                title: {
                    text: null,
                    left: 'center'
                },
                dataZoom: [{
                    type: 'slider',
                    filterMode: 'weakFilter',
                    showDataShadow: false,
                    top: 70,
                    height: 14,
                    labelFormatter: ''
                }, {
                    type: 'inside',
                    filterMode: 'weakFilter'
                }],
                grid: {
                    top: 10,
                    height: 30
                },
                xAxis: {
                    min: startTime,
                    max: endTime,
                    scale: true,
                    axisLabel: {
                        formatter: function (val) {
                            let d = getDateFromTime(val);
                            return d;
                        }
                    }
                },
                yAxis: {
                    data: [],
                },
                series: [{
                    type: 'custom',
                    renderItem: renderItem,
                    itemStyle: {
                        opacity: 0.8
                    },
                    encode: {
                        x: [1, 2],
                        y: 0
                    },
                    data: data
                }]
            };

            option && myChart.setOption(option);
        },
        getPieceChart(data, chart){
            let chartDom = document.getElementById(chart);
            let myChart = this.$echarts.init(chartDom);
            let option;
            option = {
                legend: {
                    data: ['加工件数']
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
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
                            let d = getDateFromTime(val);
                            return d;
                        }
                    }
                },
                series: [{
                    name: '加工件数',
                    data: input.feedOverridesList,
                    type: 'line'
                },
                ]
            };
            option && myChart.setOption(option);

        },
        getLineChar(input, chart) {
            let chartDom = document.getElementById(chart);
            let myChart = this.$echarts.init(chartDom);
            let option;

            function getDateFromTime(time) {
                let date = new Date(time * 1000);
                return `${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}`;
            }

            option = {
                legend: {
                    data: ['进给', '主轴']
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
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
                            let d = getDateFromTime(val);
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
                    type: 'line'
                },
                    {
                        name: '主轴',
                        data: input.spindleOverridesList,
                        type: 'line'
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        getBottom(dateData, workData, bottom) {
            console.log("workdata", workData);
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById(bottom)
            );
            let option = {
                title: {
                    top: 40,
                    text: "阶段时间机床利用率",
                    left: 'center'
                },
                color: ["#3398DB"],
                tooltip: {
                    trigger: "axis",
                    formatter: "{c}%",
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
                        }
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
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
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
            console.log("onDateChange... :", val);

            post("/organization/customer/getPeriodStatus",
                {"id": this.machineId, "startDate": val[0], "endDate": val[1]},
                reponse => {
                    this.getBottom(reponse.data.dateData, reponse.data.workData, "bottom-" + this.serial);
                    this.getPie(reponse.data.pieData, this.metalist.chart);
                });
        },

        selectChanged(val){
            console.log("selectChanged... : ", val);
            post("/organization/customer/getOneDayStatusByScheduleInst",
                {"id": this.machineId, "scheduleInst":val},
                reponse => {
                    console.log("getOneDayStatus: ", reponse);
                    this.timeAxisList.status = reponse.data;
                    this.getTimeAxis(reponse.data, this.timeAxisList.chart);
                    this.getLineChar(reponse.data, this.timeAxisList.lineChart);
                });

        }


    },
    watch: {
        onMachineId(val) { //需要包含machineId和showFlag
            let that = this;
            console.log("machineStatusInfo, watch onMachineId...", val);
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
            //todo 这两个合并！！！！
            this.metalist = {
                "name": serial,
                "bottom": "bottom-" + id,
                "chart": "metachart-" + id,
                "pieceChart": "pieceChart-" + id,
            }
            post("/organization/customer/getOneDayStatus",
                {"id": id, "startDate": "", "endDate": ""},
                reponse => {
                    console.log("getOneDayStatus: ", reponse);
                    that.timeAxisList.status = reponse.data;
                    that.getTimeAxis(reponse.data, this.timeAxisList.chart);
                    that.getLineChar(reponse.data, this.timeAxisList.lineChart)
                });

            post("/organization/customer/getPeriodStatus",
                {"id": id, "startDate": "", "endDate": ""},
                reponse => {
                    that.getBottom(reponse.data.dateData, reponse.data.workData, this.metalist.bottom);
                    that.getPie(reponse.data.pieData, this.metalist.chart);
                    that.getLineChar(this.metalist.pieceChart);
                });

            this.scheduleInstList = [];
            console.log("before getScheduleInstByMachine...", this.scheduleInstList);

            post("/organization/getScheduleInstByMachine",
                {"machineId": id},
                response => {
                    console.log("scheduleInst: ", response.data.entity);
                    if (response.data.status === 'fail') {
                        return;
                    }
                    let scheduleinstList01 = response.data.entity;
                    scheduleinstList01.forEach(function (item, index) {
                        that.scheduleInstList.push({
                            id: item.id,
                            name: item.name + ' (' + formatDate(item.beginTime, 'yyyy-MM-dd hh:mm:ss') + " - " + formatDate(item.endTime, 'yyyy-MM-dd hh:mm:ss') + ')',
                            value: index,
                        });
                        console.log("item, index: ", item, index);
                    });
                });

        }

    }
}
</script>

<style scoped>

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
    width: 240px;
    justify-content: space-between;
    margin: 0 auto;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateX(6em);
}

.currentdata > span {
    cursor: pointer;
    font-size: 16px;
}

</style>