<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="名称">
      <Input v-model="formItem.name" placeholder="..."/>
    </FormItem>
    <FormItem label="类型">
      <!--      <Input v-model="formItem.name" placeholder="..."/>-->
      <el-select v-model="formItem.type" filterable clearable placeholder="..." style="width: 100%">
        <el-option v-for="item in orgTypeList" :key="item.id" :label="item.typeName" :value="item.id">
          <span style="float: left">{{ item.typeName }}</span>
        </el-option>
      </el-select>
    </FormItem>
    <FormItem label="地址（位置）">
      <Input v-model="formItem.location" placeholder="..."/>
    </FormItem>
  </Form>
</template>

<script>
import {get} from "@/apis/restUtils";

export default {
  name: "editOrganizationModal",
  data() {
    return {
      formItem: {
        name: "",
        type: "",
        location: "",
      },
      orgTypeList: []
    }
  },
  props: ['row'],
  mounted: function () {
    console.log("this.row: ", this.row);
    this.formItem = this.row;
    get("/organization/getSubLevelNodeOrgType?parentOrgId=" + this.row.parentId, reponse => {
      console.log("reponse.data: ", reponse.data);
      this.orgTypeList = reponse.data;
    });

  },
  methods: {}
}
</script>

<style scoped>

</style>