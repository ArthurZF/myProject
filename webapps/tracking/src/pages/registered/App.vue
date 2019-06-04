<template>
  <div class="outs" :style="{ backgroundImage: 'url(' + bg + ')' }">
    <div class="registered-table">
      <el-form
        :model="registeredData"
        ref="registeredData"
        label-width="120px"
        label-suffix="："
        hide-required-asterisk
        status-icon
        label-position="left"
        class="form-box"
        :rules="registeredDataRules"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            v-model.trim="registeredData.account"
            clearable
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            v-model.trim="registeredData.passWord"
            show-password
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="再次确认密码" prop="surePassWorld">
          <el-input
            v-model.trim="registeredData.surePassWorld"
            show-password
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="姓" prop="userFirstName">
          <el-input
            v-model.trim="registeredData.userFirstName"
            clearable
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="名" prop="userLastName">
          <el-input
            v-model.trim="registeredData.userLastName"
            clearable
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model.trim="registeredData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model.trim="registeredData.phone"
            clearable
            type="tel"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registered">注册</el-button>
          <el-button @click="goLogin">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { post } from "@/components/post.js";
export default {
  name: "App",
  data() {
    async function accountPass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        var res = await post("isHasAccount", {
          account: value
        });
        if (res.resData.IsHasAccount == "true") {
          callback();
        } else if (res.resData.IsHasAccount == "false") {
          callback(new Error("账号已被注册，请换一个"));
        } else {
          callback(new Error(res.resMsg));
        }
      }
    }
    var passWordPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var surePassWorldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value != this.registeredData.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var userFirstNamePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓"));
      } else {
        callback();
      }
    };
    var userLastNamePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名"));
      } else {
        callback();
      }
    };
    var phonePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      registeredData: {
        account: "",
        sex: 1,
        passWord: "",
        surePassWorld: "",
        userFirstName: "",
        userLastName: "",
        phone: ""
      },
      registeredDataRules: {
        account: [
          {
            validator: accountPass,
            trigger: "blur"
          }
        ],
        passWord: [
          {
            validator: passWordPass,
            trigger: "blur"
          }
        ],
        surePassWorld: [
          {
            validator: surePassWorldPass,
            trigger: "blur"
          }
        ],
        userFirstName: [
          {
            validator: userFirstNamePass,
            trigger: "blur"
          }
        ],
        userLastName: [
          {
            validator: userLastNamePass,
            trigger: "blur"
          }
        ],
        phone: [
          {
            validator: phonePass,
            trigger: "blur"
          }
        ]
      },
      bg: require("../../assets/login.jpg"),
      loading: ""
    };
  },
  methods: {
    goLogin() {
      window.location.replace("./index.html");
    },
    registered() {
      this.$refs.registeredData.validate(valid => {
        if (valid) {
          this.$loading({
            text: "正在注册中，请稍等",
            spinner: "el-icon-loading"
          });
          this.registeredPost();
        } else {
          this.$message({
            showClose: true,
            message: "请认真填写信息！！！",
            type: "error"
          });
          return false;
        }
      });
    },
    async registeredPost() {
      let res = await post("registeredMsg", this.registeredData);
      this.$loading().close();
      if (res.resCode == 200) {
        this.registeredSuccess();
      } else {
        this.$message({
          showClose: true,
          message: res.resMsg,
          type: "error"
        });
      }
    },
    registeredSuccess() {
      this.$alert(
        "申请已提交，申请结果将以短信方式发送到您填写手机号上",
        "提交成功",
        {
          confirmButtonText: "确定",
          type: "success",
          showClose: false,
          center: true,
          callback: () => {
            window.location.replace("./index.html");
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.outs {
  width: 100%;
  height: 100%;
  background: no-repeat 0 0;
  position: relative;
  background-size: 100%;
  user-select: none;

  .registered-table {
    width: 800px;
    height: 500px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 60px;
    border-radius: 8px;
    background-image: linear-gradient(
      -180deg,
      rgba(255, 255, 255, 0.3),
      rgba(244, 244, 244, 0.8)
    );
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(0, 0, 0, 0.1);
    // overflow: auto;
    padding: 20px;
    box-sizing: border-box;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar {
      width: 12px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    .form-box {
      width: 60%;
      margin: 0 auto;
    }
  }
}
</style>
