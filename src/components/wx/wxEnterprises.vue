<template>
  <div class="enterprise-container">
    <!-- 后退按钮 -->
    <button @click="goBack" class="back-button">后退</button>
    <!-- 企业方框 -->
    <div
        v-for="enterprise in enterprises"
        :key="enterprise.id"
        class="enterprise-box"
        :style="{ backgroundColor: getBackgroundColor(enterprise.type) }"
    >
      <div class="enterprise-name" @click="fetchSubEnterprises(enterprise.id)">
        {{ enterprise.name }}
      </div>
      <div class="arrow" @click="goToPageC(enterprise.id)">→</div>
    </div>
  </div>
</template>

<script>
import { post } from '@/apis/restUtils'; // 导入项目中的 get 方法

export default {
  props: ['province'],
  data() {
    return {
      enterprises: [], // 当前显示的企业列表
      history: [], // 企业层级历史栈
      currentProvince: '', // 当前省份
    };
  },
  mounted() {
    // 从页面A传递的路由参数中获取省份
    this.currentProvince = this.province;
    this.fetchEnterprisesByProvince(this.currentProvince);
  },
  methods: {
    // 根据省份获取企业数据（回调方式）
    fetchEnterprisesByProvince(provinceId) {
      post(`/wx/getEnterprises`,{'provinceId': provinceId},  this.fetchEnterprisesConsumer);
    },
    fetchEnterprisesConsumer(response) {
      if (response && response.data && response.data.entity) {
        this.enterprises = response.data.entity;
      } else {
        console.error('获取企业数据失败: 响应数据格式错误');
      }
    },

    // 根据企业ID获取子公司和关联企业（回调方式）
    fetchSubEnterprises(enterpriseId) {
      this.history.push(enterpriseId); // 记录历史
      post(`/wx/enterprise/getSub`,{'parentId': enterpriseId} , this.fetchSubEnterprisesConsumer);
    },
    fetchSubEnterprisesConsumer(response) {
      if (response && response.data && response.data.entity) {
        this.enterprises = [];
        this.enterprises = response.data.entity;
      } else {
        console.error('获取企业数据失败: 响应数据格式错误');
      }
    },

    // 后退到上一级
    goBack() {
      // if (this.history.length > 0) {
      //   this.history.pop(); // 移除当前层级
      //   if (this.history.length > 0) {
      //     const previousId = this.history[this.history.length - 1];
      //     this.fetchSubEnterprises(previousId);
      //   } else {
      //     this.fetchEnterprisesByProvince(this.currentProvince);
      //   }
      // }
      this.$emit('go-back');
    },

    // 跳转到页面C
    goToPageC(enterpriseId) {
      this.$router.push({
        path: '/page-c',
        query: {enterpriseId}
      });
    },

    // 根据企业类型返回背景颜色
    getBackgroundColor(type) {
      return type === 'subsidiary' ? '#e6f7ff' : '#fffbe6';
    },
  },
};
</script>

<style scoped>
.page-b {
  padding: 20px;
}

.back-button {
  margin-bottom: 10px; /* 与企业方框的间距 */
  padding: 5px 10px; /* 按钮内边距 */
  background-color: #f0f0f0; /* 背景色 */
  border: 1px solid #ccc; /* 边框 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

.enterprise-container {
  display: flex;
  flex-direction: column; /* 垂直排列企业方框 */
  gap: 10px; /* 方框之间的间距 */
  padding: 20px; /* 容器内边距 */
}

.enterprise-box {
  display: flex;
  justify-content: space-between; /* 名称和箭头两端对齐 */
  align-items: center; /* 垂直居中 */
  border: 1px solid #ccc; /* 边框 */
  padding: 10px; /* 内边距 */
  width: 100%; /* 占据整行宽度 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

.enterprise-name {
  flex: 1;
  white-space: normal; /* 支持换行 */
  word-wrap: break-word; /* 长词换行 */
}

.arrow {
  margin-left: 10px;
  font-size: 18px;
  color: #666;
}
</style>