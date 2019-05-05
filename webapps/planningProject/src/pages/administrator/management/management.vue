<template>
     <div class="outs flex">
         <div class="left-menu">
             <el-menu :default-active="$route.name" router>
               <el-menu-item index="changeCount">
                 修改账号信息
               </el-menu-item>
               <el-menu-item index="changePassword">
                 修改密码
               </el-menu-item>
               <el-menu-item index="changePersonality">
                 修改个性配置
               </el-menu-item>
               <el-menu-item index="/account">
                 返回账号管理
               </el-menu-item>
             </el-menu>
         </div>
         <div class="right-content">
             <router-view></router-view>
         </div>
     </div>
</template>
<script>
export default {
    name:"management"
}
</script>
<style lang="less" scoped>
    .left-menu{
        width: 200px;
        height: 300px;
    }
    .right-content{
        width: calc(~'100% - 200px');
        padding-top: 20px;
    }
</style>
