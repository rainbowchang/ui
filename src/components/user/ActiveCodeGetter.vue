<template>
    <div class="layout">
            <Layout :style="{padding: '0 50px'}">
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout :style="{minHeight: '67vh'}">
                         <Table border :columns="columns12" :data="data6">
                            <template slot-scope="{ row }" slot="name">
                                <strong>{{ row.name }}</strong>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                                <Button type="error" size="small" @click="remove(index)">Delete</Button>
                            </template>
                        </Table>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <userManager v-show="showUserManager" ref = "refUserManager"></userManager>
                            <abilityManager v-show="showAbilityManager" ref = "refAbilityManager"></abilityManager>
                             <roleManager v-show="showRoleManager" ref = "RefRoleManager"></roleManager>
                             <activeCodeManager v-show="showActiveCodeManager" ref = "RefActiveCodeManager"></activeCodeManager>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
    </div>
</template>
<script>
    import userManager from "./userManager";
    import roleManager from "./roleManager";
    import abilityManager from "./abilityManager";
    import activeCodeManager from "./activeCodeManager";

    export default {
        components:{userManager, roleManager, abilityManager, activeCodeManager},
        data () {
            return {
                showUserManager: true,
                showAbilityManager: false,
                showRoleManager:false,
                showActiveCodeManager: false
            };
        },
        methods:{
            showComponent(name){
                this.setDefaultValue();
                switch(name){
                  case "userManager":
                     this.showUserManager = true;
                     break;
                  case "abilityManager":
                     this.showAbilityManager = true;
                     break;
                 case "roleManager":
                     this.showRoleManager = true;
                     break;
                 case "activeCodeManager":
                     this.showActiveCodeManager = true;
                     break;
                   default:
                      break;
                }
            },
            setDefaultValue(){
                this.showUserManager = false;
                this.showAbilityManager = false;
                this.showRoleManager = false;
                this.showActiveCodeManager = false;
            },
            showMenu(name){
                this.$router.push(name);
            },
            showDeviceInfo(){
                this.$router.push("equipstatus");
            },
            showMapInfo(){
                this.$router.push("map");
            }

        }

    };
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 50px;
    height: 30px; 
    float: left;
    position: absolute;
    top: 15px;
    left: 10px;
    text-align: left;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    text-align: center;
}
.layout-footer-center{
    text-align: center;
}
</style>