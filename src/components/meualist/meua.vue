<template>
    <div class="wrapper">
        <Menu
            mode="horizontal"
            :theme="theme1"
            active-name="Homepage"
            class="menu"
            @on-select="selectMenu"
            style="background:#595959;"
        >
            <div class="logo">
                <span>{{abbr}}</span>
<!--                <span style="font-size:4px">®</span>-->
            </div>
            <MenuItem name="/index" :class="index?'red':''">首页</MenuItem>
            <MenuItem name="/equipstatus" :class="equipstatus?'red':''">
                <span>设备状态</span>
            </MenuItem>
            <MenuItem name="/warning" :class="[warning?'red':'', KEYWARN?'':'nodisplay']">
                <span>设备报警</span>
            </MenuItem>
            <MenuItem name="/information" :class="[information?'red':'', KEYEQUINFO?'':'nodisplay']">
                <span>设备信息</span>
            </MenuItem>
            <MenuItem name="/debugging" :class="[debugging?'red':'', KEYDBG?'':'nodisplay']">
                <span>设备运维</span>
            </MenuItem>
            <MenuItem name="/management" :class="[management?'red':'', KEYCUST?'':'nodisplay']">
                <span>客户管理</span>
            </MenuItem>
            <MenuItem name="/history" :class="[history?'red':'', KEYRECHIS?'':'nodisplay']">
                <span>维修记录</span>
            </MenuItem>
            <MenuItem name="/faraway" :class="[faraway?'red':'', KEYRMT?'':'nodisplay']">
                <span>远程操作</span>
            </MenuItem>
            <Submenu name="4" :class="KEYMES?'':'nodisplay'">
                <template slot="title">
                    <span>生产管理</span>
                </template>
                <MenuItem name="/productqualiticate">
                    <span>产品质检</span>
                </MenuItem>
                <MenuItem name="/organizationMgt">
                    <span>组织机构</span>
                </MenuItem>
                <MenuItem name="/roleMgt"  :class="KEYROLE?'':'nodisplay'">
                    <span>用户管理</span>
                </MenuItem>
                <MenuItem name="bigScreen">
                    <span>生产大屏</span>
                </MenuItem>
                <MenuItem name="report">
                    <span>报表</span>
                </MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <span>你好，{{ username }}</span>
                </template>
                <MenuItem name="exit">
                    <span>退出</span>
                </MenuItem>
                <MenuItem name="/personalUser">
                    <span>个人中心</span>
                </MenuItem>
            </Submenu>
        </Menu>
        <div class="viewpage">
            <router-view/>
        </div>
    </div>
</template>

<script>
import {post} from "@/apis/restUtils";

export default {
    name: "Homepage",
    data() {
        return {
            username: localStorage.getItem("UserName"),
            theme1: "primary",
            index: false,
            equipstatus: true,
            warning: false,
            information: false,
            debugging: false,
            management: false,
            history: false,
            faraway: false,
            productqualiticate: false,
            organizationMgt: false,
            roleMgt: false,
            EKYMAP: false,
            KEYEQUSTA: false,
            KEYCONF: false,
            KEYPSN: false,
            KEYMEUA: false,
            KEYEQUINFO: false,
            KEYEQUDTL: false,
            KEYDBG: false,
            KEYWARN: false,
            KEYMES: false,
            KEYRMT: false,
            KEYRECHIS: false,
            KEYQUALI: false,
            KEYCUST: false,
            KEYROLE: false,
            abbr:'',
        };
    },
    methods: {
        allfalse() {
            (this.index = false),
                (this.equipstatus = false),
                (this.warning = false),
                (this.information = false),
                (this.debugging = false),
                (this.management = false),
                (this.history = false),
                (this.faraway = false),
                (this.productqualiticate = false),
                (this.organizationMgt = false),
                (this.roleMgt = false);
        },
        selectMenu(name) {
            if (name === "/index") {
                this.allfalse();
                this.index = true;
            }
            if (name === "/equipstatus") {
                this.allfalse();
                this.equipstatus = true;
            }
            if (name === "/warning") {
                this.allfalse();
                this.warning = true;
            }
            if (name === "/information") {
                this.allfalse();
                this.information = true;
            }
            if (name === "/debugging") {
                this.allfalse();
                this.debugging = true;
            }
            if (name === "/management") {
                this.allfalse();
                this.management = true;
            }
            if (name === "/history") {
                this.allfalse();
                this.history = true;
            }
            if (name === "/faraway") {
                this.allfalse();
                this.faraway = true;
            }
            if (name === "/productqualiticate") {
                this.allfalse();
                this.productqualiticate = true;
            }
            if (name === "/organizationMgt") {
                this.allfalse();
                this.organizationMgt = true;
            }
            if (name === "/roleMgt") {
                this.allfalse();
                this.roleMgt = true;
            }
            if (name === "exit") {
                this.allfalse();
                this.$router.push("/login");
                return;
            }
            if (name === "bigScreen") {
                this.allfalse();
                this.$router.push("/bigScreen");
                return;
            }
            if (name === "report") {
                this.allfalse();
                this.$router.push("/report");
                return;
            }
            this.$router.push(name);
        }
    },
    mounted() {
        this.$router.push("/equipstatus");
        post("/admin/getUserAbilityKey", {}, response => {
            let keys = response.data;
            if (keys.length > 0) {
                console.log("keys:", keys);
                for (let key of keys) {
                    if (key === 'EKYMAP') {
                        this.EKYMAP = true;
                        continue;
                    }
                    if (key === 'KEYEQUSTA') {
                        this.KEYEQUSTA = true;
                        continue;
                    }
                    if (key === 'KEYCONF') {
                        this.KEYCONF = true;
                        continue;
                    }
                    if (key === 'KEYPSN') {
                        this.KEYPSN = true;
                        continue;
                    }
                    if (key === 'KEYMEUA') {
                        this.KEYMEUA = true;
                        continue;
                    }
                    if (key === 'KEYEQUINFO') {
                        this.KEYEQUINFO = true;
                        continue;
                    }
                    if (key === 'KEYEQUDTL') {
                        this.KEYEQUDTL = true;
                        continue;
                    }
                    if (key === 'KEYDBG') {
                        this.KEYDBG = true;
                        continue;
                    }
                    if (key === 'KEYWARN') {
                        this.KEYWARN = true;
                        continue;
                    }
                    if (key === 'KEYMES') {
                        this.KEYMES = true;
                        continue;
                    }
                    if (key === 'KEYRMT') {
                        this.KEYRMT = true;
                        continue;
                    }
                    if (key === 'KEYRECHIS') {
                        this.KEYRECHIS = true;
                        continue;
                    }
                    if (key === 'KEYQUALI') {
                        this.KEYQUALI = true;
                        continue;
                    }
                    if (key === 'KEYCUST') {
                        this.KEYCUST = true;
                        continue;
                    }
                    if (key === 'KEYROLE') {
                        this.KEYROLE = true;
                        continue;
                    }
                }
            }
        });
        post("/user/getCorpAbbr", {}, response => {
            console.log("response ...", response);
            this.abbr = response.data.result;
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.wrapper {
    width: 100vw;
    height: 100vh;
    /* min-height: 768px; */
    min-width: 1024px;
    padding-bottom: 3em;
    background-color: #eff4f7;
}

.menu {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.red {
    background-color: #e93223;
}

.logo {
    color: white;
    cursor: default;
}

.viewpage {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
    height: auto;
}

.icon {
    width: auto;
    height: 1em;
    margin-right: 0.5em;
}

.nodisplay {
    display: none;
}
</style>
