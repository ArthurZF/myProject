<template>
 <div class="form-outs">
    <el-form :model="userPassword" ref="userPassword" hide-required-asterisk status-icon label-width="120px"
      label-suffix="："
      label-position="left" :rules="userPasswordDataRules">
      <el-form-item label="新密码" prop="passWord">
        <el-input v-model.trim="userPassword.passWord" placeholder="请输入新密码" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="再次确认密码" prop="surePassWord">
        <el-input v-model.trim="userPassword.surePassWord" placeholder="请输入再次确认密码" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model.trim="userPassword.checkText" placeholder="请输入验证码" clearable class="check-input float-left">
        </el-input>
        <div class="check-img float-left flex flex-align-center flex-just-center">
          1234
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeData">确认</el-button>
        <el-button @click="goAdmin">取消</el-button>
      </el-form-item>
    </el-form>
 </div>
</template>
<script>
  export default {
    name: "changePassword",
    data() {
      var passWordPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var surePassWorldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value != this.userPassword.passWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userPassword: {
          passWord: "",
          surePassWord: "",
          checkText:""
        },
        userPasswordDataRules: {
          passWord: [{
            validator: passWordPass,
            trigger: 'blur'
          }],
          surePassWord: [{
            validator: surePassWorldPass,
            trigger: 'blur'
          }]
        },
      }
    },
    methods:{
      goAdmin(){
        this.$router.replace("/account")
      },
      changeData() {
        this.$refs.userPassword.validate((valid) => {
          if (valid) {
            this.$loading({
              text: "正在修改中，请稍等",
              spinner: "el-icon-loading"
            });
            this.changeDataPost()
          } else {
            this.$message({
              showClose: true,
              message: '请认真填写信息！！！',
              type: 'error'
            });
            return false;
          }
        });
      },
      async changeDataPost(){
        let data = {
          accountId: localStorage.getItem("userId"),
          passWord: this.userPassword.passWord
        }
        let res = await this.$post("passwordChange", data);
        this.$loading().close();
        if (res.resData == true) {
          this.$notify.success({
            title: '成功',
            message: res.resMsg,
            duration:2000
          });
        } else {
          this.$notify.error({
            title: '失败',
            message: res.resMsg,
            type: 'success',
            duration:2000
          });
        }
      },
    }
  }

</script>
