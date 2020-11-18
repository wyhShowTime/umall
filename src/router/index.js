import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
function checkedEnter(path,next){
  if(store.state.userInfo.menus_url.includes(path)){
    next()
  }else{
    next("/")
  }
}

Vue.use(Router)
export let routes = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单管理",
    beforeEnter(to,from,next){
      checkedEnter("/menu",next)
    }
  },
  {
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色管理",
    beforeEnter(to,from,next){
      checkedEnter("/role",next)
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理",
    beforeEnter(to,from,next){
      checkedEnter("/manage",next)
    }
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类",
    beforeEnter(to,from,next){
      checkedEnter("/cate",next)
    }
  },
  {
    path: "spec",
    component: () => import("../pages/spec/spec"),
    name: "商品规格",
    beforeEnter(to,from,next){
      checkedEnter("/spec",next)
    }
  }, {
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理",
    beforeEnter(to,from,next){
      checkedEnter("/goods",next)
    }
  },
  {
    path: "member",
    component: () => import("../pages/member/member"),
    name: "会员管理",
    beforeEnter(to,from,next){
      checkedEnter("/member",next)
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图管理",
    beforeEnter(to,from,next){
      checkedEnter("/banner",next)
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill"),
    name: "秒杀活动",
    beforeEnter(to,from,next){
      checkedEnter("/seckill",next)
    }
  },
]
let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login/login')
    },
    {
      path: '/',
      component: () => import('@/pages/index/index'),
      children: [
        {
          path: "",
          component: () => import("../pages/home/home")
        },
        ...routes
      ]
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 如果去的是登录 放行
  if (to.path == '/login') {
    next();
    return
  }
  //前往的不是登录，查看是否登录
  if (store.state.userInfo.token) {
    next()
    return;
  }
  next("/login")
})
export default router
