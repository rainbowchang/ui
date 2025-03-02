<template>
  <div>
    <h3>负责人详情</h3>
    <div v-if="!isEditing">
      <div>{{staff.name}} </div>
      <div>{{staff.department}} </div>
      <div>{{staff.phone}} </div>

      <!-- 查看模式 -->
      <p v-for="(value, key) in staffAttrs" :key="key">
        {{ value.attrName }}: {{ value.attrValue }}
      </p>
      <button @click="startEditing">编辑</button>
    </div>
    <div v-else>
      <!-- 编辑模式 -->
      <div v-for="(value, index) in staffAttrs" :key="index">
        <label>{{ index }} {{ value.attrName }}: </label>
        <input v-model="staffAttrs[index].attrValue" placeholder="请输入"/>
      </div>
      <button @click="submitChanges">提交</button>
      <button @click="cancelEditing">取消</button>
    </div>
    <button @click="$emit('go-back')">返回</button>
  </div>
</template>

<script>
import {post} from "@/apis/restUtils";

export default {
  props: ['staffId'], // 从主页面接收负责人ID
  data() {
    return {
      staff:{},
      staffAttrs: {}, // 负责人属性
      isEditing: false, // 是否处于编辑模式
      originalAttrs: {} // 用于取消编辑时恢复原始数据
    };
  },
  mounted() {
    this.fetchStaffInfo(this.staffId); // 页面加载时获取负责人详情
  },
  methods: {
    fetchStaffInfo(staffId) {
      // 通过 API 获取负责人详情
      post(`/wx/enterpriseStaff/info`,{'staffId': staffId}, this.fetchStaffInfoConsumer);
    },
    fetchStaffInfoConsumer(response) {
      if (response && response.data && response.data.entity) {
        this.staff = response.data.entity.staff;
        this.staffAttrs = response.data.entity.staffAttrs; // 更新负责人属性
        this.originalAttrs = { ...response.data }; // 备份原始数据
      } else {
        console.error('获取负责人详情失败');
      }
    },
    startEditing() {
      this.isEditing = true; // 进入编辑模式
    },
    submitChanges() {
      // 提交更改到后端
      post(`/api/staff/${this.staffId}`, this.staffAttrs, this.submitConsumer);
    },
    submitConsumer(response) {
      if (response && response.success) {
        this.isEditing = false; // 提交成功后退出编辑模式
        this.originalAttrs = { ...this.staffAttrs }; // 更新备份数据
      } else {
        console.error('更新负责人信息失败');
      }
    },
    cancelEditing() {
      // 取消编辑，恢复原始数据
      this.staffAttrs = { ...this.originalAttrs };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
p, div {
  margin: 10px 0;
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