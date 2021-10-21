import * as echarts5 from 'echarts'

const initChart = (DOM, option) => {
    let chart = echarts5.init(DOM);
    chart.setOption(option);
    return chart
}

const realTimeChart = (ref, info) => {
    console.log(info);
    const {
        work,
        stop,
        alarm,
        offLine,
        titleText
    } = info;
    const option = {
        grid: {
            left: '0',
            right: '0',
            top: '0',
            bottom: '5%',
            containLabel: true,
        },
        title: {
            text: titleText,
            x: '50%',
            top: 'middle',
            textAlign: 'center',
            textStyle: {
                fontSize: 24,
                fontWeight: '900',
                color: "#ffaa45",
                textAlign: 'center',
            },
        },
        legend: {
            bottom: '5%',
            left: 'center',
            textStyle: {
                color: "#ffffff"
            }
        },
        series: [{
                type: "gauge",
                center: ['50%', '50%'],
                radius: "80%",
                startAngle: 90,
                endAngle: -269.9999,
                axisTick: {
                    lineStyle: {
                        color: "#3EB1FF",
                        width: 3
                    },
                },
                z: 2,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                }
            },
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 2,
                    borderColor: "#1B2325",
                    borderWidth: 4
                },
                label: {
                    formatter:(v)=>{
                        const value = v.data.value;
                        const name = v.data.name;
                        
                        return  value + "% \n" + name;
                    },
                    textStyle:{
                        color:"#31ffff",
                    }
                },
                data: [{
                        value: work,
                        name: '加工',
                        itemStyle: {
                            color: "#4EAD78",
                        }
                    },
                    {
                        value: stop,
                        name: '停机',
                        itemStyle: {
                            color: "#808080"
                        }
                    },
                    {
                        value: alarm,
                        name: '故障',
                        itemStyle: {
                            color: "#EF3E00"
                        }
                    },
                    {
                        value: offLine,
                        name: '未连接',
                        itemStyle: {
                            color: "#F6BA58"
                        }
                    },
                ]
            }
        ]
    }

    initChart(ref, option);

}



const timeChart = function (ref, info) {
    const yData = ['加工', '停机', '故障', '未连接'];
    const seriesData = info;
    const seriesBgData = [100, 100, 100, 100]
    const dataBarItemStyle = {
        borderRadius: 30,
        color: new echarts5.graphic.LinearGradient(1, 0, 0, 1, [{
                offset: 1,
                color: "#2771ea"
            },
            {
                offset: 0,
                color: "#01d1ff"
            }
        ])
    };
    const dataBarBg = {
        name: "",
        type: "bar",
        barWidth: 10,
        barGap: "-100%",
        data: seriesBgData,
        itemStyle: {
            color: "rgba(31, 77, 100, 0.7)",
            borderRadius: 30
        }
    }
    const option = {
        grid: {
            left: '5%',
            right: '10%',
            bottom: '5%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            show: false,
            type: 'value'
        },
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
                margin: 40,
                color: function (value) {
                    let color = '';
                    switch (value) {
                        case "加工":
                            color = "#44b181";
                            break;
                        case "停机":
                            color = "868686";
                            break;
                        case "故障":
                            color = "#f9490d";
                            break;
                        default:
                            color = "#fcbe6a";
                    }
                    return color
                },

            },
            axisTick: 'none',
            axisLine: 'none',
            data: yData
        }, {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
                margin: 30,
                color: '#9aeced',
                fontSize: '18'
            },
            data: seriesData
        }],
        series: [{
                name: "加工",
                type: "bar",
                zlevel: 1,
                itemStyle: dataBarItemStyle,
                barWidth: 10,
                data: seriesData
            },
            dataBarBg,
        ]
    }
    initChart(ref, option)
}

