//客户列表
<template>
  <div class="wrap">
    <!-- 未处理报警报警table -->
    <div class="search">
      <div class="searchinput">
        <Input :style="{width:'180px;'}" search enter-button placeholder="请输入查询内容" />
      </div>
      <Button type="primary" size="large" @click="addcustomer">添加客户</Button>
    </div>
    <div class="content">
      <Table :columns="title" :data="customerlist" size="small" ref="table" :max-height="540">
        <template slot-scope="{ row, index }" slot="details">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="equip(index)">6台|查看</Button>
        </template>
      </Table>
      <!-- page-sizes分页数组，page-size分页当前一页的条数，total总条数 -->
      <el-pagination
        class="pagenum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="customerlist.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>

import restRuler from "../../router/RestRuler"

export default {
  data() {
    return {
      title: [
        {
          title: "客户id",
          key: "customerId",
          width: 280,
          align: "center"
        },
        {
          title: "客户名称",
          key: "name",
          width: 280,
          align: "center"
        },
        {
          title: "所属区域",
          key: "area",
          align: "center"
        },
        {
          title: "客户账号",
          key: "account",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create",
          align: "center"
        },
        {
          title: "客户详情",
          slot: "details",
          align: "center"
        },
        {
          title: "设备列表",
          slot: "action",
          align: "center"
        }
      ],
      customerlist: [
        {
          name: "南京宁庆数控机床制造有限公司",
          area: "西南区域",
          account: "18612345675",
          create: "2019.08.06 20：58",
          details: "一级"
        }
      ],
      currentPage: 1 //分页当前页数,
    };
  },
  mounted: function () {
     var customerPara = this.customerlist;
     restRuler.get("/customer/view",function(data){
         for(var i in data){
            customerPara.push(data[i]);
         }
         // alert("customerList:" +JSON.stringify(customerPara));
     });
  },
  methods: {
    //   分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    show(index) {
      console.log(this.customerlist[index]);
    },
    // 添加客户
    addcustomer() {
      this.$router.push({ path: "addcustomer" });
    },
    //设备列表
    equip(index) {
      this.$router.push({ path: "equipmentlist" });
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.font {
  font-size: 16px;
  font-weight: bold;
  margin-right: 1em;
}
/* 分页 */
.pagenum {
  text-align: center;
  position: absolute;
  bottom: 5em;
}
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
}
.searchinput {
  width: 240px;
  display: flex;
  flex-direction: row;
}

.icon {
  color: red;
  font-size: 16px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal > .ivu-modal {
  top: 0;
}
.disinput {
  background-color: transparent;
  border: 0;
}
.space {
  color: transparent;
}
</style>