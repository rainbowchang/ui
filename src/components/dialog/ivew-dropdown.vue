<template>
  <div>
    <Dropdown>
        <a href="javascript:void(0)">
            hover 触发
            <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item>驴打滚</Dropdown-item>
            <Dropdown-item>炸酱面</Dropdown-item>
            <Dropdown-item>豆汁儿</Dropdown-item>
            <Dropdown-item>冰糖葫芦</Dropdown-item>
            <Dropdown-item>北京烤鸭</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
    <Dropdown trigger="click" style="margin-left: 20px" @on-click="dohandleOpen">
        <a href="javascript:void(0)">
            click 触发
            <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item name = "lvdagun">驴打滚</Dropdown-item>
            <Dropdown-item name = "zhajianmian">炸酱面</Dropdown-item>
            <Dropdown-item name = "douzhi">豆汁儿</Dropdown-item>
            <Dropdown-item name = "bingtanghulou">冰糖葫芦</Dropdown-item>
            <Dropdown-item name = "beijingkaoya">北京烤鸭</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
    <Dropdown trigger="custom" :visible="visible" style="margin-left: 20px">
        <a href="javascript:void(0)" @click="handleOpen">
            custom 触发
            <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <p>常用于各种自定义下拉内容的场景。</p>
            <div style="text-align: right;margin:10px;">
                <i-button type="primary" @click="handleClose">关闭</i-button>
            </div>
        </Dropdown-menu>
    </Dropdown>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                visible: false
            }
        },
        methods: {
            handleOpen () {
                this.visible = true;
            },
            dohandleOpen (name) {
                alert("name:" + name);
            },
            handleClose () {
                this.visible = false;
            },
            doMore:function(name){
              alert("name:" + this.name);
                if(name=='preview'){
                //do something

                }else if(name=='copy'){
               //do something
              }else{
              //do something
              }
          }
        }
    }
</script>
