<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="设备序列号">
      <Input v-model="formItem.componentSn" placeholder="..."/>
    </FormItem>
    <FormItem label="机器">
      <el-select v-model="formItem.machinetoolId" filterable clearable placeholder="..." style="width: 100%">
        <el-option v-for="item in machinetoolList"  :key="item.id"  :label="item.alias"  :value="item.id" >
          <span style="float: left">{{ item.alias }}</span>
        </el-option>
      </el-select>
    </FormItem>
    <FormItem label="齿顶圆直径(mm)">
      <Input v-model="formItem.col1" placeholder="..."/>
    </FormItem>
    <FormItem label="总厚(mm)">
      <Input v-model="formItem.col2" placeholder="..."/>
    </FormItem>
    <FormItem label="齿宽(mm)">
      <Input v-model="formItem.col3" placeholder="..."/>
    </FormItem>
    <FormItem label="基准面侧内孔外口直径(mm)">
      <Input v-model="formItem.col4" placeholder="..."/>
    </FormItem>
    <FormItem label="基准面侧内孔内口直径(mm)">
      <Input v-model="formItem.col5" placeholder="..."/>
    </FormItem>
    <FormItem label="非基准面侧内孔外口直径(mm)">
      <Input v-model="formItem.col6" placeholder="..."/>
    </FormItem>
    <FormItem label="非基准面侧内孔内口直径(mm)">
      <Input v-model="formItem.col7" placeholder="..."/>
    </FormItem>
    <FormItem label="内孔中间台阶直径(mm)">
      <Input v-model="formItem.col8" placeholder="..."/>
    </FormItem>
    <FormItem label="内孔中间台阶厚度(mm)">
      <Input v-model="formItem.col9" placeholder="..."/>
    </FormItem>
    <FormItem label="基准面侧内孔深度(mm)">
      <Input v-model="formItem.col10" placeholder="..."/>
    </FormItem>
    <FormItem label="非基准面侧内孔深度(mm)">
      <Input v-model="formItem.col11" placeholder="..."/>
    </FormItem>
  </Form>
</template>
<script>
import {post} from "@/apis/restUtils"
export default {
  data() {
    return {
      formItem: {
        componentSn:'',
        machinetoolId:'',
        col1:'',
        col2:'',
        col3:'',
        col4:'',
        col5:'',
        col6:'',
        col7:'',
        col8:'',
        col9:'',
        col10:'',
        col11:'',
      },
      machinetoolList: [],
    }
  },
  props: ['row'],
  mounted: function() {
    console.log("deviceInfo:", this.row)
    this.formItem = this.row;
    post("/plcInfo/getDeviceInfo", {}, response => {
      this.machinetoolList = response.data;
    });
  },
  methods: {

  }
}
</script>