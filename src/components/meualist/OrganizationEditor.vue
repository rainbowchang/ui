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
      <OrganizationList v-show="OrganizationList" v-on:refresh='refresh' ref="OrganizationList"></OrganizationList>
    </div>
  </div>
</template>

<script>
import {get} from "@/apis/restUtils";
import {Tree, TreeNode, VueTreeList} from "vue-tree-list";
import OrganizationList from "./OrganizationList";
export default {
  // name: "OrganizationEditor",
  components: {
    VueTreeList,
    OrganizationList
  },
  data() {
    return {
      data: new Tree([]),
      OrganizationList:false,
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
      this.OrganizationList = true;
      this.$refs.OrganizationList.refresh();
    },
    refresh(){
      this.data = new Tree([]);
      get("/organization/tree/pure", response => {
        let childrenNodes = response.data;
        this.loadTreeNodes(this.data, childrenNodes);
      });
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
</style>