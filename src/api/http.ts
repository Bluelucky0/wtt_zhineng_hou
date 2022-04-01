import request from '../until/request'

//封装接口方法
export const UserService = (params: any) => {
  return request({
    url: '/travel/login',
    // url:"http://192.168.0.6:3003/travel/login",
    method: 'post',
    data: params,
  })
}

//请求所有景区信息 http://localhost:3003/travel/getTravel
export const getTravelData = () => {
  return request({
    url: '/travel/getTravel',
    method: 'get',
  })
}

//请求所有用户信息 http://localhost:3003/travel/getAllUsers
export const getUsersData = () => {
  return request({
    url: '/travel/getAllUsers',
    method: 'get',
  })
}

//编辑景点 http://localhost:3003/travel/editTravel
export const editTravel = (params: any) => {
  return request({
    url: '/travel/editTravel',
    method: 'put',
    data: params,
  })
}

//删除景点 http://localhost:3003/travel/deleteTravel/sanya
export const deleteTravel = (params: any) => {
  return request({
    url: `/travel/deleteTravel/${params}`,
    method: 'delete',
  })
}

//新增景点 http://localhost:3003/travel/addTravel
export const addTravel = (params: any) => {
  return request({
    url: '/travel/addTravel',
    method: 'post',
    data: params,
  })
}

//获取所有用户 http://localhost:3003/travel/getAllUsers
export const getAllUser = () => {
  return request({
    url: '/travel/getAllUsers',
    method: 'get'
  })
}

//编辑用户 http://localhost:3003/travel/editUser
export const editUser = (params: any) => {
  return request({
    url: '/travel/editUser',
    method: 'put',
    data: params,
  })
}

//删除用户 http://localhost:3003/travel/deleteUser/aaa
export const deleteUser = (params: any) => {
  return request({
    url: `/travel/deleteUser/${params}`,
    method: 'delete'
  })
}
