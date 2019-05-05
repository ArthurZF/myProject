<template>
  <div class="table-outs">
    <el-table :data="tableData" border stripe max-height='500' fit show-header highlight-current-row
      element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" v-loading="loading">
      <el-table-column prop="account" label="账号" fixed min-width=150>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" min-width=150>
      </el-table-column>
      <el-table-column label="状态" min-width=100>
        <template slot-scope="scope">
          {{scope.row.accountType==0?'停用':'正常'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width=200 fixed='right'>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goManagement(scope.row)">
            编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;辑
          </el-button>
          <el-button :type="scope.row.accountType==0?'success':'danger'" size="mini" @click="changeData(scope.row)">
            {{scope.row.accountType==0?'恢&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复':'停&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: "account",
    data() {
      return {
        tableData: [],
        loading: false
      }
    },
    beforeMount() {
      this.getTable()
    },
    methods: {
      async changeData(scope) {
        let data = {
          accountId: scope.accountId,
          accountType: scope.accountType == 0 ? 1 : 0
        }
        let res = await this.$post("accountChange", data);
        if (res.resData == true) {
          this.$notify.success({
            title: '成功',
            message: res.resMsg,
            duration:2000
          });
          this.getTable()
        } else {
          this.$notify.error({
            title: '失败',
            message: res.resMsg,
            type: 'success',
            duration:2000
          });
        }
      },
      async getTable() {
        this.loading = true
        let res = await this.$post("tableSelect", {
          accountId: this.$store.getters.getAccountId,
          type: 1
        });
        this.tableData = res.resData;
        this.loading = false;
      },
      goManagement(scope){
         localStorage.setItem("userId",scope.accountId)
         this.$router.replace("/management")
      }
    }
  }

</script>
