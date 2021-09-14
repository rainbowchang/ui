<template>
    <div class="wrapper">
        <!-- 左侧区域树状菜单选择 -->
        <div class="treelist">
            <div>
                <vue-tree-list
                    @click="onClick"
                    :model="data"
                    v-bind:default-expanded="true">
                </vue-tree-list>
            </div>
        </div>

        <!-- 右侧table及各个功能 -->
        <div class="tableinfo">
            <div class="swiper-button-next">
                <div class="bg" @click="onRightSlide"></div>
            </div>
            <transition name="fade">
                <OrganizationList v-show="OrganizationList && showFlag" v-on:refresh='refresh'
                                  ref="OrganizationList"></OrganizationList>
            </transition>
            <transition name="fade">
                <SchedulePlanList v-show="SchedulePlanList && showFlag" ref="SchedulePlanList"></SchedulePlanList>
            </transition>
            <transition name="fade">
                <ScheduleInstList v-show="ScheduleInstList && showFlag" ref="ScheduleInstList"></ScheduleInstList>
            </transition>
        </div>
    </div>
</template>

<script>
import {get} from "@/apis/restUtils";
import {Tree, TreeNode, VueTreeList} from "vue-tree-list";
import OrganizationList from "./OrganizationList";
import SchedulePlanList from "./SchedulePlanList";
import ScheduleInstList from "./ScheduleInstList";

export default {
    // name: "OrganizationEditor",
    components: {
        VueTreeList,
        OrganizationList,
        SchedulePlanList,
        ScheduleInstList
    },
    data() {
        return {
            data: new Tree([]),
            OrganizationList: true,
            SchedulePlanList: false,
            ScheduleInstList: false,
            showFlag: false,
            index: 0,
        }
    },

    mounted: function () {
        this.refresh();
    },
    methods: {
        loadTreeNodes(tree, node) {
            let treeNode = this.createOneTreeNode(node);
            tree.addChildren(treeNode);
            let children = node.children;
            if (children != null) {
                for (let i in children) {
                    let child = children[i];
                    this.loadTreeNodes(treeNode, child)
                }
            }
        },
        createOneTreeNode(paraNode) {
            return new TreeNode(
                {
                    pid: paraNode.name,
                    id: paraNode.id,
                    key: paraNode.id,
                    name: paraNode.name,
                    isLeaf: paraNode.leaf,
                    addLeafNodeDisabled: true,
                    addTreeNodeDisabled: true,
                    dragDisabled: true,
                    editNodeDisabled: true, //编辑节点的事件信息不足，暂停使用
                    delNodeDisabled: true,
                    type: paraNode.type
                }
            );
        },
        onClick(nodeInfo) {  //输入一个organization对象
            let nodeId = nodeInfo.id;
            this.$refs.OrganizationList.parentId = nodeId;
            this.$refs.SchedulePlanList.parentId = nodeId;
            this.$refs.ScheduleInstList.parentId = nodeId;
            this.showFlag = true;
            this.$refs.OrganizationList.refresh();
            this.$refs.SchedulePlanList.refresh();
            this.$refs.ScheduleInstList.refresh();
        },
        refresh() {
            this.data = new Tree([]);
            get("/organization/tree/pure", response => {
                let childrenNodes = response.data;
                this.loadTreeNodes(this.data, childrenNodes);
            });
        },
        onRightSlide() {
            this.index++;
            if (this.index >= 3) {
                this.index -= 3;
            }
            this.OrganizationList = false;
            this.SchedulePlanList = false;
            this.ScheduleInstList = false;
            switch (this.index) {
                case 0:
                    this.OrganizationList = true;
                    break;
                case 1:
                    this.SchedulePlanList = true;
                    break;
                case 2:
                    this.ScheduleInstList = true;
                    break;
            }
        }
    }
}
</script>

<style scoped>
.wrapper {
    width: 98%;
    height: 95%;
    margin: 1% auto;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
}

.treelist {
    width: 20%;
    padding-top: 2em;
    overflow: auto;
}

.tableinfo {
    width: 79%;
    padding: 2em 1em;
}

.swiper-button-next {
    position: absolute;
    width:41px;
    height:69px;
    top: 50%;
    right: 0;
    margin-top: -1.785714rem;
    cursor: pointer;
    z-index: 10;
    filter:alpha(opacity=30);
    background:#666;
    opacity:0.3;
}

.swiper-button-next:hover{
    filter:alpha(opacity=60);
    opacity:0.6;
}

.bg{
    position: relative;
    width: 100%;
    height: 100%;
    background:url(https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png) no-repeat -125px 50%;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

.fade-enter-active, .fade-leave-active {
    transition: all 0.3s linear;
    transform: translateX(0);
}

.fade-enter, .fade-leave {
    transform: translateX(100%);
}

.fade-leave-to {
    transform: translateX(100%);
}
</style>