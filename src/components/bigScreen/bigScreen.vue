<template>
    <div class="wrapper">
        <div class="content">
            <div class="ct-layer left">
                <section>
                    <h3>
                        <icon class="icon icon_1"></icon> 机床状态实时分布
                    </h3>
                    <div class="ct-chart" id="machineState" ref="machineState"></div>
                </section>
                <section>
                    <h3>
                        <icon class="icon icon_2"></icon>机床时间分布
                    </h3>
                    <div class="ct-chart" id="machineTime" ref="machineTime"></div>
                </section>
            </div>
            <div class="middle">
                <div class="ct-implementation">
                    <p class="time">{{time}}</p>
                    <div class="list-chart">
                        <div class="" id="todayYield">
                            <div class="ct-chart" ref="todayYield"></div>
                            <p>今日产量</p>
                        </div>
                        <div class="" id="realTimeStartRate">
                            <div class="ct-chart" ref="realTimeStartRate"></div>
                            <p>实时开动率</p>
                        </div>
                        <div class="" id="processingTime">
                            <div class="ct-chart" ref="processingTime"></div>
                            <p>加工时长</p>
                        </div>
                    </div>

                </div>
                <section class="ct-layer ">
                    <h3>
                        <icon class="icon icon_3"></icon>产量统计
                    </h3>
                    <div class="ct-chart" id="yield" ref="yield"></div>
                </section>
            </div>
            <div class="ct-layer right">
                <section>
                    <h3>
                        <icon class="icon icon_4"></icon>本月设备状态趋势
                    </h3>
                    <div class="ct-chart " id="monthMachineState" ref="monthMachineState"></div>
                </section>
                <section>
                    <h3>
                        <icon class="icon icon_6"></icon>设备报警
                    </h3>
                    <div class="alarm">
                        <ul class="table-head flex">
                            <li class="th">序号</li>
                            <li class="th">报警时间</li>
                            <li class="th">设备名称</li>
                            <li class="th">机床型号</li>
                            <li class="th">报警编号</li>
                        </ul>
                        <ul class="table-body" ref="alarmBody">
                            <li class="tr flex" v-for="(item, index) in alaramList" :key="index">
                                <div class="index td">{{index + 1}}</div>
                                <div class="td">{{item.alarmTime}}</div>
                                <div class="td">{{item.sn}}</div>
                                <div class="td">{{item.machinetoolModel}}</div>
                                <div class="td">{{item.alarmCode}}</div>

                            </li>
                        </ul>
                        <!-- <table id="alarmTable">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>报警时间</th>
                                    <th>设备名称</th>
                                    <th>机床型号</th>
                                    <th>报警编号</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in alaramList" :key="index">
                                    <td class="index">{{index + 1}}</td>
                                    <td>{{item.alarmTime}}</td>
                                    <td>{{item.sn}}</td>
                                    <td>{{item.machinetoolModel}}</td>
                                    <td>{{item.alarmCode}}</td>
                                </tr>
                            </tbody>
                        </table> -->
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import "echarts/map/js/china.js";
import chart from "./chart.js";
import { post } from "@/apis/restUtils";
const intervalTime = 300000;
export default {
    data() {
        return {
            time: 1,
            pageSize: 10,
            alaramList: [],
            timer: null,
            timer2: null,
            timer3: null, //表格滚动定时器
            machineStateChart: null,
            detailChart: null,
            realTimeStartRateChart: null,
            todayYieldChart: null,
            yieldChart: null,
            processingTimeChart: null,
            machineTimeChart: null,
            monthMachineStateChart: null,
        };
    },
    mounted() {
        let that = this;
        const rem = () => {
            var width = document.body.clientWidth || window.innerWidth;
            document.getElementsByTagName("html")[0].style.fontSize =
                width / 192 + "px";
            that.pageSize = width / 192;
        };
        const chartRise = (charts) => {
            for (let i = 0; i < charts.length; i++) {
                if (charts[i]) {
                    charts[i].resize();
                    const option = charts[i].getOption();
                    charts[i].setOption(option);
                }
            }
        };
        rem();
        window.onresize = () => {
            rem();
            chartRise([
                this.machineStateChart,
                this.detailChart,
                this.realTimeStartRateChart,
                this.todayYieldChart,
                this.yieldChart,
                this.processingTimeChart,
                this.machineTimeChart,
                this.monthMachineStateChart,
            ]);
        };
        this.getRealTimeInfo();
        this.getTodayInfo();
        this.getMonthInfo();
        this.getSevenInfo();
        if (!this.timer2) {
            this.timer2 = setInterval(() => {
                const time = new Date(),
                    year = time.getFullYear(),
                    month =
                        time.getMonth() + 1 > 9
                            ? time.getMonth() + 1
                            : "0" + (time.getMonth() + 1),
                    day =
                        time.getDate() > 9
                            ? time.getDate()
                            : "0" + time.getDate(),
                    hours =
                        time.getHours() > 9
                            ? time.getHours()
                            : "0" + time.getHours(),
                    min =
                        time.getMinutes() > 9
                            ? time.getMinutes()
                            : "0" + time.getMinutes(),
                    sec =
                        time.getSeconds() > 9
                            ? time.getSeconds()
                            : "0" + time.getSeconds();
                let weekText = "";
                switch (time.getDay()) {
                    case 1:
                        weekText = "周一";
                        break;
                    case 2:
                        weekText = "周二";
                        break;
                    case 3:
                        weekText = "周三";
                        break;
                    case 4:
                        weekText = "周四";
                        break;
                    case 5:
                        weekText = "周五";
                        break;
                    case 6:
                        weekText = "周六";
                        break;
                    default:
                        weekText = "周日";
                }
                this.time = `${year}年${month}月${day}日 ${weekText} ${hours}:${min}:${sec}`;
            }, 1000);
        }
        if (!this.timer) {
            this.timer = setInterval(() => {
                this.getRealTimeInfo();
                this.getTodayInfo();
            }, intervalTime);
        }
    },
    methods: {
        getRealTimeInfo() {
            post("/lssm/realtimeStatus", "", (res) => {
                if (res.data && res.data.status == "success") {
                    let data = res.data.entity;
                    this.realTimeStartRateChart = chart.detailChart.call(
                        this,
                        this.$refs.realTimeStartRate,
                        {
                            tickColor: "#00ffff",
                            sColor: "#3AB1C2",
                            eColor: "#55FCFB",
                            totalData: 100,
                            data: data.operatingRateOfInt,
                            titleText: data.operatingRateOfInt + "%",
                        },
                        this.realTimeStartRateChart
                    );
                    this.machineStateChart = chart.realTimeChart.call(
                        this,
                        this.$refs.machineState,
                        {
                            work: data.rateOfWorkingOfInt,
                            stop: data.rateOfIdleOfInt,
                            alarm: data.rateOfAlarmOfInt,
                            offLine: data.rateOfOfflineOfInt,
                            titleText: data.cntOfTotal,
                        },
                        this.machineStateChart
                    );
                }
            });
        },
        getTodayInfo() {
            post("/lssm/dailyStatus", "", (res) => {
                if (res.data && res.data.status == "success") {
                    let data = res.data.entity;
                    this.alaramList = data.lssmAlarmBeanList.concat(
                        data.lssmAlarmBeanList
                    );
                    this.$nextTick(()=>{
                        this.setAlarm(0);
                    })

                    this.todayYieldChart = chart.detailChart.call(
                        this,
                        this.$refs.todayYield,
                        {
                            tickColor: "#06f8a8",
                            sColor: "#F1BC5A",
                            eColor: "#52F7A3",
                            totalData: 100,
                            data: data.worktimeRateOfInt,
                            titleText: data.workPieces,
                        },
                        this.todayYieldChart
                    );

                    this.processingTimeChart = chart.detailChart.call(
                        this,
                        this.$refs.processingTime,
                        {
                            tickColor: "#00acff",
                            sColor: "#3CACFF",
                            eColor: "#2E67FF",
                            totalData: 100,
                            data: data.worktimeRateOfInt,
                            titleText: data.workTime,
                        },
                        this.processingTimeChart
                    );

                    this.machineTimeChart = chart.timeChart.call(
                        this,
                        this.$refs.machineTime,
                        [
                            data.worktimeRateOfInt,
                            data.idletimeRateOfInt,
                            data.offlinetimeRateOfInt,
                            data.alarmtimeRateOfInt,
                        ],
                        [
                            data.workTime,
                            data.idleTime,
                            data.offlineTime,
                            data.alarmTime,
                        ],
                        this.machineTimeChart
                    );
                }
            });
        },
        getMonthInfo() {
            post("/lssm/monthlyStatus", "", (res) => {
                if (res.data && res.data.status == "success") {
                    let data = res.data.entity;
                    let work = [],
                        shutDown = [],
                        noConnected = [],
                        fault = [],
                        xData = [];
                    for (let i = 0; i < data.length; i++) {
                        const time = data[i].date.slice(5, 10);
                        xData.push(time);
                        work.push(data[i].worktimeRateOfInt);
                        shutDown.push(data[i].idletimeRateOfInt);
                        noConnected.push(data[i].offlinetimeRateOfInt);
                        fault.push(data[i].alarmtimeRateOfInt);
                    }
                    this.monthMachineStateChart = chart.mothdChart.call(
                        this,
                        this.$refs.monthMachineState,
                        {
                            xData,
                            work,
                            stop: shutDown,
                            offLine: noConnected,
                            alarm: fault,
                        },
                        this.monthMachineStateChart
                    );
                }
            });
        },
        getSevenInfo() {
            post("/lssm/sevenDaysStatus", "", (res) => {
                if (res.data && res.data.status == "success") {
                    let data = res.data.entity;
                    this.yieldChart = chart.yieldChart.call(
                        this,
                        this.$refs.yield,
                        {
                            xData: data.dateList,
                            data: data.workPieceList,
                            maxValue: Math.max(...data.workPieceList),
                            minValue: 0,
                        },
                        this.yieldChart
                    );
                }
            });
        },
        setAlarm(value){
            let dom = this.$refs.alarmBody
            let time = intervalTime / (this.alaramList.length - 4);
            let h = this.pageSize * 4.8
            console.log(value,dom.scrollHeight, time)
            if(value == 0){
                dom.scrollTop = value;
            }
            if(this.timer3){
                clearInterval(this.timer3)
                this.timer3 = null;
            }
            this.timer3 = setInterval(()=>{
                dom.scrollTop += h
                // console.log(dom.scrollTop)
            },time)
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.timer2) {
            clearInterval(this.timer2);
            this.timer2 = null;
        }
        if(this.timer3){
            clearInterval(this.timer3);
            this.timer3 = null;
        }
    },
};
</script>
<style scoped>
.wrapper {
    width: 192rem;
    height: 108rem;
    background-image: url("../../assets/imgs/bigScreen/bg.png");
    background-size: 100% 100%;
    padding-top: 1rem;
}

