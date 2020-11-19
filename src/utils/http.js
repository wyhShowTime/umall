import axios from "axios"
import qs from "qs"
import { errorAlert } from './alert'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
//开发环境使用 8080
let baseUrl = "/aa"
Vue.prototype.$imgPre = "http://localhost:3000"
//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$imgPre=""
//请求拦截
axios.interceptors.request.use(req => {
    if (req.url != baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req
})
//响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求地址是：" + res.config.url);
    console.log(res);
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    if (res.data.msg === "登录已过期或访问权限受限") {//掉线了
        //清除登录信息
        store.dispatch("changeUser", {})
        //跳转到登录页
        router.push("/login")
    }
    return res
})

// ===========菜单接口 开始====================

//13.添加
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}

//18.列表交互
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}

// 29.删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 35.获取一条数据
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//38.修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}

// ===========菜单接口 结束====================

// ===========角色管理接口 开始====================

//获取角色列表
export const reqRolelist = () => {
    return axios.get(`${baseUrl}/api/rolelist`)
}

//添加
export const reqRoleAdd = (obj) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(obj)
    })
}
//删除
export const reqRoledelete = id => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: qs.stringify({ id: id })
    })
}
//获取一条信息
export const reqRoleinfo = id => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        params: {
            id: id
        }
    })
}
//修改信息
export const reqRoleedit = (obj) => {
    console.log(obj)
    return axios({
        method: 'post',
        url: baseUrl + '/api/roleedit',
        data: qs.stringify(obj)
    })
}

// ===========角色管理接口 结束====================

// ===========管理员接口 开始====================

// 8.添加
export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqUserList = (p) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqUserDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

// 33.详情
export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

// 38.修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}
// 52 总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}
// ===========管理员接口 结束====================



// =========== 登录====================

export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

//=========== 会员 ====================

export const reqMemberlist = () => {
    return axios({
        url: baseUrl + '/api/memberlist'
    })
}

//编辑
export const reqMemberinfo = (uid) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        params: {
            uid
        }
    })
}
//确认修改
export const reqMemberedit = (obj) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(obj)
    })
}

//=========== 商品规格管理 ====================

//商品分类列表 
export const reqCatelist = (obj) => {
    return axios({
        url: baseUrl + '/api/catelist',
        params: obj
    })
}

//商品分类添加
export const reqcateAdd = (cate) => {
    // cate={name:12,img:File,age:20}

    let d = new FormData()
    /*
    d.append("name",12)
    d.append("img",file)
    d.append("age",20)
    */

    for (let i in cate) {
        d.append(i, cate[i])
    }

    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: d
    })
}
//商品分类删除
export const reqCatedelete = (id) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: qs.stringify({ id })
    })
}
//获取一条数据
export const reqCateinfo = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        params: {
            id
        }
    })
}
// 38.修改 文件
export const reqcateUpdate = (cate) => {
    let d = new FormData()
    for (let i in cate) {
        d.append(i, cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: d
    })
}
// ===========规格接口 开始====================

// 8.添加 文件
export const reqspecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqspecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqspecsUpdate = (user) => {

    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
export const reqspecsCount = () => {

    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// ===========规格接口 结束====================
// ===========商品管理接口 开始====================

// 8.添加 文件
export const reqgoodsAdd = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: d
    })
}

//18.列表 p={page:1,size:10}
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqgoodsUpdate = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}
export const reqgoodsCount = () => {

    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}

// ===========商品管理接口 结束====================
// ============轮播图管理接口 开始====================

//添加
export const reqbannerAdd = (list) => {
    let d = new FormData()
    for (let i in list) {
        d.append(i, list[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: d
    })
}
//列表
export const reqbannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}
//删除
export const reqbannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
//详情页
export const reqbannerDetail = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//更新
export const reqbannerUpdate = (list) => {
    let d = new FormData()
    for (let i in list) {
        d.append(i, list[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: d
    })
}
// ============轮播图管理接口 结束====================

// ============限时秒杀 开始====================
export const reqSeckadd = (user) => {
    return axios({
        url: baseUrl + '/api/seckadd',
        method: 'post',
        data: qs.stringify(user)
    })
}
//列表
export const reqSecklist = () => {
    return axios.get(baseUrl + '/api/secklist')
}
//删除
export const reqSeckdelete = (id) => {
    return axios({
        url: baseUrl + '/api/seckdelete',
        method: 'post',
        data: qs.stringify({ id })
    })
}
//一条
export const reqSeckinfo = (id) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        params: {
            id
        }
    })
}
//修改
export const reqSeckedit = (obj) => {
    return axios({
        url: baseUrl + '/api/seckedit',
        method: 'post',
        data: qs.stringify(obj)
    })
}


