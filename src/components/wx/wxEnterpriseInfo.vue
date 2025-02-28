<template>
  <div class="page-c">
    <h2>企业信息</h2>

    <!-- 查看模式 -->
    <div v-if="!isEditing">
      <div v-for="(value, index) in enterpriseAttrs" :key="index" class="attr-row">
        <span>{{ value.attrName }}: {{ value.attrValue }}</span>
      </div>
      <button @click="startEditing">编辑</button>
    </div>

    <!-- 编辑模式 -->
    <div v-else>
      <div v-for="(value, index) in enterpriseAttrs" :key="index" class="attr-row">
        <span>{{ index }} {{ value.attrName }} </span>
        <input v-model="enterpriseAttrs[index].attrValue" placeholder="请输入"/>
      </div>

      <!-- 增加属性按钮 -->
      <button @click="openAttrDialog">增加属性</button>

      <!-- 属性选择对话框 -->
      <div v-if="showAttrDialog" class="dialog">
        <div v-for="attr in availableAttrs" :key="attr.id" @click="addAttr(attr)" class="dialog-item">
          {{ attr.name }}
        </div>
      </div>

      <!-- 提交和取消按钮 -->
      <button @click="submitAttrs">提交</button>
      <button @click="cancelEditing">取消</button>
    </div>
    <button @click="$emit('go-back')">返回</button>
  </div>
</template>

<script>
import {post} from "@/apis/restUtils";

export default {
  props: ['enterpriseId'],
  data() {
    return {
      enterpriseAttrs: [], // 企业属性
      isEditing: false, // 是否编辑模式
      showAttrDialog: false, // 是否显示属性对话框
      availableAttrs: [], // 可用的属性列表
      originalAttrs: {}, // 保存编辑前的属性
    };
  },
  mounted() {
    // const enterpriseId = this.$route.query.enterpriseId; // 从路由获取企业ID
    this.fetchEnterpriseInfo(this.enterpriseId);
  },
  methods: {
    // 获取企业属性
    fetchEnterpriseInfo(id) {
      // 根据企业ID请求数据
      post(`/wx/enterprise/info`, {'id': id}, this.fetchEnterpriseInfoConsumer);
    },
    fetchEnterpriseInfoConsumer(response) {
      // 处理返回的企业信息
      console.log(response.data);
      if (response && response.data && response.data.entity) {
        this.enterpriseAttrs = response.data.entity.enterpriseAttrs;
        this.availableAttrs = response.data.entity.attrs;
      }
    },

    // 进入编辑模式
    startEditing() {
      this.isEditing = true;
    },

    // 打开属性选择对话框
    async openAttrDialog() {
      if (!this.availableAttrs.length) {
        try {
          const response = await post('/api/attrs'); // 请求可用属性
          this.availableAttrs = response.data;
        } catch (error) {
          console.error('获取可用属性失败:', error);
        }
      }
      this.showAttrDialog = true;
    },

    // 增加新属性
    addAttr(attr) {
      if (!this.hasAttr(attr)) {
        let item = {};
        item.attrName = attr.name;
        item.attrType = attr.type;
        item.attrId = attr.id;
        item.attrValue = '';
        this.enterpriseAttrs.push(item); // 新增属性，值为空
      }
      console.log(this.enterpriseAttrs);
      this.showAttrDialog = false;
    },

    hasAttr(attr) {
      let found = false;
      this.enterpriseAttrs.forEach((item) => {
        if (item.attrId === attr.id) {
          found = true;
        }
      });
      return found;
    },

    // 提交属性更新
    submitAttrs() {
      try {
        post(`/wx/enterprises/saveAttrs`, {
          'enterpriseId': this.enterpriseId,
          'attrs': this.enterpriseAttrs
        }, this.submitAttrsConsumer);
        this.isEditing = false;
        this.originalAttrs = {...this.enterpriseAttrs}; // 更新原始数据
      } catch (error) {
        console.error('更新企业属性失败:', error);
      }
    },
    submitAttrsConsumer(response) {
      if (response && response.data && response.data.status === 'success') {
        console.log('更新企业属性成功');
      } else {
        console.error('更新企业属性失败');
      }
    },

    // 取消编辑
    cancelEditing() {
      this.enterpriseAttrs = {...this.originalAttrs}; // 恢复原始数据
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.page-c {
  padding: 20px;
  font-size: 16px;
}

.attr-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.attr-row span {
  flex: 1;
}

.attr-row input {
  flex: 2;
  padding: 5px;
  border: 1px solid #ccc;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
  z-index: 1000;
}

.dialog-item {
  padding: 10px;
  cursor: pointer;
}

.dialog-item:hover {
  background-color: #f0f0f0;
}

button {
  margin: 5px;
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
</style>