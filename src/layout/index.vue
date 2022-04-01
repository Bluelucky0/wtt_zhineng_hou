<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'

</script>

<style scoped>
.common-layout {
  width: 100% !important;
  height: 100% !important;
}
.el-container {
  height: 100%;
  width: 100%;
}
.common-layout .el-header {
  background-color: #aacfd0;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.common-layout .el-aside {
  background-color: #5da0a2;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 80px;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-header {
  position: relative;
}
.toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
.avatar {
  padding-right: 10px;
}
</style>
