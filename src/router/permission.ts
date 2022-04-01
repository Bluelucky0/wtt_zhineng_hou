import router from './index';
//引入token存储
import { storage } from '../until/token'
const token = storage.get('token')
console.log(token);
const whiteList = ['/']

router.beforeEach((to,from,next)=>{
  if(token){
    if(to.path === '/home'){
      next('/home')
    }else{
      next()
    }
  }else{
    if(to.path === '/home'){
      next('/')
    }
    if(whiteList.includes(to.path)){
      next()
    }else{
      next('/login')
    }   
  }
})