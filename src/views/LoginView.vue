<template>
  <div class="container">
    <div class="box">
      <h2>武夷智能推荐网后台管理</h2>
      <div class="form">
        <el-form ref="ruleFormRef"
                 :label-position="labelPosition"
                 :model="ruleForm"
                 status-icon
                 :rules="rules"
                 label-width="60px"
                 class="demo-ruleForm">
          <el-form-item label="用户名"
                        prop="userId">
            <el-input v-model="ruleForm.userId"
                      placeholder="请输入用户名"
                      :prefix-icon="Avatar"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="ruleForm.password"
                      type="password"
                      placeholder="请输入密码"
                      :prefix-icon="Lock"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width: 100%; margin: 40px 0;"
                       @click.prevent="submitForm(ruleFormRef)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { Lock, Avatar } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
//引入接口
import { UserService } from '../api/http'
import request from '../until/request'
//引入token存储
import { storage } from '../until/token'

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

const labelPosition = ref('top')
const ruleForm = reactive({
  userId: '',
  password: '',
})

// 检验用户名
const validateuserId = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    if (value.length < 3 || value.length > 8) {
      callback(new Error('用户长度为3-8位'))
    } else {
      callback()
    }
  }
}
// 检验密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户密码'))
  } else {
    if (ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password', () => null)
    }
    callback()
  }
}

// 输入规则
const rules = reactive({
  userId: [{ validator: validateuserId, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
})

const router = useRouter()
//登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const loginParams = {
    userId: ruleForm.userId,
    password: ruleForm.password,
  }
  formEl.validate(async (valid) => {
    let result: any = await UserService(loginParams)
    console.log(result)
    if (result.data !== null) {
      // console.log(result.data);
      //本地存储token
      storage.set('token', result.data.token)
      ElMessage.success(result.message)
      router.push('/home')
    } else {
      // debugger
      ElMessage.error(result.message + ',请重新登录！')
      ruleForm.userId = ''
      ruleForm.password = ''
    }
  })
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('../assets/img/img.jpg');
  .box {
    width: 500px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 20%;
    top: 30%;
    h2 {
      text-align: center;
      margin: 30px auto;
      color: rgb(36, 35, 35);
    }
    .form {
      width: 80%;
      height: 80%;
      margin: 15px auto;
      /deep/.el-form-item__label {
        font-weight: bold;
        color: rgb(37, 37, 37);
      }
      /deep/.demo-ruleForm {
        font-weight: bold;
      }
    }
  }
}
</style>
