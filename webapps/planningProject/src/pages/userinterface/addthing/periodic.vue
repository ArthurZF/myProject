<template>
  <el-table :data="tableData" border stripe max-height='500' fit show-header highlight-current-row
    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" v-loading="tableLoading" class="table"
    :header-cell-style="rowClass">
    <div slot="empty" class="empty-text">暂无数据</div>
    <el-table-column prop="aimsMsg" label="目标" fixed min-width=80>
      <template slot-scope="scope">
        <div v-show="!scope.row.showInput" @click="changeAimsMsg(scope,true)" class="div-box">{{scope.row.aimsMsg}}
        </div>
        <el-input v-model="scope.row.aimsMsg" v-show="scope.row.showInput" @blur="changeAimsMsg(scope,false)">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column prop="aimsDate" label="周期" fixed min-width=150>
      <template slot-scope="scope">
        <div v-show="!scope.row.select" @click="changeInput(scope,true)" class="div-box">{{scope.row.aimsDateChinese}}
        </div>
        <el-select v-model="scope.row.aimsDate" multiple placeholder="请选择周期" class="select" v-show="scope.row.select"
          popper-append-to-body>
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"
            v-show="scope.row.select">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="操作" width=200 fixed='right'>
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="upDataAims(scope)">
          保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存
        </el-button>
        <el-button type="danger" size="mini" @click="deleteAims(scope)">
          删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    name: "periodic",
    data() {
      return {
        tableData: [],
        tableLoading: false,
        options: [{
          name: "周一",
          id: "1"
        }, {
          name: "周二",
          id: "2"
        }, {
          name: "周三",
          id: "3"
        }, {
          name: "周四",
          id: "4"
        }, {
          name: "周五",
          id: "5"
        }, {
          name: "周六",
          id: "6"
        }, {
          name: "周天",
          id: "7"
        }]
      }
    },
    created(){
        let self=this
        this.$root.eventHub.$on("getTable",()=>{
            self.getTable()
        });
    },
    beforeMount() {
        this.getTable()
    },
    methods: {
      async getTable() {
        let data = {
          accountId: this.$store.getters.getAccountId
        }
        this.tableLoading = true;
        let res = await this.$post("aimsSelect", data);
        this.tableLoading = false;
        res.resData.forEach(element => {
          element.aimsDateChinese = this.computeData(element.aimsDate)
          if (element.aimsDate == "") {
            element.aimsDate = []
          } else {
            element.aimsDate = element.aimsDate.split(",");
          }
          element.showInput = false;
          element.select = false;
        });
        this.tableData = res.resData
      },
      async deleteAims(scope) {
        let data = {
          accountId: this.$store.getters.getAccountId,
          aimsId: scope.row.aimsId
        }
        this.tableLoading = true;
        let res = await this.$post("aimsDelete", data);
        this.tableLoading = false;
        if (res.resData) {
          this.$notify.success({
            title: '成功',
            message: "删除成功",
            duration: 2000
          });
          this.aimsMsg = "";
          this.getTable()
        } else {
          this.$message({
            showClose: true,
            message: "删除失败",
            type: 'error'
          });
        }
      },
      async upDataAims(scope) {
        let data = {
          accountId: this.$store.getters.getAccountId,
          aimsMsg: "",
          aimsDate: ""
        }
        data = Object.assign(data, scope.row);
        data.aimsDate = data.aimsDate.join(",");
        this.tableLoading = true;
        let res = await this.$post("aimsUpData", data);
        this.tableLoading = false;
        if (res.resData) {
          this.$notify.success({
            title: '成功',
            message: "保存成功",
            duration: 2000
          });
          this.aimsMsg = "";
          this.getTable()
        } else {
          this.$message({
            showClose: true,
            message: "保存成功",
            type: 'error'
          });
        }
      },
      changeAimsMsg(scope, falge) {
        this.tableData.forEach(element => {
          element.showInput = false;
          element.select = false;
          element.aimsDateChinese = this.computeData(element.aimsDate.join(","))
        });
        scope.row.showInput = falge
      },
      changeInput(scope, falge) {
        this.tableData.forEach(element => {
          element.showInput = false;
          element.select = false;
          element.aimsDateChinese = this.computeData(element.aimsDate.join(","))
        });
        scope.row.select = falge
      },
      computeData(data) {
        console.log(data)
        if (data == null) return ""
        else return data.replace("1", "星期一").replace("2", "星期二").replace("3", "星期三").replace("4", "星期四").replace("5",
            "星期五")
          .replace("6", "星期六").replace("7", "星期天")
      },
      rowClass() {
        return 'background:#f5f5f5'
      }
    }
  }

</script>
<style lang="less" scoped>

</style>