const yieldChart = function (ref, info) {
    const {
        xData,
        data,
    } = info;
    let sideData = data.map((item) => item <= 0 ? item : ( item + item * 0.03));
    console.log(data);
    let option = {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%',
            containLabel: true
        },
        tooltip: {
            show: false,
            trigger: 'axis',
            formatter: '{b} : {c}',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        xAxis: {
            data: xData,
            //坐标轴
            axisLine: {
                lineStyle: {
                    color: 'rgba( 101, 198, 231 , 0.2 )',

                },
            },
            //坐标值标注
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#50a2c1',
                    fontSize: "18px",
                },
            },
            // axisTick:'none',
        },
        yAxis: {
            name: "(kwh)",
            nameTextStyle: {
                color: 'rgba( 101, 198, 231 , 0.5)'
            },
            //坐标轴
            axisLine: {
                show: false,
            },
            splitNumber:5,
            //坐标值标注
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba( 101, 198, 231, 0.5 )',
                    fontSize: 14
                },
            },
            //分格线
            splitLine: {
                lineStyle: {
                    color: 'rgba( 101, 198, 231 , 0.2 )',
                },
            },
        },
        series: [{
                name: 'a',
                tooltip: {
                    show: false,
                },
                type: 'bar',
                barWidth: 20,
                itemStyle: {
                    color: new echarts5.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [{
                                offset: 0,
                                color: '#005559', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#01f0ff', // 100% 处的颜色
                            },
                        ],
                        false
                    ),
                },
                data: data,
                barGap: 0,
            },
            {
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    color: new echarts5.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [{
                                offset: 0,
                                color: '#005559', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#01f0ff', // 100% 处的颜色
                            },
                        ],
                        false
                    ),
                },
                barGap: 0,
                data: sideData,
            },
            {
                name: 'b',
                type: 'pictorialBar',
                silent: true,
                hoverAnimation: false,
                itemStyle: {
                    borderWidth: 0,
                    borderolor: '#0571D5',
                    color: new echarts5.graphic.LinearGradient(
                        1,
                        0,
                        0,
                        0,
                        [{
                                offset: 0,
                                color: '#019199', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#2bfaff', // 100% 处的颜色
                            },
                        ],
                        false
                    ),
                },
                symbol: 'path://M 0,0 l 110,0 l -30,60 l -120,0 z',
                symbolSize: ['30', '4'],
                symbolOffset: ['0', '-2'],
                symbolRotate: 0,
                symbolPosition: 'end',
                data: data,
                z: 3,
            },
        ],
    };
    initChart(ref, option);
}

const mothdChart = function (ref, info) {
    const {
        xData,
        work,
        stop,
        offLine,
        alarm
    } = info;
    let option = {

        tooltip: {
            trigger: 'axis',
            backgroundColor: "rgba(29, 130, 255, 0.9)",
            textStyle: {
                color: "#ffffff",
                fontSize: "1.6rem"
            },
            borderWidth: 0
        },
        colors: ["#3aad7a", "#808080", "#fcba62", "#f93f00"],
        legend: {
            data: ['加工', '停机', '未连接', '故障'],
            right: '5%',
            textStyle: {
                color: "#ffffff"
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisTick: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            max: 100,
            min: 0,
            interval: 25,
            axisLabel: {
                formatter: "{value}%",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "14px"
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(221, 221, 221, 0.3)"
                }
            }
        },
        series: [{
                name: '加工',
                type: 'line',
                symbol: 'circle',
                symbolSize: 10,
                data: work
            },
            {
                name: '停机',
                type: 'line',
                symbolSize: 10,
                symbol: 'circle',
                data: stop
            },
            {
                name: '未连接',
                type: 'line',
                symbolSize: 10,
                symbol: 'circle',
                data: offLine
            },
            {
                name: '故障',
                type: 'line',
                symbolSize: 10,
                symbol: 'circle',
                data: alarm
            },

        ]
    };
    initChart(ref, option);
}

