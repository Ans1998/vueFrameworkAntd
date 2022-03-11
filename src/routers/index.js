import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './config'
import Layout from "@/views/layout/index"

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(VueRouter)

let getApiRouter = [
    {
        path: '/',
        component: "layout",
        children: [
            {
                path: '/test1', // 测试1
                meta: { auth: false, keepAlive: false },
                component: "test1"
            },
            {
                path: '/test2', // 测试2
                meta: { auth: false, keepAlive: false },
                component: "test2"
            },
            {
                path: '/test3', // 测试3
                meta: { auth: false, keepAlive: false },
                component: "test3"
            },
            {
                path: '/test4', // 测试4
                meta: { auth: false, keepAlive: false },
                component: "test4"
            },
            {
                path: '/user', // 用户列表
                meta: { auth: false, keepAlive: false },
                component: "user"
            },
        ]
    },
    {
        path: '*',
        redirect: "/404"
    }
]

let sumRouter = null

// 路由配置
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    if (!sumRouter) {
        // 处理路由
        let dynamicMenu = filterAsyncRouter(getApiRouter)
        // 动态添加路由
        sumRouter = routes.concat(dynamicMenu)
        router.addRoutes(sumRouter)
        next({ ...to, replace: true })
    }
    next()
})

function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter((route) => {
        if (route.component) {
            if (route.component === 'layout') {
                route.component = Layout
            } else {
                route.component = _import(route.component)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
    return accessedRouters
}


export default router