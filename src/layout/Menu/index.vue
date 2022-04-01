<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu default-active="1"
               class="el-menu-vertical-demo"
               active-text-color="#fce38a"
               background-color="#5da0a2"
               router>
        <el-menu-item :index="'/home/homepage'">
          <el-icon>
            <location />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item :index="'/home/application'"
                      @click="handleOpen">
          <el-icon>
            <document />
          </el-icon>
          <span>景区信息管理</span>
        </el-menu-item>
        <el-menu-item :index="'/home/users'"
                      @click="handleOpen">
          <el-icon>
            <document />
          </el-icon>
          <span>用户信息管理</span>
        </el-menu-item>
        <el-menu-item :index="'/home/set'">
          <el-icon>
            <setting />
          </el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
