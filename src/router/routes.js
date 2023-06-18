//import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default
    [
        {
            path: '/center',
            component: Center,
            //显示footer
            meta: { show: true },
            children:[
                {
                    path:'myorder',
                    component:MyOrder
                },
                {
                    path:'grouporder',
                    component:GroupOrder
                }, 
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
            
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            //显示footer
            meta: { show: true }
        },
        {
            path: '/pay',
            component: Pay,
            //显示footer
            meta: { show: true },
            beforeEnter: (to, from,next) => {
                if(from.path == '/trade') {
                    next()
                }else {
                    //中断导航 从哪来回哪去
                    next(false)
                }
            },
        },
        {
            path: '/trade',
            component: Trade,
            //显示footer
            meta: { show: true },
            //路由独享守卫
            beforeEnter: (to, from,next) => {
                if(from.path == '/shopcart') {
                    next()
                }else {
                    //中断导航 从哪来回哪去
                    next(false)
                }
            },
        }, 
        {
            path: '/shopcart',
            component: ShopCart,
            //显示footer
            meta: { show: true }
        },
        {
            path: '/addcartsuccess',
            component: AddCartSuccess,
            //显示footer
            meta: { show: true }
        },
        {
            path: '/home',
            component:() => import('@/pages/Home'),
            meta: { show: true }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },
            // props:($route) => {
            //     return {
            //         keyword:$route.params.keyword
            //     }
            // }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            path: '/detail/:skuid',
            component: Detail,
            meta: { isShow: true }
        }
        ,
        {
            path: '*',
            redirect: '/home'
        },

    ]