const processRateChart = function () {
    let info = [220, 182, 191, 234, 290, 330, 310];
    const maxValue = 400,
        minValue = 50;
    let option = {
        grid: {
            left: '5%',
            right: '10%',
            bottom: '5%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            name: "(h)",
            nameTextStyle: {
                color: 'rgba( 101, 198, 231 , 0.5)',
                verticalAlign: "top",
                align: "right",
                lineHeight: 40
            },
            data: ['4.10', '4.11', '4.12', '4.13', '4.14', '4.15', '4.16'],
            //坐标轴
            axisLine: {
                lineStyle: {
                    color: 'rgba( 101, 198, 231 , 0.2 )',

                },
            },
            //坐标值标注
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#50a2c1',
                    fontSize: "18px",
                },
            },
            // axisTick:'none',
        },
        yAxis: {
            name: "(%)",
            nameTextStyle: {
                color: 'rgba( 101, 198, 231 , 0.5)',
                align: "right"
            },
            //坐标轴
            axisLine: {
                show: false,
            },
            max: maxValue,
            min: minValue,
            interval: (maxValue - minValue) / 5,
            //坐标值标注
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba( 101, 198, 231, 0.5 )',
                    fontSize: 14
                },
            },
            //分格线
            splitLine: {
                lineStyle: {
                    color: 'rgba( 101, 198, 231 , 0.2 )',
                },
            },
        },
        series: [{
                tooltip: {
                    show: false,
                },
                name: 'a',
                type: 'bar',
                barWidth: 20,
                itemStyle: {
                    color: new echarts5.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [{
                                offset: 0,
                                color: '#1bdffc', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#1251d2', // 100% 处的颜色
                            },
                        ],
                        false
                    ),
                },
                data: info,
            },
            {
                tooltip: {
                    show: false,
                },
                type: 'pictorialBar',
                color: "#16bbed",
                symbolSize: [20, 10],
                symbolOffset: [0, -5],
                symbolPosition: 'end',
                data: info,
                z: 3,
            },
        ],
    };

    initChart(this.$refs.processingRate, option);

}

const detailChart = function (ref, info) {
    const {
        tickColor,
        sColor,
        eColor,
        data,
        totalData,
        titleText
    } = info;

    let option = {
        title: {
            text: titleText,
            x: '50%',
            top: 'middle',
            textAlign: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: '900',
                color: tickColor,
                textAlign: 'center',
            },
        },
        grid: {
            left: '0',
            right: '0',
            top: '0',
            bottom: '5%',
            containLabel: true,
        },
        color: [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                offset: 0,
                color: sColor
            }, {
                offset: 1,
                color: eColor
            }],
            global: false
        }],
        series: [{
                type: "gauge",
                center: ['50%', '50%'],
                radius: "120%",
                startAngle: 90,
                endAngle: -269.9999,
                axisTick: {
                    lineStyle: {
                        color: tickColor,
                        width: 3
                    },
                },
                z: 2,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                }
            },
            {
                name: '',
                type: "pie",
                radius: ["55%", "75%"],
                center: ["50%", "50%"],
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: false
                    }
                },
                data: [{
                        value: totalData - data,
                        itemStyle: {
                            borderWidth: 0,
                            color: "rgba(0,0,0,0)",
                        },
                        tooltip: {
                            show: false
                        },
                        label: {
                            show: false
                        },
                    },
                    {
                        value: data,
                    },

                ]
            },
            {
                name: 'bg',
                type: "pie",
                z: 1,
                silent: true,
                radius: ["60%", "65%"],
                center: ["50%", "50%"],
                borderWidth: 2,
                data: [{
                    value: totalData,
                    itemStyle: {
                        color: tickColor,
                    },
                    tooltip: {
                        show: false
                    },
                    label: {
                        show: false
                    },
                }]
            }
        ]
    }
    initChart(ref, option)

}


export default {
    detailChart,
    realTimeChart,
    timeChart,
    yieldChart,
    mothdChart,
    processRateChart,
}