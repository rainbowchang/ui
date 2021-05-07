<template>
    <div>
        <h1 align="center">添加信息</h1>
        <div>
            <span>节点信息：</span>
            <i-select v-model="nodeContent" style="width:200px" @on-change="nodeTypeSelectCallback">
                <i-option v-for="item in nodeContentList" :key="item.value" :value="item">{{item.label}}
                </i-option>
            </i-select>
        </div>
        <br>
<!--  customerVisible 删  --zch      -->
        <div v-if="customerVisible" style="padding-top: 10px">
            <span>客户列表：</span>
            <i-select :label-in-value="true" v-model="customerId" style="width:200px" @on-change="customerSelectCallback">
                <i-option v-for="item in customerList" :key="item.key" :value="item.key">{{ item.label }}</i-option>
            </i-select>
        </div>
        <br>
        <div v-if="plcVisible">
            <span>机器信息列表：</span>
            <i-select v-model="plcSn" style="width:200px" @on-change="plcSelectCallback">
                <i-option v-for="item in plcList" :key="item.id" :value="item">{{ item.alias }}(sn: {{ item.sn }}) </i-option>
            </i-select>
        </div>
        <br>
        <div>
            <span>节点名称：</span>
            <Input v-model="inputAlias" placeholder="Enter something..." style="width: 300px" @on-blur="inputCallback"/>
        </div>
    </div>
</template>
<script>
import {get, post, OrgTypeCategory, NodeType} from "@/apis/restUtils";

