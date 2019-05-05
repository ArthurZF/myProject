<template>
  <div class="outs">
    <el-menu :default-active="$route.path" mode="horizontal" background-color="#545c64" @select="handleSelect" router
      active-text-color="#ffd04b">
      <el-menu-item index="/mydata">我的日历</el-menu-item>
      <el-menu-item index="/addthing">添加事件</el-menu-item>
      <div class="admin-hello flex flex-align-center float-right">
        <p class="pointer" @click="goAdmin" v-show="isManage">进入管理界面</p>
        <p class="pointer" @click="goIndex">退出</p>
      </div>
      <div class="user flex flex-align-center float-right">
        <p>尊敬的 {{userName}} {{sex==1?'先生 ':'女士 '}} 今天是{{nowData}}</p>
      </div>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: "interfaces",
    data() {
      return {
        userName: "",
        isManage: false,
        nowData: "",
        sex: ""
      }
    },
    beforeMount() {
      this.dispatchAccount();
      this.getName();
      this.getTime()
    },
    methods: {
      getTime() {
        let self = this
        self.nowData = new Date().toLocaleString().replace(/:\d{1,2}$/, ' ')
        setInterval(() => {
          self.nowData = ""
          self.nowData = new Date().toLocaleString().replace(/:\d{1,2}$/, ' ')
        }, 59 * 1000);
      },
      handleSelect(key) {
        console.log(key);
      },
      goAdmin() {
        window.location.replace("./administrator.html")
      },
      goIndex() {
        window.location.replace("./index.html")
      },
      dispatchAccount() {
        this.$store.commit('changeAccountId', document.cookie.split("=")[1])
      },
      async getName() {
        let res = await this.$post("userName", {
          accountId: this.$store.getters.getAccountId
        });
        this.userName = res.resData.userName;
        this.sex = res.resData.sex;
        this.isManage = Boolean(res.resData.isManage)
        if (res.resData.versionText != '') this.$notify.info({
          title: '版本更新！！！',
          dangerouslyUseHTMLString: true,
          duration: 0,
          message: res.resData.versionText.replace(/a/g, "<br />")
        });
      }
    }
  }

</script>
<style lang="less" scoped>
  .outs {
    width: 1000px;
    margin: 0 auto;

    .admin-hello {
      height: 60px;
      margin-right: 20px;
      font-size: 14px;

      p:first-child {
        color: #ffd04b
      }

      p:last-child {
        margin-left: 30px;
        color: #fff;
      }
    }

    .user {
      height: 60px;
      margin-right: 20px;
      font-size: 14px;

      p {
        color: #ffd04b
      }

    }
  }

</style>
