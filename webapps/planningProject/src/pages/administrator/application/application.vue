<template>
  <div class="table-outs">
    <el-table :data="tableData" border stripe max-height='500' fit show-header highlight-current-row>
      <el-table-column prop="account" label="账号" fixed min-width=150>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" min-width=150>
      </el-table-column>
      <el-table-column label="状态" min-width=100>
        <template slot-scope="scope">
          {{scope.row.accountType==2?'申请中':'申请失败'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width=200 fixed='right'>
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="changeData(scope.row,1)">通过申请</el-button>
          <el-button type="danger" size="mini" @click="changeData(scope.row,3)">拒绝申请</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: "application",
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.getTable()
    },
    methods: {
      async getTable() {
        this.loading = true
        let res = await this.$post("tableSelect", {
          accountId: this.$store.getters.getAccountId,
          type: 2
        });
        console.log(res)
        this.tableData = res.resData;
        this.loading = false;
      },
      async changeData(scope, accountType) {
        let data = {
          accountId: scope.accountId,
          accountType: accountType
        }
        let res = await this.$post("accountChange", data);
        if (res.resData == true) {
          this.$notify.success({
            title: '成功',
            message: res.resMsg,
            duration: 2000
          });
          this.getTable()
        } else {
          this.$notify.error({
            title: '失败',
            message: res.resMsg,
            type: 'success',
            duration: 2000
          });
        }
      },
    }
  }

</script>
