<template>
  <div class="outs">
    <div>
      <ele-calendar :render-content="renderContent" :data="datedef" :prop="prop" v-loading="loading"></ele-calendar>
    </div>
  </div>
</template>
<script>
  import eleCalendar from 'ele-calendar'
  import 'ele-calendar/dist/vue-calendar.css'
  export default {
    name: "mydata",
    data() {
      return {
        datedef: [],
        prop: 'date',
        loading: false
      }
    },
    components: {
      eleCalendar
    },
    beforeMount(){
      this.tableData()
    },
    methods: {
      async tableData() {
        let data = {
          accountId: this.$store.getters.getAccountId
        }
        this.loading = true;
        let res = await this.$post("aimsSelectAll", data);
        this.loading = false;
        this.datedef=res.resData;
      },
      renderContent(h, parmas) {
        let text=''
       this.datedef.forEach(element => {
          if (Date.parse(element.aimsCreateDate)<=Date.parse(parmas.defdate)||parmas.defvalue.type=="today") {
            if (element.aimsDate.indexOf(parmas.defvalue.column==0?7:parmas.defvalue.column)>-1) {
              text+=element.aimsMsg+" \n "
            }
          }
        });
        return ( <div style = "min-height:60px;" > {
            parmas.defvalue.text
          } <div class="text">{text}</div>
          </div>);
        },
      }
    }

</script>
<style lang="less" scoped>
  .outs {
    width: 100%;
    .text{
      white-space: pre;
    }
  }

</style>
