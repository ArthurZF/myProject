<template>
  <div class="form-outs">
    <el-form :model="userMsg" ref="userMsg" hide-required-asterisk status-icon label-width="100px" label-suffix="："
      label-position="left" :rules="changeDataRules">
      <el-form-item label="账号" prop="account">
        <el-input v-model.trim="userMsg.account" placeholder="请输入账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓" prop="userFirstName">
        <el-input v-model.trim="userMsg.userFirstName" placeholder="请输入姓" clearable></el-input>
      </el-form-item>
      <el-form-item label="名" prop="userLastName">
        <el-input v-model.trim="userMsg.userLastName" placeholder="请输入名" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model.trim="userMsg.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.trim="userMsg.phone" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否管理员">
        <el-radio-group v-model.trim="userMsg.isManage">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="验证码" prop="checkText">
        <el-input v-model.trim="userMsg.checkText" placeholder="请输入验证码" clearable class="check-input float-left">
        </el-input>
        <div class="check-img float-left flex flex-align-center flex-just-center">
          <!-- {{checkText}} -->
          1234
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeData">确认</el-button>
        <el-button @click="goAdmin()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "changeCount",
    data() {
      var self=this
      async function accountPass(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (self.beforeAccount==value) {
             callback();
            return
          }
          var res = await self.$post("isHasAccount", {
            account: value
          });
          if (res.resData.IsHasAccount=="true") {
            callback();
          } else if(res.resData.IsHasAccount=="false"){
            callback(new Error('账号已被注册，请换一个'));
          }else{
            callback(new Error(res.resMsg));
          }
        }
      }
      var userFirstNamePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓'));
        } else {
          callback();
        }
      };
      var userLastNamePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名'));
        } else {
          callback();
        }
      };
      var phonePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      var checkTextPass = (rule, value, callback) => {
        if (value == ''||value == undefined) {
          callback(new Error('请输入验证码'));
        } else if (value !=self.checkTextImg) {
          callback(new Error('验证码错误'));
        } else {
          callback();
        }
      };
      return {
        userMsg: {},
        beforeAccount:"",
        changeDataRules: {
          account: [{
            validator: accountPass,
            trigger: 'blur'
          }],
          userFirstName: [{
            validator: userFirstNamePass,
            trigger: 'blur'
          }],
          userLastName: [{
            validator: userLastNamePass,
            trigger: 'blur'
          }],
          phone: [{
            validator: phonePass,
            trigger: 'blur'
          }],
          checkText: [{
            validator: checkTextPass,
            trigger: 'blur'
          }]
        },
        checkTextImg:1234
      }
    },
    beforeMount(){
      this.getForm()
    },
    methods:{
      async getForm(){
        let res = await this.$post("accountMsg", {
          accountId: localStorage.getItem("userId")
        });
        this.userMsg=res.resData
        this.beforeAccount=res.resData.account
      },
      changeData() {
        this.$refs.userMsg.validate((valid) => {
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
          userMsg: this.userMsg
        }
        let res = await this.$post("accountMsgChange", data);
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
      goAdmin(){
        this.$router.replace("/account")
      }
    }
  }

</script>
