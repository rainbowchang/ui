<template>
  <div>
    <component
        :is="currentComponent"
        :provinces="provinces"
        :province="selectedProvince"
        :enterpriseId="selectedEnterpriseId"
        @select-province="handleSelectProvince"
        @select-enterprise="handleSelectEnterprise"
        @go-back="handleGoBack"
    />
  </div>
</template>

<script>
import wxProvinceList from './wxProvinceList.vue';
import wxEnterprises from './wxEnterprises.vue';
import wxEnterpriseInfo from "./wxEnterpriseInfo.vue";
import {get} from "@/apis/restUtils";

export default {
  components: {
    wxProvinceList,
    wxEnterprises,
    wxEnterpriseInfo
  },
  data() {
    return {
      currentComponent: 'wxProvinceList', // 默认显示页面A
      provinces: [], // 存储省份数据
      selectedProvince: '', // 选中的省份
      selectedEnterpriseId: '',
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
    handleSelectEnterprise(enterpriseId){
      this.selectedEnterpriseId = enterpriseId;
      this.currentComponent = 'wxEnterpriseInfo';
    },
    handleGoBack() {
      // this.currentComponent = 'wxProvinceList'; // 返回页面A
      if (this.currentComponent === 'wxEnterpriseInfo') {
        this.currentComponent = 'wxEnterprises'; // 从页面C返回页面B
      } else if (this.currentComponent === 'wxEnterprises') {
        this.currentComponent = 'wxProvinceList'; // 从页面B返回页面A
      }
    }
  }
};
</script>