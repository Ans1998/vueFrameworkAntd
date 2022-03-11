import Layout from "@/views/layout/index"

/**
 * auth true登录才能访问，false不需要登录
 * keepAlive true缓存，false不缓存
 */

// 默认路由
export default [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/', // 首页
                meta: { auth: false, keepAlive: false },
                component: resolve => require(['@/views/home/'], resolve)
            },
            {
                path: '/test', // 测试
                meta: { auth: false, keepAlive: false },
                component: resolve => require(['@/views/test/'], resolve)
            }
        ]
    },
    {
        path: '/login',
        component: resolve => require(['@/views/login/'], resolve),
        meta: { auth: false, keepAlive: false },
    },
    {
        path: "/404",
        component: resolve => require(['@/views/notFound/'], resolve),
    }
]