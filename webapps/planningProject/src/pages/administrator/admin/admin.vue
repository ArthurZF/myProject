<template>
  <div class="outs">
    <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b" router>
      <el-menu-item index="/account">账号管理</el-menu-item>
      <el-menu-item index="/application">申请管理</el-menu-item>
      <div class="admin-hello flex flex-align-center float-right">
        <p>欢迎登录，{{adminName}}管理员大人！</p>
        <p class="pointer" @click="goUser">返回日常</p>
        <p class="pointer" @click="goIndex">退出</p>
      </div>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: "Admin",
    data() {
      return {
        adminName:""
      }
    },
    beforeMount(){
      this.dispatchAccount();
      this.getName();
    },
    methods: {
      handleSelect(key) {
        console.log(key);
      },
      goIndex() {
        window.location.replace("./index.html")
      },
      dispatchAccount(){
        this.$store.commit('changeAccountId',document.cookie.split("=")[1])
      },
      async getName(){
         let res=await this.$post("userName",{ accountId:this.$store.getters.getAccountId});
        this.adminName=res.resData.userName
      },
      goUser(){
          window.location.replace("./userinterface.html")
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
      p:nth-of-type(2){
        margin-left: 10px;
        color: #fff;
      }
      p:last-child {
        margin-left: 10px;
        color: #fff;
      }
    }
  }

</style>
<style>
  .table-outs {
    width: 100%;
    height: 500px;
    margin-top: 30px;
  }

  .form-outs {
    width: 60%;
    margin-left: 40px;
  }

  .check-input {
    width: 140px;
  }

  .check-img {
    width: 100px;
    border: 1px solid #C0C4CC;
    border-radius: 4px;
    box-sizing: border-box;
    margin-left: 50px;
    user-select: none;
    letter-spacing: 10px;
    text-indent: 10px;
  }

</style>