.content {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 7rem 2rem 6rem;
}
.ct-layer {
    width: 52.8rem;
    height: 92.3rem;
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 8px 0 rgba(29, 126, 115, 0.5) inset;
}
.ct-layer > section,
section.ct-layer {
    padding-top: 5rem;
}
.ct-layer h3 {
    width: 45.7rem;
    height: 6rem;
    background-image: url("../../assets/imgs/bigScreen/bg-h.png");
    background-size: cover;
    display: flex;
    align-items: center;
    font-size: 2.2rem;
    color: #1adbfb;
    padding-left: 2.2rem;
    margin-left: 5rem;
}
.ct-layer h3 > .icon {
    margin-right: 2rem;
}
.middle {
    margin: 0 4rem;
}

.middle .ct-layer {
    width: 75.5rem;
    height: 53.4rem;
}
.ct-implementation {
    height: 37.5rem;
    padding-top: 3rem;
}
.ct-implementation .time {
    color: #26d1d4;
    font-size: 1.4rem;
    text-align: center;
    font-weight: 600;
}
.ct-implementation .list-chart {
    padding-top: 6rem;
    display: flex;
    justify-content: space-around;
}
.list-chart > div {
    width: 16rem;
}
.list-chart > div .ct-chart {
    width: 16rem;
    height: 16rem;
    margin-bottom: 2rem;
}
.list-chart > div p {
    color: #0af7a7;
    font-size: 2.2rem;
    text-align: center;
}
.list-chart > div:nth-child(2) p {
    color: #00f5f4;
}
.list-chart > div:nth-child(3) p {
    color: #01acff;
}
#machineState {
    height: 40rem;
    margin-bottom: 3rem;
}
#machineTime {
    height: 27rem;
}
#yield {
    height: 41.7rem;
}
#monthMachineState {
    height: 35rem;
}
#processingRate {
    height: 32rem;
}

