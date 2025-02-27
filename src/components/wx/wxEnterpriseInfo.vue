<template>
  <div class="page-c">
    <h2>企业信息</h2>

    <!-- 查看模式 -->
    <div v-if="!isEditing">
      <div v-for="(value, key) in enterpriseAttrs" :key="key" class="attr-row">
        <span>{{ key }}: {{ value }}</span>
      </div>
      <button @click="startEditing">编辑</button>
    </div>

    <!-- 编辑模式 -->
    <div v-else>
      <div v-for="(value, key) in enterpriseAttrs" :key="key" class="attr-row">
        <span>{{ key }}: </span>
        <input v-model="enterpriseAttrs[key]" placeholder="请输入" />
      </div>

      <!-- 增加属性按钮 -->
      <button @click="openAttrDialog">增加属性</button>

      <!-- 属性选择对话框 -->
      <div v-if="showAttrDialog" class="dialog">
        <div v-for="attr in availableAttrs" :key="attr" @click="addAttr(attr)" class="dialog-item">
          {{ attr }}
        </div>
      </div>

      <!-- 提交和取消按钮 -->
      <button @click="submitAttrs">提交</button>
      <button @click="cancelEditing">取消</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      enterpriseAttrs: {}, // 企业属性
      isEditing: false, // 是否编辑模式
      showAttrDialog: false, // 是否显示属性对话框
      availableAttrs: [], // 可用的属性列表
      originalAttrs: {}, // 保存编辑前的属性
    };
  },
  mounted() {
    const enterpriseId = this.$route.query.enterpriseId; // 从路由获取企业ID
    this.fetchEnterpriseAttrs(enterpriseId);
  },
  methods: {
    // 获取企业属性
    async fetchEnterpriseAttrs(enterpriseId) {
      try {
        const response = await axios.get(`/api/enterprises/${enterpriseId}/attrs`);
        this.enterpriseAttrs = response.data;
        this.originalAttrs = { ...response.data }; // 保存原始数据
      } catch (error) {
        console.error('获取企业属性失败:', error);
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
          const response = await axios.get('/api/attrs'); // 请求可用属性
          this.availableAttrs = response.data;
        } catch (error) {
          console.error('获取可用属性失败:', error);
        }
      }
      this.showAttrDialog = true;
    },

    // 增加新属性
    addAttr(attr) {
      if (!this.enterpriseAttrs[attr]) {
        this.enterpriseAttrs[attr] = ''; // 新增属性，值为空
      }
      this.showAttrDialog = false;
    },

    // 提交属性更新
    async submitAttrs() {
      try {
        const enterpriseId = this.$route.query.enterpriseId;
        await axios.put(`/api/enterprises/${enterpriseId}/attrs`, this.enterpriseAttrs);
        this.isEditing = false;
        this.originalAttrs = { ...this.enterpriseAttrs }; // 更新原始数据
      } catch (error) {
        console.error('更新企业属性失败:', error);
      }
    },

    // 取消编辑
    cancelEditing() {
      this.enterpriseAttrs = { ...this.originalAttrs }; // 恢复原始数据
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