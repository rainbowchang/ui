import appConfig from '../router/Appconfig';
import axios from 'axios'

// 使用axios，自定义get/post方法


axios.defaults.withCredentials=true;
export const post = (url, param, consumer) => {
    return axios.post(appConfig.restUrl(url), param,
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'UserName' : encodeURIComponent(localStorage.getItem("UserName")),
            'UserId' : encodeURIComponent(localStorage.getItem("UserId")),
            'url' : url
        }
    }).then(response => {
        console.log(response);
        consumer(response);
    });
}

export const blobpost = (url, param, consumer) => {
    return axios.post(appConfig.restUrl(url), param,
        {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'UserName' : encodeURIComponent(localStorage.getItem("UserName")),
                'UserId' : encodeURIComponent(localStorage.getItem("UserId")),
                'url' : url
            },
            responseType: "blob"
        }).then(response => {
        console.log(response);
        consumer(response);
    });
}

export const get = (url, consumer) => {
    return axios.get(appConfig.restUrl(url),
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'UserName' : encodeURIComponent(localStorage.getItem("UserName")),
            'UserId' : encodeURIComponent(localStorage.getItem("UserId")),
            'url' : url
        }
    }).then(response => {
        console.log(response);
        consumer(response);
    });
}

export const areas =["华东区域", "东北区域", "西北区域", "华北区域", "西南区域", "华南区域", "华中区域"]

export const provinces=["北京", "天津", "上海", "重庆", "河北", "河南",
                        "云南", "辽宁","黑龙江", "湖南", "安徽", "山东",
                        "新疆", "江苏", "浙江", "江西", "湖北", "广西", 
                        "甘肃", "山西", "内蒙古", "陕西","吉林", "福建",
                        "贵州", "广东", "青海", "西藏", "四川", "宁夏",
                        "海南",  "台湾", "香港", "澳门"]

export const getProvinceByArea = (area) => {
    switch (area) {
        case "华东区域":
            return ["山东", "江苏", "安徽", "浙江", "福建", "上海", "台湾"];
        case "东北区域":
            return ["辽宁", "吉林", "黑龙江"];
        case "西北区域":
            return ["陕西", "甘肃", "宁夏", "青海", "新疆"];
        case "华北区域":
            return ["北京", "河北", "山西", "天津", "内蒙古"];
        case "西南区域":
            return ["云南", "贵州", "四川", "重庆", "西藏"];
        case "华南区域":
            return ["广东", "广西", "海南", "香港", "澳门"];
        case "华中区域":
            return ["湖南", "湖北", "河南", "江西"];
        default:
            return [];
    }
}

export const getAreaByProvince = (province) => {
    switch (province) {
        case "山东":
        case "江苏":
        case "安徽":
        case "浙江":
        case "福建":
        case "上海":
        case "台湾":
            return "华东区域";
        case "辽宁":
        case "吉林":
        case "黑龙江":
            return "东北区域";    
        case "陕西":
        case "甘肃":
        case "宁夏":
        case "青海":
        case "新疆":
            return "西北区域";
        case "北京":
        case "河北":
        case "山西":
        case "天津":
        case "内蒙古":
            return "华北区域";
        case "云南":
        case "贵州":
        case "四川":
        case "重庆":
        case "西藏":
            return "西南区域";
        case "广东":
        case "广西":
        case "海南":
        case "香港":
        case "澳门":
            return "华南区域";
        case "湖南":
        case "湖北":
        case "河南":
        case "江西":
            return "华中区域"   
        default:
            return "";
    }
}

export const NodeType={
    "ROOT":"ROOT",
    "OEM_ROOT":"OEM_ROOT",
    "USER_ROOT":"USER_ROOT",
    "COMPOSITE":"COMPOSITE",
    "LEAF":"LEAF",
    "AREA":"AREA",
    "PROVINCE":"PROVINCE",
    "CUSTOMER":"CUSTOMER",
    "FACTORY":"FACTORY",
    "SHOP":"SHOP",
    "PRODUCTLINE":"PRODUCTLINE",
    "NODE":"NODE"
}

export const OrgTypeCategory = {
    "ROOT": "0",
    "ORGANIZATION": "1",
    "MACHINETOOL": "2"
}

