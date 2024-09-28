import {createRouter, createWebHashHistory} from 'vue-router'
import App from '@/App.vue';
import SignIn from '@/views/SignIn.vue';

const routes = [
    {
        path: '/',
        component: App,
        meta: { requiresAuth: true } // 인증이 필요한 경우 설정
    },
    {
        path: '/signin',
        name: 'SignIn', // name 추가
        component: SignIn,
    }
]

const router = createRouter({
    history: createWebHashHistory(),  // hash 모드 사용
    routes
})

router.beforeEach((to, from, next) => {
    console.log('from', from);
    const isAuthenticated = localStorage.getItem('TMDb-Key') !== null

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'SignIn' }) // 라우트 네임으로 이동
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router

