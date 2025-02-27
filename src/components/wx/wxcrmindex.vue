<template>
  <div>
    <component
        :is="currentComponent"
        :provinces="provinces"
        :province="selectedProvince"
        @select-province="handleSelectProvince"
        @go-back="handleGoBack"
    />
  </div>
</template>

<script>
import wxProvinceList from './wxProvinceList.vue';
import wxEnterprises from './wxEnterprises.vue';
import {get} from "@/apis/restUtils";

export default {
  components: {
    wxProvinceList,
    wxEnterprises
  },
  data() {
    return {
      currentComponent: 'wxProvinceList', // 默认显示页面A
      provinces: [], // 存储省份数据
      selectedProvince: '' // 选中的省份
    };
  },
  mounted() {
    this.fetchProvinces(); // 页面加载时请求省份数据
  },
  methods: {
    fetchProvinces() {
      // 假设使用 get 方法获取省份数据
      get('/wx/wxGetProvince', this.fetchProvincesConsumer);
    },
    fetchProvincesConsumer(response) {
      if (response && response.data && response.data.entity) {
        this.provinces = response.data.entity;
      } else {
        console.error('获取省份数据失败: 未知错误');
      }
    },
    handleSelectProvince(provinceId) {
      this.selectedProvince = provinceId;
      this.currentComponent = 'wxEnterprises'; // 切换到页面B
    },
    handleGoBack() {
      this.currentComponent = 'wxProvinceList'; // 返回页面A
    }
  }
};
</script>