<template>
  <div class="div-login">
    <img src="@/assets/login.jpg" class="bg-login" @load="bgLogin">
    <transition name="fade">
      <el-form label-width="80px" :model="form" class="message-form" v-show="show" :rules="loginRules" status-icon
        ref="login">
        <el-form-item label="账号" prop="account" ref="account">
          <el-input v-model.trim="form.account" placeholder="请输入账号" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord" ref="passWord">
          <el-input v-model.trim="form.passWord" placeholder="请输入密码" auto-complete="off" show-password
          @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model.trim="form.savePassword" class="float-left">记住密码</el-checkbox>
          <p class="float-right forget-password pointer">忘记密码？</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="float-left ele-button" @click="login" :loading="isLoading">登陆</el-button>
          <el-button type="primary" plain class="float-right ele-button" @click="registered">注册</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </div>
</template>
<script>
  import {
    post
  } from '@/components/post.js'
  export default {
    name: 'App',
    beforeMount() {
      console.log(this.locale)
      if (localStorage.getItem("account")) {
        this.form.account = localStorage.getItem("account")
      }
      if (localStorage.getItem("passWord")) {
        this.form.passWord = localStorage.getItem("passWord")
        this.form.savePassword = true
      }
    },
    data() {
      var accountPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var passWordPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        form: {
          account: "",
          passWord: "",
          savePassword: false
        },
        loginRules: {
          account: [{
            validator: accountPass,
            trigger: 'blur'
          }],
          passWord: [{
            validator: passWordPass,
            trigger: 'blur'
          }],
        },
        isLoading: false,
        show: false
      }
    },
    methods: {
      bgLogin() {
        let self = this
        setTimeout(() => {
          self.show = true;
        }, 500);
      },
      login() {
        this.$refs.login.validate((valid) => {
          if (valid) {
            this.loginPost()
          } else {
            this.$message({
              showClose: true,
              message: '请填写账号或密码！！！',
              type: 'error'
            });
            return false;
          }
        });

      },
      async loginPost() {
        this.isLoading = true;
        let res = await post("userLogin", this.form);
        this.isLoading = false
        if (res.resData.accountId == "") {
          this.$message({
            showClose: true,
            message: "账号或密码错误！",
            type: 'error'
          });
          this.$refs.login.clearValidate()
        } else if (res.resData.accountType == 0) {
            this.$message({
            showClose: true,
            message: "账号禁用中！",
            type: 'error'
            });
            this.$refs.login.clearValidate()
        } else if (res.resData.accountType == 2) {
            this.$message({
            showClose: true,
            message: "账号申请中！",
            type: 'warning'
            });
            this.$refs.login.clearValidate()
        } else if (res.resData.accountType == 3) {
            this.$message({
            showClose: true,
            message: "账号申请失败！",
            type: 'error'
            });
            this.$refs.login.clearValidate()
        } else if (res.resData.accountType == 1){
          this.$message({
            showClose: true,
            message: '登陆成功！',
            type: 'success'
          });
          localStorage.setItem("account", this.form.account)
          if (this.form.savePassword) {
            localStorage.setItem("passWord", this.form.passWord)
          } else {
            localStorage.removeItem("passWord")
          }
          document.cookie="accountId="
          document.cookie="accountId="+res.resData.accountId
          setTimeout(() => {
            window.location.replace("./userinterface.html")
            // window.location.replace("./administrator.html")
          }, 1000);
        }else{
          this.$refs.login.clearValidate()
           this.$message({
           showClose: true,
           message: '有问题的账号',
           type: 'error'
           });
        }
      },
      registered() {
        window.location.href = "./registered.html"
      }
    }
  }

</script>
<style lang="less" scoped>
  .div-login {
    width: 100%;
    height: 100%;
    position: relative;

    .bg-login {
      width: 100%;
      height: 100%;
    }

    .message-form {
      width: 450px;
      padding-right: 60px;
      padding-top: 40px;
      box-sizing: border-box;
      position: absolute;
      right: 200px;
      top: 120px;
      height: 300px;
      background: #fff;
      border-radius: 8px;
      background-image: linear-gradient(-180deg, #fff, #f4f4f4);
      box-shadow: 2px 2px 5px rgba(0, 0, 0, .1), -2px -2px 5px rgba(0, 0, 0, .1);
    }

    .forget-password {
      color: #3182d9;
    }

    .ele-button {
      width: 100px;

    }
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
    transform: translateY(-80px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s;
  }

</style>
