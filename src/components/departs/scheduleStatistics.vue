<template>
    <div class="wrappers">
        <div class="top">
            <el-button type="primary" icon="el-icon-arrow-left" @click="back">上一层</el-button>
            <span>班组统计</span>
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
            title: [
                {
                    title: "机床型号",   //"客户名称",
                    key: "model",
                    sortable: true,
                    width: 200
                },
                {
                    title: "加工件数",   //"客户名称",
                    key: "piece1",
                    sortable: true,
                    width: 200
                },
                {
                    title: "加工时间",   //"客户名称",
                    key: "worktime1",
                    sortable: true,
                    width: 200
                },
                {
                    title: "停机时间",   //"客户名称",
                    key: "idletime1",
                    sortable: true,
                    width: 200
                },
                {
                    title: "加工件数",   //"客户名称",
                    key: "piece2",
                    sortable: true,
                    width: 200
                },
                {
                    title: "加工时间",   //"客户名称",
                    key: "worktime2",
                    sortable: true,
                    width: 200
                },
                {
                    title: "停机时间",   //"客户名称",
                    key: "idletime2",
                    sortable: true,
                    width: 200
                },
                {
                    title: "加工件数",   //"客户名称",
                    key: "piece3",
                    sortable: true,
                    width: 200
                },
                {
                    title: "加工时间",   //"客户名称",
                    key: "worktime3",
                    sortable: true,
                    width: 200
                },
                {
                    title: "停机时间",   //"客户名称",
                    key: "idletime3",
                    sortable: true,
                    width: 200
                },
            ],
        }
    },
    mounted: function () {


    }
}
</script>

<style scoped>

</style>