.icon.icon_1 {
    background-image: url("../../assets/imgs/bigScreen/icon_1.png");
}
.icon.icon_2 {
    background-image: url("../../assets/imgs/bigScreen/icon_2.png");
}
.icon.icon_3 {
    background-image: url("../../assets/imgs/bigScreen/icon_3.png");
}
.icon.icon_4 {
    background-image: url("../../assets/imgs/bigScreen/icon_4.png");
}
.icon.icon_5 {
    background-image: url("../../assets/imgs/bigScreen/icon_5.png");
}
.icon.icon_6 {
    background-image: url("../../assets/imgs/bigScreen/icon_6.png");
}
.icon {
    display: inline-block;
    width: 2.8rem;
    height: 2.8rem;
    background-size: 100% 100%;
}

.alarm {
    margin-top: 2rem;
    padding: 0 3rem;

}
ul li {
    list-style: none;
}
.flex {
    display: flex;
}
.alarm .th {
    font-size: 1.6rem;
    color: #12a8f6;
    padding: 0.6rem 0 1rem;
    flex: 1;
    text-align: center;
}
.alarm .table-head {
    box-shadow: 0 -2rem 0.8rem -1rem rgba(29, 126, 115, 0.5) inset;
}
.alarm .table-body{
    height: 24rem;
    overflow: hidden;
}
.alarm .td {
    font-size: 1.4rem;
    color: #31ffff;
    text-align: center;
    border: 0.1rem solid rgba(221, 221, 221, 0.15);
    padding: 1.5rem 0 1rem 0;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.alarm .td.index {
    color: #50a2c1;
    font-style: italic;
}
.alarm .table-body .tr:nth-child(2n) {
    background: rgba(38, 209, 212, 0.1);
}
</style>