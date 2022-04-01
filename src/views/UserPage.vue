<template>
  <el-table :data=" datas.userdata"
            style="width: 100%"
            border
            header-row-style="height:40px"
            row-style="height:40px">
    <el-table-column prop="userId"
                     label="userId"
                     width="180" />
    <el-table-column prop="password"
                     label="password"
                     width="180" />
    <el-table-column prop="label"
                     label="Label"
                     width="200" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small"
                   type="primary"
                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small"
                   type="danger"
                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 编辑弹窗 -->
  <el-dialog v-model="dialogFormVisible"
             title="用户信息">
    <el-form :model="form">
      <el-form-item label="userId:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.userId"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="password:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.password"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="label:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.label"
                  autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="toSure">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script  setup>
import { onMounted, reactive, ref } from '@vue/runtime-core';
import { getAllUser, editUser, deleteUser } from '../api/http'
import { ElMessage, ElMessageBox } from 'element-plus'
let datas = reactive({
  userdata: []
})

const userData = async () => {
  let result = await getAllUser()
  if (result.data) {
    datas.userdata = result.data
  }
}
// 编辑信息
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  userId: "",
  userName: "",
  password: "",
  label: ""
})
const handleEdit = (index, row) => {
  dialogFormVisible.value = true
  // Proxy对象转为普通对象
  let obj = JSON.parse(JSON.stringify(row))
  form.userId = obj.userId
  form.userName = obj.userName
  form.password = obj.password
  form.label = obj.label
}
const toSure = async () => {
  dialogFormVisible.value = false
  console.log(form);
  let result = await editUser(form)
  if (result.data) {
    userData()
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
  }
}
// 删除
const handleDelete = (index, row) => {
  let obj = JSON.parse(JSON.stringify(row))
  ElMessageBox.confirm(
    '您确认删除这个用户么?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await deleteUser(obj.userId)
      console.log(result);
      if (result.data) {
        userData()
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

onMounted(() => {
  userData()
})

</script>
<style scoped>
.el-dialog__header {
  height: 100px !important;
}
.el-button--text {
  margin-right: 15px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>