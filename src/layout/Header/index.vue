<template>
  <div class="toolbar">
    <el-dropdown>
      <div class="avatar">
        <AvatarView />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>Tom</span>
  </div>
</template>

<script setup>
import AvatarView from './components/Avatar.vue'
import { storage } from '../../until/token'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
const router = useRouter()
const loginOut = () => {
  ElMessageBox.confirm(
    '确定要退出登录么?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      storage.remove('token')
      router.push('/')
      ElMessage({
        type: 'success',
        message: '退出成功',

      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消',
      })
    })
}



</script>

<style></style>
