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
          <!-- <span class="icon" slot="editNode">编辑</span> -->
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
    </div>
  </div>
</template>
<script>
import { VueTreeList, Tree, TreeNode } from "vue-tree-list";
import statustable from "./statustable";
import factory from "./factory";
import {get} from "@/apis/restUtils";

const customerModel = () => import("./customerInfoModal.vue");

export default {
  components: {
    VueTreeList,
    statustable,
    factory
  },
  data() {
    return {
      factory: false,
      statustable: true,
      dateChoose: "", //table选择开始结束时间
      currentPage: 1, //分页当前页数,
      treeParam: {},
      newTree: {},
      data: new Tree([
        {
          name: "按客户分类",
          id: 1,
          pid: 0,
          addLeafNodeDisabled: true,
          dragDisabled: true, // 是否可拖动
          children: [
            {
              name: "重要客户",
              id: 2,
              isLeaf: false,
              addLeafNodeDisabled: true,
              dragDisabled: true,
              pid: 3,
              children: [
                {
                  name: "客户1",
                  id: 4,
                  isLeaf: false,
                  dragDisabled: true,
                  addLeafNodeDisabled: true,
                  pid: 5,
                  children: [
                    {
                      name: "南京工厂",
                      id: 6,
                      isLeaf: false,
                      dragDisabled: true,
                      addLeafNodeDisabled: true,
                      pid: 7,
                      children: [
                        {
                          name: "车间1",
                          id: 8,
                          isLeaf: false,
                          dragDisabled: true,
                          addLeafNodeDisabled: true,
                          pid: 9,
                          children: [
                            {
                              name: "生产线1",
                              id: 10,
                              isLeaf: false,
                              addLeafNodeDisabled: true,
                              pid: 11,
                              children: [
                                {
                                  name: "机床1",
                                  id: 12,
                                  isLeaf: false,
                                  addLeafNodeDisabled: true,
                                  dragDisabled: true,
                                  pid: 13
                                },
                                {
                                  name: "机床2",
                                  id: 14,
                                  isLeaf: false,
                                  addLeafNodeDisabled: true,
                                  dragDisabled: true,
                                  pid: 15
                                }
                              ]
                            },
                            {
                              name: "生产线2",
                              id: 20,
                              isLeaf: false,
                              addLeafNodeDisabled: true,
                              dragDisabled: true,
                              pid: 21
                            }
                          ]
                        },
                        {
                          name: "车间2",
                          id: 22,
                          isLeaf: false,
                          addLeafNodeDisabled: true,
                          dragDisabled: true,
                          pid: 23
                        }
                      ]
                    },
                    {
                      name: "北京工厂",
                      id: 24,
                      isLeaf: false,
                      addLeafNodeDisabled: true,
                      dragDisabled: true,
                      pid: 25
                    }
                  ]
                },
                {
                  name: "客户2",
                  id: 26,
                  isLeaf: false,
                  addLeafNodeDisabled: true,
                  dragDisabled: true,
                  pid: 27
                }
              ]
            },
            {
              name: "一般客户",
              id: 28,
              isLeaf: false,
              addLeafNodeDisabled: true,
              dragDisabled: true,
              pid: 29
            }
          ]
        },
        {
          name: "按区域分类",
          id: 30,
          pid: 31,
          dragDisabled: true,
          addLeafNodeDisabled: false,
          children: [
            {
              name: "西北办事处",
              id: 32,
              isLeaf: false,
              addLeafNodeDisabled: true,
              dragDisabled: true,
              pid: 33,
              children: [
                {
                  name: "四川1",
                  id: 34,
                  isLeaf: false,
                  addLeafNodeDisabled: true,
                  dragDisabled: true,
                  pid: 35,
                  children: [
                    {
                      name: "客户1",
                      id: 36,
                      isLeaf: false,
                      addLeafNodeDisabled: true,
                      dragDisabled: true,
                      pid: 37,
                      children: [
                        {
                          name: "某某工厂1",
                          id: 38,
                          isLeaf: false,
                          addLeafNodeDisabled: true,
                          dragDisabled: true,
                          pid: 39,
                          children: [
                            {
                              name: "生成线1",
                              id: 40,
                              isLeaf: false,
                              addLeafNodeDisabled: true,
                              dragDisabled: true,
                              pid: 41,
                              children: [
                                {
                                  name: "机床1",
                                  id: 42,
                                  isLeaf: false,
                                  addLeafNodeDisabled: true,
                                  dragDisabled: true,
                                  pid: 43
                                },
                                {
                                  name: "机床2",
                                  id: 44,
                                  isLeaf: false,
                                  addLeafNodeDisabled: true,
                                  dragDisabled: true,
                                  pid: 45
                                },
                                {
                                  name: "机床3",
                                  id: 46,
                                  isLeaf: false,
                                  addLeafNodeDisabled: true,
                                  dragDisabled: true,
                                  pid: 47
                                }
                              ]
                            },
                            {
                              name: "生成线2",
                              id: 48,
                              isLeaf: false,
                              addLeafNodeDisabled: true,
                              dragDisabled: true,
                              pid: 49
                            },
                            {
                              name: "生成线13",
                              id: 50,
                              isLeaf: false,
                              addLeafNodeDisabled: true,
                              dragDisabled: true,
                              pid: 51
                            }
                          ]
                        },
                        {
                          name: "某某工厂2",
                          id: 52,
                          isLeaf: false,
                          addLeafNodeDisabled: true,
                          dragDisabled: true,
                          pid: 53
                        },
                        {
                          name: "某某工厂3",
                          id: 54,
                          isLeaf: false,
                          addLeafNodeDisabled: true,
                          dragDisabled: true,
                          pid: 55
                        }
                      ]
                    },
                    {
                      name: "客户2",
                      id: 56,
                      isLeaf: false,
                      addLeafNodeDisabled: true,
                      dragDisabled: true,
                      pid: 57
                    },
                    {
                      name: "客户3",
                      id: 58,
                      isLeaf: false,
                      addLeafNodeDisabled: true,
                      dragDisabled: true,
                      pid: 59
                    }
                  ]
                },
                {
                  name: "湖南",
                  id: 60,
                  isLeaf: false,
                  addLeafNodeDisabled: true,
                  dragDisabled: true,
                  pid: 61
                },
                {
                  name: "重新",
                  id: 62,
                  isLeaf: false,
                  addLeafNodeDisabled: true,
                  dragDisabled: true,
                  pid: 63
                }
              ]
            },
            {
              name: "华北办事处",
              id: 64,
              isLeaf: false,
              addLeafNodeDisabled: true,
              dragDisabled: true,
              pid: 65
            },
            {
              name: "东北办事处",
              id: 66,
              isLeaf: false,
              addLeafNodeDisabled: true,
              dragDisabled: true,
              pid: 67
            }
          ]
        }
      ])
    };
  },
  methods: {
    // 删除节点	树节点
    onDel(node) {
      console.log(node, "onDel");
      node.remove();
    },
    // 更换名字	{'id'，'oldName'，'newName'}
    onChangeName(params) {
      console.log(params, "onChangeName");
    },
    // 添加节点	树节点
    onAddNode(params) {
      console.log(params, "onAddNode");
      this.$Modal.confirm({
          title: '客户列表',
          render: (h) => {
            return h(customerModel, {
              ref: 'customerModel',
              on:{
                showInfo:(name) =>{
                  alert(" parent: " + name);
                  // change nodename
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
            
          }
        });
    },
    // tree节点点击事件
    onClick(params) {
      console.log(params, "onClick");
      // if(params.name.substring(0,2)=="机床"){

      // }
      this.treeParam = params;
      get("/organization/customer/getFirstCustomer", reponse => {
        this.$refs.statustable.content = reponse.data;
        console.log(this.$refs.statustable.content)
      });  
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