export const timeToString = (input, dayFlag) => {
    let hour = parseInt(input / 3600);
    let min = parseInt((input - hour * 3600) / 60);
    let sec = input - hour * 3600 - min *60;
    let day = 0;
    if (hour > 24) {
        day = parseInt(hour / 24);
        hour = hour - day * 24;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    if(true !== dayFlag){
        day = 0;
    }
    return (hour + ':' + min + ':' + sec) + (day > 0 ? '(+' + day + ')' : '');
}

export const StringToTime = (input) => {
    try {
        let strings = input.split(':');
        return parseInt(strings[0]) * 3600 + parseInt(strings[1]) * 60 + parseInt(strings[2]);
    } catch (e) {
        return 0;
    }
}

export const formatDate = (d, fmt) => {
    let date = new Date(d);
    if(date == null){
        return "";
    }
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };

    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(
                RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

export const getTimeAxis =(input, chart, that) => {
    let chartDom = document.getElementById(chart);
    let myChart = that.$echarts.init(chartDom);
    let option;

    let dataCount = input.workStatusSegmentList.length;
    let startTime = input.beginTime;
    let endTime = input.endTime;
    let categories = [];
    let alarmMarkPointList = [];
    categories.push(input.name);
    let types = [
        {name: '加工', color: '#089642'},
        {name: '停机', color: '#fffc02'},
        {name: '未连接', color: '#808080'},
    ];
    let data = [];
    let thisEcharts = that.$echarts;
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

    getAlarmMarkPoint(input.alarmRecordList);

    console.log("data...: ", data);
    function renderItem(params, api) {
        console.log("renderItem...: ",params, api);
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
        console.log("renderItem end...: ",start, end, height);
        return rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
        };
    }


    function getAlarmMarkPoint(val) {
        val.forEach(function (item) {
            let record = {
                alarmFlag: true,
                name: "告警",
                value: '',
                code: item.codes,
                xAxis: item.timestamp,
                yAxis: 0,
                itemStyle: {color: '#ee0000'},
                symbol: 'path://M1 9 L1 40 L0 40 L0 0 L8 20 L0 20 Z',
                symbolSize: [6, 12],
                symbolOffset: [5, -10]
            };
            alarmMarkPointList.push(record);
        });
    }
    myChart.on('datazoom', function(params){
        that.onDataZoomChange(params);
    });
    option = {
        tooltip: {
            formatter: function (params) {
                if (params.data.alarmFlag === true) {
                    return  '(' + getTimeFromTime(params.data.xAxis) + ') ' + params.data.name + ': ' + params.data.code ;
                } else {
                    return params.name + ': ' + timestampToHMS(params.value[3]);  //params.marker +
                }
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
                    let d = getTimeFromTime(val);
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
            data: data,
            markPoint:{
                data:alarmMarkPointList
            }
        }]
    };
    option && myChart.setOption(option);
    return myChart;
}

export const timestampToHMS = (input) => {
    let hour = parseInt(input / 3600);
    let min = parseInt((input - hour * 3600) / 60);
    let sec = input - hour * 3600 - min * 60;
    return hour + '小时' + min + '分' + sec + '秒';
}

export const getDateTimeFromTimestamp = (time) => {
    let date = new Date(time * 1000);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}`;
}


export const getTimeFromTime = (time) => {
    let date = new Date(time * 1000);
    return `${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}`;
}

/**
 * 文件下载, 对于下载链接可直接用 window.open(url, "_blank");
 * @param {*} data 二进制数据或base64编码 Blob、String
 * @param {*} fileName 下载的文件命名，可带扩展名，跨域下无效
 */
export const downloadFile = (data, fileName) => {
    let url = "";
    let isBlob = false;
    const errMsg = "下载出错，文件数据无法识别！";

    if (data instanceof Blob) {
        isBlob = true;
        url = window.URL.createObjectURL(data);
    } else if (typeof data == "string") {
        // base64编码
        url = data;
    } else {
        console.log(errMsg);
        return;
    }

    if ("download" in document.createElement("a")) {
        // 非IE下载
        const tmpLink = document.createElement("a");
        tmpLink.download = fileName || "";
        tmpLink.style.display = "none";
        tmpLink.href = url;
        document.body.appendChild(tmpLink);
        tmpLink.click();
        window.URL.revokeObjectURL(tmpLink.href); // 释放URL 对象
        document.body.removeChild(tmpLink);
    } else {
        // IE10+下载
        if (isBlob) {
            window.navigator.msSaveBlob(data, fileName);
        } else {
            //Message.error(errMsg);
            console.log(errMsg);
            // return;
        }
    }
}