<template>
  <div class="page-d">
    <h3>负责人详情</h3>
    <div v-if="!isEditing">
      <div>{{ staff.name }}</div>
      <div>{{ staff.department }}</div>
      <div>{{ staff.phone }}</div>

      <!-- 查看模式 -->
      <p v-for="(value, index) in staffAttrs" :key="index">
        {{ value.attrName }}: {{ value.attrValue }}
      </p>
      <button @click="startEditing">编辑</button>
    </div>
    <div v-else>
      <!-- 编辑模式 -->
      <div v-for="(value, index) in staffAttrs" :key="index">
        <label>{{ value.attrName }}: </label>
        <input v-model="staffAttrs[index].attrValue" placeholder="请输入"/>
      </div>
      <button @click="openAddAttrDialog">增加属性</button>

      <div v-if="showAddAttrDialog" class="dialog">
        <div v-for="attr in availableAttrs" :key="attr.id" @click="addNewAttr(attr)" class="dialog-item">
          {{ attr.name }}
        </div>
      </div>

      <button @click="submitChanges">提交</button>
      <button @click="cancelEditing">取消</button>
    </div>
    <button @click="$emit('go-back')">返回</button>
    <!-- 属性选择对话框 -->

  </div>
</template>

<script>
import {post} from "@/apis/restUtils";

export default {
  props: ['staffId'], // 从主页面接收负责人ID
  data() {
    return {
      staff: {},
      staffAttrs: {}, // 负责人属性
      isEditing: false, // 是否处于编辑模式
      originalAttrs: {}, // 用于取消编辑时恢复原始数据
      showAddAttrDialog: false, // 是否显示增加属性对话框
      availableAttrs: [], // 可用的属性列表
      newAttrName: '' // 新属性的名称
    };
  },
  mounted() {
    this.fetchStaffInfo(this.staffId); // 页面加载时获取负责人详情
  },
  methods: {
    fetchStaffInfo(staffId) {
      // 通过 API 获取负责人详情
      post(`/wx/enterpriseStaff/info`, {'staffId': staffId}, this.fetchStaffInfoConsumer);
    },
    fetchStaffInfoConsumer(response) {
      if (response && response.data && response.data.entity) {
        this.staff = response.data.entity.staff;
        this.staffAttrs = response.data.entity.staffAttrs; // 更新负责人属性
        this.availableAttrs = response.data.entity.attrs;
        this.originalAttrs = {...response.data}; // 备份原始数据
      } else {
        console.error('获取负责人详情失败');
      }
    },
    startEditing() {
      this.isEditing = true; // 进入编辑模式
      // this.fetchAvailableAttrs(); // 获取可用的属性列表
    },
    // fetchAvailableAttrs() {
    //   // 假设从后端获取可用的属性列表
    //   post('/api/attrs', (response) => {
    //     if (response && response.data) {
    //       this.availableAttrs = response.data;
    //     }
    //   });
    // },
    // openAddAttrDialog() {
    //   this.showAddAttrDialog = true; // 打开对话框
    // },
    async openAddAttrDialog() {
      if (!this.availableAttrs.length) {
        try {
          const response = await post('/api/attrs'); // 请求可用属性
          this.availableAttrs = response.data;
        } catch (error) {
          console.error('获取可用属性失败:', error);
        }
      }
      this.showAddAttrDialog = true;
    },
    addNewAttr(attr) {
      if (!this.hasAttr(attr)) {
        let item = {};
        item.attrName = attr.name;
        item.attrType = attr.type;
        item.attrId = attr.id;
        item.attrValue = '';
        this.staffAttrs.push(item); // 新增属性，值为空
      }
      console.log(this.staffAttrs);
      this.showAddAttrDialog = false;
    },
    hasAttr(attr) {
      let found = false;
      this.staffAttrs.forEach((item) => {
        if (item.attrId === attr.id) {
          found = true;
        }
      });
      return found;
    },
    submitChanges() {
      // 提交更改到后端
      post(`/wx/enterpriseStaff/saveAttrs`, {'staffId': this.staffId, 'attrs': this.staffAttrs}, this.submitConsumer);
    },
    submitConsumer(response) {
      if (response && response.success) {
        this.isEditing = false; // 提交成功后退出编辑模式
        this.originalAttrs = {...this.staffAttrs}; // 更新备份数据
      } else {
        console.error('更新负责人信息失败');
      }
    },
    cancelEditing() {
      // 取消编辑，恢复原始数据
      this.staffAttrs = {...this.originalAttrs};
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.page-d {
  padding: 20px;
  font-size: 16px;
}

p, div {
  margin: 10px 0;
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
  margin-right: 10px;
}

label {
  display: inline-block;
  width: 100px;
}

input {
  padding: 5px;
}
</style>