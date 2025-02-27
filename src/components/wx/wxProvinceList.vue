<template>
  <div class="province-container">
    <div
        v-for="province in provinces"
        :key="province.id"
        class="province-box"
        @click="selectProvince(province.id)"
    >
      {{ province.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['provinces'], // 接收从 MainPage 传递的省份数据
  methods: {
    selectProvince(provinceId) {
      this.$emit('select-province', provinceId); // 触发事件通知 MainPage
    }
  }
};
</script>

<style scoped>
.province-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  padding: 20px;
}

.province-box {
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.province-box:hover {
  background-color: #f0f0f0;
}
</style>