<template>
  <el-table :data=" datas.tabledata"
            style="width: 100%"
            border
            header-row-style="height:40px"
            row-style="height:40px">
    <el-table-column prop="uuid"
                     label="Id"
                     width="150" />
    <el-table-column prop="name"
                     label="Name"
                     width="150" />
    <el-table-column prop="introduction"
                     label="Introduction" />
    <el-table-column prop="label"
                     label="Label"
                     width="100" />
    <el-table-column prop="hot"
                     label="Hot"
                     width="80" />
    <el-table-column label="Operations"
                     width="210">
      <template #default="scope">
        <el-button size="small"
                   type="primary"
                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small"
                   type="danger"
                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button size="small"
                   type="success"
                   @click="addVisible = true">新增</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 编辑弹窗 -->
  <el-dialog v-model="dialogFormVisible"
             title="景点信息">
    <el-form :model="form">
      <el-form-item label="uuid:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.uuid"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="name:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.name"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="introduction:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.introduction"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="label:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.label"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="hot:"
                    :label-width="formLabelWidth">
        <el-input v-model="form.hot"
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
  <!-- 新增弹窗 -->
  <el-dialog v-model="addVisible"
             title="新增景点信息">
    <el-form :model="addform">
      <el-form-item label="uuid:"
                    :label-width="addWidth">
        <el-input v-model="addform.uuid"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="name:"
                    :label-width="addWidth">
        <el-input v-model="addform.name"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="introduction:"
                    :label-width="addWidth">
        <el-input v-model="addform.introduction"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="label:"
                    :label-width="addWidth">
        <el-input v-model="addform.label"
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label="hot:"
                    :label-width="addWidth">
        <el-input v-model="addform.hot"
                  autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="handleAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script  setup>
import { onMounted, reactive, ref } from '@vue/runtime-core';
import { getTravelData, deleteTravel, editTravel, addTravel } from '../api/http'
import { ElMessage, ElMessageBox } from 'element-plus'
let datas = reactive({
  tabledata: []
})

const travelData = async () => {
  let result = await getTravelData()
  if (result.data) {
    datas.tabledata = result.data
  }
}
// 编辑信息
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  uuid: '',
  name: '',
  introduction: '',
  label: '',
  hot: 0,
  tag: '',
  detail: '',
  discuss: '',
  good: '',
  sale: '',
  price: ''
})
const handleEdit = (index, row) => {
  dialogFormVisible.value = true
  // Proxy对象转为普通对象
  let obj = JSON.parse(JSON.stringify(row))
  form.uuid = obj.uuid
  form.name = obj.name
  form.introduction = obj.introduction
  form.label = obj.label
  form.hot = obj.hot
}
const toSure = async () => {
  dialogFormVisible.value = false
  let result = await editTravel(form)
  if (result.data) {
    travelData()
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
    '您确认删除这条记录么?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await deleteTravel(obj.uuid)
      console.log(result);
      if (result.data) {
        travelData()
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
// 新增
const addVisible = ref(false)
const addWidth = '140px'
const addform = reactive({
  uuid: '',
  name: '',
  introduction: '',
  label: '',
  hot: 0,
  tag: '',
  detail: '',
  discuss: '',
  good: '',
  sale: '',
  price: ''
})
const handleAdd = async () => {
  addVisible.value = true
  addform.hot = Number(addform.hot)
  let result = await addTravel(addform)
  console.log(result);
  if (result.data) {
    addVisible.value = false
    travelData()
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
  }
}
onMounted(() => {
  travelData()
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