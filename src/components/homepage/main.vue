<template>
    <div>
      <div>
          <!-- 相关api参考 https://www.npmjs.com/package/vue-tree-list -->
          <!-- 演示地址 http://paradeto.com/vue-tree-list/ -->
          <button @click="addNode">新增一级类目</button>
          <vue-tree-list
            @click="onClick"
            @change-name="onChangeName"
            @delete-node="onDel"
            @add-node="onAddNode"
            :model="data"
            default-tree-node-name="new node"
            default-leaf-node-name="new leaf"
            v-bind:default-expanded="true">
            <!-- <span class="icon" slot="addTreeNode">新增</span> -->
            <!-- <span class="icon" slot="addLeafNode">新增文件</span> -->
            <!-- <span class="icon" slot="editNode">编辑</span> -->
            <!-- <span class="icon" slot="delNode">删除</span> -->
          </vue-tree-list>
          <!-- <button @click="getNewTree">Get new tree</button> -->
      </div>
      <div>
      </div>
    </div>
</template>
<script>
  import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
  export default {
    components: {
      VueTreeList,
    },
    data () {
      return {
        treeParam: {},
        newTree: {},
        data: new Tree([
          {
            name: '按客户分类',
            id: 1,
            pid: 0,
            dragDisabled: true,
            addLeafNodeDisabled: true, // 是否显示editNode按钮
            children: [
              {
                name: '重要客户',
                id: 2,
                isLeaf: false,
                addLeafNodeDisabled: true,
                pid: 1,
                children: [
                  {
                    name: '客户1',
                    id: 2,
                    isLeaf: false,
                    addLeafNodeDisabled: true,
                    pid: 1,
                    children: [
                      {
                        name: '南京工厂',
                        id: 2,
                        isLeaf: false,
                        addLeafNodeDisabled: true,
                        pid: 1,
                        children: [
                          {
                            name: '车间1',
                            id: 2,
                            isLeaf: false,
                            addLeafNodeDisabled: true,
                            pid: 1,
                            children: [
                              {
                                name: '生产线1',
                                id: 2,
                                isLeaf: false,
                                addLeafNodeDisabled: true,
                                pid: 1,
                                children: [
                                  {
                                    name: '机床1',
                                    id: 2,
                                    isLeaf: false,
                                    addLeafNodeDisabled: true,
                                    pid: 1
                                  },
                                  {
                                    name: '机床2',
                                    id: 3,
                                    isLeaf: false,
                                    addLeafNodeDisabled: true,
                                    pid: 4
                                  },
                                  {
                                    name: '机床3',
                                    id: 2,
                                    isLeaf: false,
                                    addLeafNodeDisabled: true,
                                    pid: 1
                                  },
                                  {
                                    name: '机床4',
                                    id: 3,
                                    isLeaf: false,
                                    addLeafNodeDisabled: true,
                                    pid: 4
                                  }
                                ]
                              },
                              {
                                name: '生产线2',
                                id: 3,
                                isLeaf: false,
                                addLeafNodeDisabled: true,
                                pid: 4
                              }
                            ]
                          },
                          {
                            name: '车间2',
                            id: 3,
                            isLeaf: false,
                            addLeafNodeDisabled: true,
                            pid: 4
                          }
                        ]
                      },
                      {
                        name: '北京工厂',
                        id: 3,
                        isLeaf: false,
                        addLeafNodeDisabled: true,
                        pid: 4
                      }
                    ]
                  },
                  {
                    name: '客户2',
                    id: 3,
                    isLeaf: false,
                    addLeafNodeDisabled: true,
                    pid: 4
                  }
                ]
              },
              {
                name: '一般客户',
                id: 3,
                isLeaf: false,
                addLeafNodeDisabled: true,
                pid: 4
              }
            ]
          },
          {
            name: '按区域分类',
            id: 3,
            pid: 0,
            dragDisabled: true,
            addLeafNodeDisabled: true,
            children: [
              {
                name: '西北办事处',
                id: 3,
                isLeaf: false,
                addLeafNodeDisabled: true,
                pid: 4,
                children: [
                  {
                    name: '四川1',
                    id: 3,
                    isLeaf: false,
                    addLeafNodeDisabled: true,
                    pid: 4,
                    children: [
                      {
                        name: '客户1',
                        id: 3,
                        isLeaf: false,
                        addLeafNodeDisabled: true,
                        pid: 4,
                        children: [
                          {
                            name: '某某工厂1',
                            id: 3,
                            isLeaf: false,
                            addLeafNodeDisabled: true,
                            pid: 4,
                            children: [
                              {
                                name: '生成线1',
                                id: 3,
                                isLeaf: false,
                                addLeafNodeDisabled: true,
                                pid: 4,
                                children: [
                                  {
                                    name: '机床1',
                                    id: 3,
                                    isLeaf: false,
                                    addLeafNodeDisabled: true,
                                    pid: 4,
                                    
                                  },
                                  {
                                    name: '机床2',
                                    id: 2,
                                    isLeaf: false,
                                    addLeafNodeDisabled: true,
                                    pid: 1
                                  },
                                  {
                                    name: '机床3',
                                    id: 3,
                                    isLeaf: false,
                                    addLeafNodeDisabled: true,
                                    pid: 4
                                  }
                                ]
                              },
                              {
                                name: '生成线2',
                                id: 2,
                                isLeaf: false,
                                addLeafNodeDisabled: true,
                                pid: 1
                              },
                              {
                                name: '生成线13',
                                id: 3,
                                isLeaf: false,
                                addLeafNodeDisabled: true,
                                pid: 4
                              }
                            ]
                          },
                          {
                            name: '某某工厂2',
                            id: 2,
                            isLeaf: false,
                            addLeafNodeDisabled: true,
                            pid: 1
                          },
                          {
                            name: '某某工厂3',
                            id: 3,
                            isLeaf: false,
                            addLeafNodeDisabled: true,
                            pid: 4
                          }
                        ]
                      },
                      {
                        name: '客户2',
                        id: 2,
                        isLeaf: false,
                        addLeafNodeDisabled: true,
                        pid: 1
                      },
                      {
                        name: '客户3',
                        id: 3,
                        isLeaf: false,
                        addLeafNodeDisabled: true,
                        pid: 4
                      }
                    ]
                  },
                  {
                    name: '湖南',
                    id: 2,
                    isLeaf: false,
                    addLeafNodeDisabled: true,
                    pid: 1
                  },
                  {
                    name: '重新',
                    id: 3,
                    isLeaf: false,
                    addLeafNodeDisabled: true,
                    pid: 4
                  }
                ]
              },
              {
                name: '华北办事处',
                id: 2,
                isLeaf: false,
                addLeafNodeDisabled: true,
                pid: 1
              },
              {
                name: '东北办事处',
                id: 3,
                isLeaf: false,
                addLeafNodeDisabled: true,
                pid: 4
              }
            ]
          }
        ])
      }
    },
    methods: {
      addNode () {
        var node = new TreeNode({ name: 'new node', isLeaf: false })
        if (!this.data.children) this.data.children = []
        this.data.addChildren(node)
      },
 
      getNewTree () {
        var vm = this
        function _dfs (oldNode) {
          var newNode = {}
 
          for (var k in oldNode) {
            if (k !== 'children' && k !== 'parent') {
              newNode[k] = oldNode[k]
            }
          }
 
          if (oldNode.children && oldNode.children.length > 0) {
            newNode.children = []
            for (var i = 0, len = oldNode.children.length; i < len; i++) {
              newNode.children.push(_dfs(oldNode.children[i]))
            }
          }
          return newNode
        }
 
        vm.newTree = _dfs(vm.data)
      },
      
    }
  }
</script>
 
<style lang="less" rel="stylesheet/less" scoped>
  .icon {
    &:hover {
      cursor: pointer;
    }
  }
</style>