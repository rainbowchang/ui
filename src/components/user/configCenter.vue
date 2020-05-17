<template>

    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane" min= "200px">
              <div style="width: 200px">
                  <abilityManager ref="abilityManager"></abilityManager>
              </div>
            
              <!-- <Menu :theme="theme3" active-name="1">
                <MenuItem name="1">
                <Icon type="md-document" />
                用户管理
              </MenuItem>
              <MenuItem name="2">
                <Icon type="md-chatbubbles" />
                角色管理
                </MenuItem>
              </Menu> -->
            </div>
            <div slot="right" class="demo-split-pane">
                <personalUser ref="personalUser"></personalUser>
            </div>
        </Split>
    </div>
</template>
<script>
    import personalUser from "./personalUser"
    import abilityManager from "./abilityManager"

    export default {
       components: {personalUser,abilityManager},
        data () {
            return {
                split1: 0.3
            }
        },
    }
</script>
<style>
    .demo-split{
        height: 80%;
        width: auto;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>
