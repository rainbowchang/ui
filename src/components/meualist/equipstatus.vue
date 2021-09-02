<template>
    <div class="wrapper">
        <!-- 左侧区域树状菜单选择 -->
        <div class="treelist">
            <div>
                <vue-tree-list
                    @click="onClick"
                    @change-name="onChangeName"
                    @delete-node="onDel"
                    @add-node="onAddNode"
                    :model="data"
                    default-tree-node-name="new node"
                    default-leaf-node-name="new leaf"
                    v-bind:default-expanded="true"
                >
                </vue-tree-list>
            </div>
        </div>
        <!-- 右侧table及各个功能 -->
        <div class="tableinfo">
            <!-- 工厂表单 -->
            <factory v-show="factory"></factory>
            <!-- 客户表单 -->
            <statustable v-show="statustable" ref="statustable" @onselection="onselection" @onshowstatusinfo="onshowstatusinfo"></statustable>
            <detailChart v-show="showDetail" ref="showDetail" :detailinfo=detailinfo></detailChart>
            <statusinfonew v-show="statusinfoshow"  ref="statusinfonew" :statusinfonew="{selections,statusinfoshow}" @onstatusinfoshow="onstatusinfoshow" @onstatusinfoback="onstatusinfoback"></statusinfonew>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :append-to-body="true">
            <div>
                <span>{{ dialogTips }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onConfirmClick">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import {VueTreeList, Tree, TreeNode} from "vue-tree-list";
import statustable from "./statustable";
import factory from "./factory";
import detailChart from "./detailChart";
import {get, post, NodeType} from "@/apis/restUtils";
import statusinfonew from "../departs/statusinfonew";
const customerModel = () => import("./customerInfoModal.vue");

export default {
    components: {
        VueTreeList,
        statustable,
        detailChart,
        factory,
      statusinfonew
    },
    data() {
        return {
            factory: false,
            showDetail: false,
            detailinfo: null,//标尺页面传递信息
            statustable: false,
            dateChoose: "", //table选择开始结束时间
            currentPage: 1, //分页当前页数,
            treeParam: {},
            newTree: {},
            sendNode: {},
            data: new Tree([]),
            dialogVisible: false,
            dialogTips: "",
            delegateParam: {},
            selections: [],
            statusinfoshow: false,
        };
    },
    mounted: function () {
        get("/organization/tree/all/web", response => {
            let childrenNodes = response.data;
            console.log(childrenNodes, "loadNodes");
            // for(let i in childrenNodes){
            this.loadTreeNodes(this.data, childrenNodes);
            // }
        });
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
                    delNodeDisabled: false,
                    type: paraNode.type
                }
            );
        },
        // 删除节点	树节点
        onDel(node) {
            console.log(node, "onDel");
            this.delegateParam = {"node": node, "func": this.onConfirmDelete};
            this.dialogTips = '确定删除【' + node.name + '】吗?';
            this.dialogVisible = true;
        },
        onConfirmDelete(node){
            console.log("onConfirmDelete", node);
            this.sendNodeContent("/organization/deleteNode", node, response => {
                console.log(response.data, "deleteResult");
            });
            node.remove();
            this.dialogVisible = false;
        },
        onConfirmClick(){
            let func = this.delegateParam.func;
            let node = this.delegateParam.node;
            func(node);
            this.clearDelegate();
        },
        clearDelegate(){
            this.delegateParam={};
        },
        // 更换名字	{'id'，'oldName'，'newName'}
        onChangeName(nodeInfo) {
            console.log(nodeInfo, "onChangeName");
        },
        // 添加节点	树节点
        onAddNode(nodeInfo) {
            this.customerModelView(nodeInfo, this.sendNodeContent);
        },

        // tree节点点击事件
        onClick(nodeInfo) {
            this.sendNodeContentWhenClick(nodeInfo);
            // if(this.getParentCustomerNode(nodeInfo) != null ){
            //     this.sendNodeContentWhenClick(nodeInfo);
            //     return
            // }
            // var customerNodes = this.getChildrenCustomerNodes(nodeInfo);
            // for(var i in customerNodes){
            //   this.sendNodeContentWhenClick(customerNodes[i]);
            // }
            return;
        },
        sendNodeContentWhenClick(nodeInfo) {
            console.log(nodeInfo, "node info");
            if (this.timer) {
                clearInterval(this.timer);
            }
            if (!nodeInfo.isLeaf) {
                this.showDetail = false;
                nodeInfo.pageNo = 1;
                nodeInfo.pageSize = 10;
                this.sendNodeContent("/organization/node/trigger", nodeInfo, reponse => {
                    let replyStatus = reponse.data;
                    if (replyStatus == null) {
                        return;
                    }
                    this.$refs.statustable.content = replyStatus.plcInfoBeans;
                    this.$refs.statustable.totalCount = replyStatus.total;
                    this.$refs.statustable.nodeKey = nodeInfo.key;
                    this.statustable = true;

                    // console.log(this.$refs.statustable.content);
                });
                return;
            }
            this.statustable = false;
            this.showDetail = true;
            // console.log("detail Info" , this.detailinfo);
            this.sendNodeContent("/organization/leafNode/trigger", nodeInfo, response => {
                let data = response.data;
                if (data.table != null) {
                    this.detailinfo = response.data;
                }
            });
            this.timer = setInterval(() => {
                this.sendNodeContent("/organization/leafNode/trigger", nodeInfo, response => {
                    console.log("UserName= " + localStorage.getItem("UserName"));
                    this.detailinfo = response.data;
                });
            }, 3000);
        },
        buildSubNewTree(customerTreeDatas, condition) {
            for (let i in customerTreeDatas) {
                let customerTreeData = customerTreeDatas[i];
                let customerBean = customerTreeData.customerBean;
                if (customerBean == null) {
                    continue;
                }
                if (condition(customerBean)) {
                    return new Tree(customerTreeData);
                }
            }
            return null;
        },
        customerModelView(nodeInfo, sendNodeContent) {
            this.$Modal.confirm({
                title: '客户列表',
                render: (h) => {
                    return h(customerModel, {
                        ref: 'customerModel',
                        props: {
                            customerNode: nodeInfo, //this.getParentCustomerNode(nodeInfo),
                            parentNode: nodeInfo.parent
                        },
                        on: {
                            showInfo: (key, value, type) => {  // key--id, value--alias
                                console.log("++++++++++++++++++", key, value, type);
                                nodeInfo.name = value;
                                nodeInfo.key = key;
                                nodeInfo.type = type;
                                nodeInfo.dragDisabled = true;
                                nodeInfo.addLeafNodeDisabled = true;
                                if (type === NodeType.LEAF) {
                                    nodeInfo.isLeaf = true;
                                } else {
                                    nodeInfo.isLeaf = false;
                                }
                            }
                        }
                    })
                },
                width: 600,
                closable: false,
                okText: "确定",
                cancelText: "取消",
                loading: true,
                onOk() {
                    console.log("------------------", nodeInfo);
                    sendNodeContent("/organization/addNode", nodeInfo, response => {
                        console.log(response.data);
                    });
                    this.$Modal.remove();
                }
            });
        },
        sendNodeContent(path, nodeInfo, consumer) {  // path--url,  name-alias
            console.log("sendNodeContent", nodeInfo)
            // let treePath = this.getTreePath(nodeInfo);
            // let parentPath = null;
            // if (nodeInfo.parent != null) {
            //     parentPath = this.getTreePath(nodeInfo.parent);
            // }
            // if (treePath == "" || treePath == null) {
            //     alert("没有找到客户，所以，不能在服务端添加相应的节点");
            //     return;
            // }
            let nodeContent = {
                parentKey: nodeInfo.parent.key,  //parentId
                // parentPath: parentPath,
                // nodePath: treePath,
                key: nodeInfo.key,
                name: nodeInfo.name,
                type: nodeInfo.type
            };
            // console.log("send node contents:" + JSON.stringify(nodeContent));
            post(path, nodeContent, consumer);
        },
        // getTreePath(nodeInfo, path) {
        //     if (path == null) {
        //         path = "";
        //     }
        //     let key = nodeInfo.key;
        //     if (key != undefined) {
        //         path = "/" + key + path;
        //     }
        //     if (nodeInfo.type === NodeType.CUSTOMER) {
        //         return path;
        //     }
        //     if (nodeInfo.parent == null) {
        //         return "";
        //     }
        //     return this.getTreePath(nodeInfo.parent, path);
        // },
        getOneTreeNode(nodeInfo, name) {
            if (nodeInfo == null || nodeInfo == undefined) {
                return null;
            }
            if (nodeInfo.name === name) {
                return nodeInfo;
            }
            let children = nodeInfo.children;
            for (let i in children) {
                let node = this.getOneTreeNode(children[i], name);
                if (node != null && node.name === name) {
                    return node;
                }
            }
            return null;
        },
        getParentCustomerNode(nodeInfo) {   //TODO 准备删了   --zch
            if (nodeInfo == null || nodeInfo == undefined) {
                return null;
            }
            if (nodeInfo.type === NodeType.CUSTOMER) {
                return nodeInfo;
            }
            return this.getParentCustomerNode(nodeInfo.parent);
        },
        getChildrenCustomerNodes(nodeInfo) {
            let customerNodes = [];
            this.getSubCustomerNodes(nodeInfo, customerNodes);
            return customerNodes;
        },
        getSubCustomerNodes(nodeInfo, customerNodes) {
            if (nodeInfo == null || nodeInfo == undefined) {
                return;
            }
            if (nodeInfo.type === NodeType.CUSTOMER) {
                customerNodes.push(nodeInfo);
                // console.log(customerNodes, "CUSTOMER nodes");
            }
            // console.log(nodeInfo, "subNode");
            let children = nodeInfo.children;
            if (children == null) {
                return;
            }
            // console.log(customerNodes, "subcustomerNodes");
            for (let i in children) {
                // console.log(children[i], "children");
                this.getSubCustomerNodes(children[i], customerNodes)
            }
            return;
        },
        addNode() {
            let node = new TreeNode({name: "new node", isLeaf: false});
            if (!this.data.children) this.data.children = [];
            this.data.addChildren(node);
        },
        getNewTree() {
            let vm = this;

            function _dfs(oldNode) {
                let newNode = {};

                for (let k in oldNode) {
                    if (k !== "children" && k !== "parent") {
                        newNode[k] = oldNode[k];
                    }
                }

                if (oldNode.children && oldNode.children.length > 0) {
                    newNode.children = [];
                    for (let i = 0, len = oldNode.children.length; i < len; i++) {
                        newNode.children.push(_dfs(oldNode.children[i]));
                    }
                }
                return newNode;
            }

            vm.newTree = _dfs(vm.data);
        },
        onstatusinfoshow(val){
          console.log(val);

        },
        onselection(val){
          this.selections = val.selections;
          this.statusinfoshow = val.statusinfoshow;
          console.log('onselection:', val);
        },
        onshowstatusinfo(val){
          this.statustable = false;
          this.selections = val.selections;
          this.statusinfoshow = val.statusinfoshow;
          console.log('onshowstatusinfo:', val);
        },
        onstatusinfoback(){
          this.statusinfoshow = false;
          this.statustable = true;
        }
    }

};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.icon {
    &:hover {
        cursor: pointer;
    }
}
</style>
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

.wrapper > div {
    height: 100%;
    background-color: white;
    border-radius: 3px;
}

.treelist {
    width: 20%;
    padding-top: 2em;
    overflow: auto;
}

.tableinfo {
    width: 79%;
    padding: 1em 1em;
}

.font {
    font-size: 16px;
    font-weight: bold;
    margin-right: 1em;
}
</style>

