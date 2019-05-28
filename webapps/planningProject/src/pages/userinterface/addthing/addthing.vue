<template>
  <div class="outs">
    <div class="flex flex-align-center insert">
      <div class="tip">添加目标：</div>
      <el-input v-model.trim="aimsMsg" placeholder="请填写目标名称" class="thing-name" clearable
        @keyup.enter.native="addThing"></el-input>
      <el-button type="primary" @click="addThing" :loading="buttonLoading">添加</el-button>
    </div>
    <div class="flex">
      <el-menu default-active="/addthing/periodic" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b"
        class="menu-outs" @select="menuSelect" router>
        <el-menu-item index="/addthing/periodic">周期性</el-menu-item>
        <el-menu-item index="/addthing/acyclic">非周期性</el-menu-item>
      </el-menu>
       <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: "addthing",
    data() {
      return {
        aimsMsg: "",
        buttonLoading: false,
        dataType: 1
      }
    },
    methods: {
      menuSelect(index) {
        this.dataType = index
      },
      async addThing() {
        this.$root.eventHub.$emit("getTable")
        console.log(this.dataType)
        return
        let data = {
          accountId: this.$store.getters.getAccountId,
          aimsMsg: this.aimsMsg,
          aimsDate: ""
        }
        if (this.aimsMsg == "") {
          this.$message({
            showClose: true,
            message: "请输入目标内容",
            type: 'error'
          });
          return
        }
        this.buttonLoading = true
        let res = await this.$post("aimsInsert", data)
        this.buttonLoading = false
        if (res.resCode == 200) {
          this.$notify.success({
            title: '成功',
            message: "添加成功",
            duration: 2000
          });
          this.aimsMsg = "";
          this.getTable()
        } else {
          this.$message({
            showClose: true,
            message: res.resMsg,
            type: 'error'
          });
        }
      },
     
    }
  }

</script>
<style lang="less" scoped>
  .outs {
    width: 100%;
    .flex{
      padding-top: 20px;
      box-sizing: border-box;
    }
    .thing-name {
      width: 300px;
      margin-right: 10px;
    }

    .insert {
      margin-top: 20px;
    }

    .tip {
      margin-right: 10px;
      font-size: 14px;
    }

    .table {
      width: calc(~'100% - 170px');
      position: relative;
    }

    .select {
      width: 100%;
    }

    .div-box {
      width: 100%;
      min-height: 23px;
    }
    .menu-outs{
      width: 150px;
      height: 300px;
      margin-right: 20px;
    }
    .empty-text{
      font-size: 24px;
      margin-top: 80px;
    }
  }

</style>