export default {
    name: "customerInfos",
    data() {
        return {
            plcList: [
                {
                    label: 'sn-001'
                },
                {
                    label: 'sn-002'
                },
                {
                    label: 'sn-003'
                }
            ],
            customerList: [
                {
                    key: 1,
                    label: '客户一'
                },
                {
                    key: 2,
                    label: '客户二'
                },
                {
                    key: 3,
                    label: '客户三'
                }
            ],
            nodeContentList: [],
            customerId: '',
            plcSn: '',
            factory: '',
            shop: '',
            productionLine: '',
            inputAlias: "",
            customerVisible: false,
            plcVisible: false,
            factoryVisable: false,
            shopVisable: false,
            productLineVisable: false,
            nodeContent: "other"
        }
    },
    props: ['customerNode', "parentNode"],
    mounted: function () {
        console.log("customerNode", this.customerNode);
        console.log("parenetNode", this.parentNode);
        get('/organization/getSubNodeOrgType', reponse => {
            console.log("Get reply", reponse.status);
            let orgTypes = reponse.data;
            for (let idx in orgTypes) {
                this.nodeContentList.push({
                    value: orgTypes[idx].id,
                    label: orgTypes[idx].typeName,
                    category: orgTypes[idx].category
                })
            }

        })

        // this.customerId = this.customerNode.key;
        // if(this.parentNode.type == "CUSTOMER") {
        //     this.nodeContentList = [
        //         {
        //             value: 'factory',
        //             label: '工厂'
        //         }
        //     ]
        // }else if(this.parentNode.type == "FACTORY") {
        //     this.nodeContentList = [
        //         {
        //             value: 'shop',
        //             label: '车间'
        //         }
        //     ]
        // }else if(this.parentNode.type == "SHOP") {
        //     this.nodeContentList = [
        //         {
        //             value: 'productLine',
        //             label: '生产线',
        //         }
        //     ]
        // }else if(this.parentNode.type == "PRODUCTLINE") {
        //     this.nodeContentList = [
        //         {
        //             value: 'plc',
        //             label: '机器信息'
        //         }
        //     ]
        // }else {
        //     this.nodeContentList = [
        //         {
        //             value: 'customer',
        //             label: '客户信息'
        //         },
        //         {
        //             value: 'other',
        //             label: '自定义'
        //         }
        //     ];
        // }
    },
    methods: {
        nodeTypeSelectCallback(value) {
            console.log("nodeTypeSelectCallback: ", value);

            // switch (value) {
            //     case "customer":
            //         this.customerVisible = true;
            //         this.plcVisible = false;
            //         this.shopVisable = false;
            //         this.productLineVisable = false;
            //         this.plcVisible = false;
            //         this.getRemoteCustomers();
            //         return;
            //     case "plc":
            //         this.plcVisible = true;
            //         this.customerVisible = false;
            //         this.shopVisable = false;
            //         this.productLineVisable = false;
            //         this.customerVisible = false;
            //         this.getRemotePlcs();
            //         return;
            //     case 'factory':
            //         this.factoryVisable = true;
            //         this.shopVisable = false;
            //         this.productLineVisable = false;
            //         this.customerVisible = false;
            //         this.plcVisible = false;
            //         return;
            //     case 'shop':
            //         this.shopVisable = true;
            //         this.factoryVisable = false;
            //         this.productLineVisable = false;
            //         this.customerVisible = false;
            //         this.plcVisible = false;
            //         return;
            //     case 'productLine':
            //         this.productLineVisable = true;
            //         this.shopVisable = false;
            //         this.factoryVisable = false;
            //         this.customerVisible = false;
            //         this.plcVisible = false
            //         return;
            //     case "other":
            //         this.customerVisible = false;
            //         this.plcVisible = false;
            //         this.productLineVisable = false;
            //         this.shopVisable = false;
            //         this.factoryVisable = false;
            //         return;
            //     default:
            //         break;
            // }

            switch (value.category) {
                case OrgTypeCategory.ORGANIZATION:
                    this.plcVisible = false;
                    return;
                case OrgTypeCategory.MACHINETOOL:
                    this.plcVisible = true;
                    this.getRemotePlcs();
                    return;
                default:
                    break;
            }
            return "";
        },
        customerSelectCallback(val) {   //删  --zch
            console.log("customerSelectCallback label:" + val.label + " value:" + val.value)
            let key = val.value;
            let name = val.label;
            if (this.inputAlias != "") {
                name = this.inputAlias;
            } else {
                this.inputAlias = name;
            }
            this.$emit('showInfo', key, name, "CUSTOMER");
        },
        plcSelectCallback(value) {
            console.log("plcSelectCallback value: ", value);
            let key = value.id;
            let name = value.sn;
            if (value.alias != "") {
                name = value.alias;
                this.inputAlias=value.alias;
            }
            // else {
            // }
            this.$emit('showInfo', key, name, NodeType.LEAF);
        },
        inputCallback() {
            console.log("nodeConetent", this.nodeContent, "CustomerId", this.customerId, this.inputAlias);
            console.log("inputCallback", this.plcSn);
            switch (this.nodeContent.category) {
                case OrgTypeCategory.MACHINETOOL:
                    this.$emit('showInfo', this.plcSn.id, this.inputAlias, NodeType.LEAF);
                    break;
                case OrgTypeCategory.ORGANIZATION:
                    this.$emit('showInfo', null, this.inputAlias, this.nodeContent.value);
                    break;
                default:
                    break;
            }

            // switch (this.nodeContent) {
            //     case "customer":
            //         if (this.customerId == "" || this.customerId == null) {
            //             this.$emit('showInfo', this.inputAlias, this.inputAlias, "COMPOSITE");
            //             return;
            //         }
            //         this.$emit('showInfo', this.customerId, this.inputAlias, "CUSTOMER");
            //         break;
            //     case "plc":
            //         if (this.plcSn == "" && this.plcSn == null) {
            //             this.$emit('showInfo', this.inputAlias, this.inputAlias, "COMPOSITE");
            //             return;
            //         }
            //         this.$emit('showInfo', this.plcSn, this.inputAlias, "LEAF");
            //         break;
            //     case "factory":
            //         this.$emit('showInfo', this.customerId + "factory" + this.inputAlias, this.inputAlias, "FACTORY");
            //         break;
            //     case "shop":
            //         this.$emit('showInfo', this.customerId + "shop" + this.inputAlias, this.inputAlias, "SHOP");
            //         break;
            //     case "productLine":
            //         this.$emit('showInfo', this.customerId + "productLine" + this.inputAlias, this.inputAlias, "PRODUCTLINE");
            //         break;
            //     case "other":
            //         this.$emit('showInfo', this.customerId + this.inputAlias, this.inputAlias, "COMPOSITE");
            //         break;
            //     default:
            //         break;
            // }

        },
        getCustomerFeature() {
            var customerBean = {};
            console.log(this.parentNode, "customernNodePara");
            var parent = this.parentNode;
            if (parent == null) {
                return customerBean;
            }
            switch (parent.key) {
                case "一般客户":
                    customerBean.feature = "common";
                    break;
                case "重要客户":
                    customerBean.feature = "important";
                    break;
                default:
                    customerBean.feature = parent.key;
                    break;
            }
            return customerBean;
        },
        getRemoteCustomers() {//TODO 作废  --zch
            // var customerBean = this.getCustomerFeature();
            post("/customer/getCustomerByFeature", this.customerId, response => {
                console.log(response.data, "customerList");
                this.customerList = response.data;
            });
        },
        getRemotePlcs() {
            console.log('customer: ', this.customerNode);
            post("/agent/view/getAllMachinetool", {},response => {
                this.plcList = response.data;
            });
        }
    }
}
</script>
<style scoped>
</style>
