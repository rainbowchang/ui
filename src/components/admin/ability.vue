<template>
  <div>
      <el-table class="data_table">
      <el-table-column prop="number" label="能力ID" width="150">
      </el-table-column>
      <el-table-column prop="address" label="能力名称" width="150">
      </el-table-column>
      <el-table-column prop="tel" label="能力类型" width="150">
      </el-table-column>
      <el-table-column prop="company" label="能力内容" width="150">
      </el-table-column>
      <el-table-column prop="role" label="描述" width="150">
      </el-table-column>
      <el-table-column prop="action" label="操作" width="150">
      </el-table-column>
    </el-table>
    </div>
  </template>

<script>
  export default {
    name: 'abilityManager',
    data () {
      return {
        showAbility: true
      }
    }
  }
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>