<template>
  <div class="wrapper">
    <!-- 左侧区域树状菜单选择 -->
    <div class="treelist">
      <div>
        <!-- 相关api参考 https://www.npmjs.com/package/vue-tree-list -->
        <!-- 演示地址 http://paradeto.com/vue-tree-list/ -->
        <!-- <button @click="addNode">新增一级类目</button> -->
        <vue-tree-list
          @click="onClick"
          @change-name="onChangeName"
          @delete-node="onDel"
          @add-node="onAddNode"
          :model="data"
          default-tree-node-name="new node"
          default-leaf-node-name="new leaf"
          v-bind:default-expanded="false"
        >
          <!-- <span class="icon" slot="addTreeNode">新增</span> -->
          <!-- <span class="icon" slot="addLeafNode">新增文件</span> -->
          <!-- <span class="icon" slot="editNode" v-if = false>编辑</span> -->
          <!-- <span class="icon" slot="delNode">删除</span> -->
        </vue-tree-list>
        <!-- <button @click="getNewTree">Get new tree</button> -->
      </div>
    </div>
    <!-- 右侧table及各个功能 -->
    <div class="tableinfo">
      <!-- 工厂表单 -->
      <factory v-show="factory"></factory>
      <!-- 客户表单 -->
      <statustable v-show="statustable" ref="statustable"></statustable>
      <detailChart v-show="showDetail" ref="showDetail" :detailinfo=detailinfo></detailChart>
    </div>
  </div>
</template>
<script>
import { VueTreeList, Tree, TreeNode } from "vue-tree-list";
import statustable from "./statustable";
import factory from "./factory";
import detailChart from "./detailChart";
import {get, post} from "@/apis/restUtils";

const customerModel = () => import("./customerInfoModal.vue");

