import * as echarts5 from 'echarts5'
const color = ["#4EAD78", "#F6BA58", "#808080", "#EF3E00"];
const fontSizeFN = (size) => {
    const width = document.body.clientWidth || window.innerWidth;
    const rem = width / 192;
    return size * rem;
}

const initChart = (DOM, option, chartObj) => {
    let chart = chartObj || echarts5.init(DOM);
    chart.setOption(option);
    return chart
}

const realTimeChart = (ref, info, chartObj) => {
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
        color: color,
        title: {
            text: titleText,
            x: '50%',
            top: 'middle',
            textAlign: 'center',
            textStyle: {
                fontSize: fontSizeFN(1.5),
                fontWeight: '900',
                color: "#ffaa45",
                textAlign: 'center',
            },
        },
        legend: {
            bottom: '0%',
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
                        width: fontSizeFN(0.3)
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
                    borderRadius: fontSizeFN(0.2),
                    borderColor: "#1B2325",
                    borderWidth: fontSizeFN(0.4)
                },
                label: {
                    formatter: (v) => {
                        const value = v.data.value;
                        const name = v.data.name;

                        return value + "% \n" + name;
                    },
                    textStyle: {
                        color: "#31ffff",
                        fontSize: fontSizeFN(2.4)
                    },
                },
                labelLine: {
                    length: 30
                },
                data: [{
                        value: work,
                        name: '加工',
                    },
                    {
                        value: stop,
                        name: '停机',

                    },
                    {
                        value: offLine,
                        name: '未连接',

                    },
                    {
                        value: alarm,
                        name: '故障',

                    },
                ]
            }
        ]
    }

    return initChart(ref, option, chartObj);

}



const timeChart = function (ref, info, showText, chartObj) {
    const yData = ["加工", "停机", "未连接", "故障"];
    const seriesData = info;
    const showtext = showText;
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
        barWidth: fontSizeFN(1),
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
        color: color,
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
                margin: 40,
                color: function (value) {
                    let color = '';
                    // "#4EAD78", "#F6BA58", "#808080", "#EF3E00"
                    switch (value) {
                        case "加工":
                            color = "#4EAD78";
                            break;
                        case "停机":
                            color = "#F8AA34";
                            break;
                        case "故障":
                            color = "#EF3E00";
                            break;
                        default:
                            color = "#808080";
                    }
                    return color
                },
                fontSize: fontSizeFN(1.8)

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
                fontSize: fontSizeFN(1.8)
            },
            data: showtext
        }],
        series: [{
                // name: "加工",
                type: "bar",
                zlevel: 1,
                itemStyle: dataBarItemStyle,
                barWidth: 10,
                data: seriesData
            },
            dataBarBg,
        ]
    }
    return initChart(ref, option, chartObj)
}

const yieldChart = function (ref, info, chartObj) {
    const {
        xData,
        data,
    } = info;
    let sideData = data.map((item) => item <= 0 ? item : (item + 0));
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
            textStyle: {
                color: '#50a2c1',
                fontSize: fontSizeFN(1.8),
            },
        },
        yAxis: {
            name: "(pcs)",
            nameTextStyle: {
                color: 'rgba( 101, 198, 231 , 0.5)'
            },
            //坐标轴
            axisLine: {
                show: false,
            },
            splitNumber: 5,
            //坐标值标注
            textStyle: {
                color: 'rgba( 101, 198, 231, 0.5 )',
                fontSize: fontSizeFN(1.4)
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
                barWidth: fontSizeFN(2),
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
                barWidth: fontSizeFN(1),
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
                label: {
                    show: true,
                    lineHeight: 30,
                    width: 80,
                    height: 30,
                    backgroundColor: 'rgba(0,160,221,0.1)',
                    borderRadius: 200,
                    position: ["-25", '-60'],
                    distance: 1,
                    formatter: [
                        '    {d|●}',
                        ' {a|{c}}\n',
                        '    {b|}'
                    ].join(','),
                    rich: {
                        d: {
                            color: '#3CDDCF',
                        },
                        a: {
                            color: '#fff',
                            align: 'center',
                            fontSize: fontSizeFN(1.8),
                        },
                        b: {
                            width: 1,
                            height: 15,
                            borderWidth: 1,
                            borderColor: '#234e6c',
                            fontSize: fontSizeFN(1),
                            align: 'left'
                        },
                    }
                }
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
    return initChart(ref, option, chartObj);
}

const mothdChart = function (ref, info, chartObj) {
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
                fontSize: fontSizeFN(2)
            },
            // formatter: function(params){
            //     return  params + '%';
            // },
            borderWidth: 0
        },
        color: color,
        legend: {
            data: ['加工', '停机', '未连接', '故障'],
            right: '5%',
            textStyle: {
                color: "#ffffff",
                fontSize: fontSizeFN(1.8)
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
            formatter: "{value}%",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: fontSizeFN(1.4),
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
    return initChart(ref, option, chartObj);
}


const detailChart = function (ref, info, chartObj) {
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
                fontSize: fontSizeFN(1.8),
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
    return initChart(ref, option, chartObj)

}


export default {
    detailChart,
    realTimeChart,
    timeChart,
    yieldChart,
    mothdChart,
}