export default {
  components: {
    VueTreeList,
    statustable,
    detailChart,
    factory
  },
  data() {
    return {
      factory: false,
      showDetail: false,
      detailinfo:null,//标尺页面传递信息
      statustable: false,
      dateChoose: "", //table选择开始结束时间
      currentPage: 1, //分页当前页数,
      treeParam: {},
      newTree: {},
      sendNode: {},
      data: new Tree([
        
      ])
    };
  },
  mounted: function () {
     get("/organization/tree/all", response=>{
      var childrenNodes = response.data.children;
      console.log(childrenNodes, "loadNodes");
      for(var i in childrenNodes){
          this.loadTreeNodes(this.data, childrenNodes[i]);
      }
     });
  },
  methods: {
    loadTreeNodes(tree, node){
        var treeNode = this.createOneTreeNode(node);
        tree.addChildren(treeNode);
        var children = node.children;
        if(children != null){
           for(var i in children){
            var child = children[i];
            this.loadTreeNodes(treeNode, child)
           }
        }
    },
    createOneTreeNode(paraNode){ 
        return new TreeNode(
           {
              pid: paraNode.name,  
              id: paraNode.key,
              key: paraNode.key, 
              name:  paraNode.name, 
              isLeaf: paraNode.leaf, 
              addLeafNodeDisabled: true, 
              dragDisabled:true,
              editNodeDisabled:true,
              type: paraNode.type
            }
          );
    },
    // 删除节点	树节点
    onDel(node) {
      console.log(node, "onDel");
      this.sendNodeContent("/organization/deleteNode", node, response=>{
         console.log(response.data, "deleteResult");
      });
      node.remove();
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
    sendNodeContentWhenClick(nodeInfo){
      console.log(nodeInfo, "node info");
       if(this.timer){
        clearInterval(this.timer);
      }
      if(!nodeInfo.isLeaf){
        this.showDetail= false;
        this.sendNodeContent("/organization/node/trigger", nodeInfo, reponse => {
          var statusInfos = reponse.data;
          this.$refs.statustable.content = statusInfos;
          this.$refs.statustable.totalCount = statusInfos.length;
          this.statustable = true;
          // console.log(this.$refs.statustable.content);
        });
        return;
      }
      this.statustable = false;
      this.showDetail= true;
      // console.log("detail Info" , this.detailinfo);
      this.sendNodeContent("/organization/leafNode/trigger", nodeInfo, response =>{
        var data = response.data;
        if(data.table != null){
          this.detailinfo=response.data;    
        }
      });
      this.timer = setInterval(() => {
          this.sendNodeContent("/organization/leafNode/trigger", nodeInfo, response =>{
          this.detailinfo=response.data;
        });
      }, 3000);
    },
    buildSubNewTree(customerTreeDatas, condition){
        for(var i in customerTreeDatas){
            var customerTreeData = customerTreeDatas[i];
            var customerBean = customerTreeData.customerBean;
            if(customerBean == null){
               continue;
            }
            if(condition(customerBean)){
               return new Tree(customerTreeData);
            }
        }
        return null;
    },
    customerModelView(nodeInfo, sendNodeContent){
        this.$Modal.confirm({
          title: '客户列表',
          render: (h) => {
            return h(customerModel, {
              ref: 'customerModel',
              props: {
                customerNode: this.getParentCustomerNode(nodeInfo),
                parentNode:nodeInfo.parent
              },
              on:{
                showInfo:(key, value, type) =>{
                  nodeInfo.name = value;
                  nodeInfo.key = key;
                  nodeInfo.type = type;
                  nodeInfo.dragDisabled = true;
                  nodeInfo.addLeafNodeDisabled = true;
                  if(type === "LEAF"){
                    nodeInfo.isLeaf = true;
                  }else{
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
             sendNodeContent("/organization/addNode", nodeInfo, response =>{
                    console.log(response.data);
                  });
             this.$Modal.remove();
          }
        });
    },
    sendNodeContent(path, nodeInfo, consumer){
       var treePath = this.getTreePath(nodeInfo);
       if(nodeInfo.parent != null){
         var parentPath = this.getTreePath(nodeInfo.parent);
       }
       if(treePath == "" || treePath == null){
         // alert("没有找到客户，所以，不能在服务端添加相应的节点");
         return;
       }
       var nodeContent = {parentKey: nodeInfo.parent.name, parentPath: parentPath, nodePath:treePath, key: nodeInfo.key, name:nodeInfo.name, type: nodeInfo.type};
       // console.log("send node contents:" + JSON.stringify(nodeContent));
       post(path, nodeContent,consumer);
    },
    getTreePath(nodeInfo, path){
      if(path == null){
        path = "";
      }
      var key = nodeInfo.key;
      if(key != undefined){
         path = "/" + key + path;  
      }
      if(nodeInfo.type  === "CUSTOMER"){
        return path;
      }
      if(nodeInfo.parent == null){
        return "";
      }
      return this.getTreePath(nodeInfo.parent, path);
    },
    getOneTreeNode(nodeInfo, name){
      if(nodeInfo == null || nodeInfo == undefined ){
        return null;
      }
      if(nodeInfo.name === name){
        return nodeInfo;
      }
      var children = nodeInfo.children;
      for(var i in children){
        var node = this.getOneTreeNode(children[i], name);
        if(node != null && node.name === name){
          return node;
        }
      }
      return null;
    },
    getParentCustomerNode(nodeInfo){
      if(nodeInfo == null || nodeInfo == undefined){
        return null;
      }
      if(nodeInfo.type === "CUSTOMER"){
        return nodeInfo;
      }
      return this.getParentCustomerNode(nodeInfo.parent);
    },
    getChildrenCustomerNodes(nodeInfo){
        var customerNodes = [];
        this.getSubCustomerNodes(nodeInfo, customerNodes);
        return customerNodes;
    },
    getSubCustomerNodes(nodeInfo, customerNodes){
      if(nodeInfo == null || nodeInfo == undefined){
        return;
      }
      if(nodeInfo.type === "CUSTOMER"){
        customerNodes.push(nodeInfo);
        // console.log(customerNodes, "CUSTOMER nodes");
      }
      // console.log(nodeInfo, "subNode");
      var children = nodeInfo.children;
      if(children == null){
        return;
      }
      // console.log(customerNodes, "subcustomerNodes");
      for(var i in children){
        // console.log(children[i], "children");
        this.getSubCustomerNodes(children[i], customerNodes)
      }
      return;
    },
    addNode() {
      var node = new TreeNode({ name: "new node", isLeaf: false });
      if (!this.data.children) this.data.children = [];
      this.data.addChildren(node);
    },
    getNewTree() {
      var vm = this;
      function _dfs(oldNode) {
        var newNode = {};

        for (var k in oldNode) {
          if (k !== "children" && k !== "parent") {
            newNode[k] = oldNode[k];
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = [];
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]));
          }
        }
        return newNode;
      }

      vm.newTree = _dfs(vm.data);
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
  padding: 2em 1em;
}
.font {
  font-size: 16px;
  font-weight: bold;
  margin-right: 1em;
}
</style>

