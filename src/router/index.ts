import {createRouter, createWebHashHistory} from 'vue-router'
import SignIn from '@/views/SignIn.vue';
import Home from "../views/home.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        meta: { requiresAuth: true } // 인증이 필요한 경우 설정
    },
    {
        path: '/signin',
        name: 'SignIn', // name 추가
        component: SignIn,
    },
]

const router = createRouter({
    history: createWebHashHistory(),  // hash 모드 사용
    routes
})

router.beforeEach((to, _from, next): void => {
    const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // If the route requires authentication and the user is not authenticated
        if (!isAuthenticated) {
            next({ name: 'SignIn' }); // Redirect to the SignIn page
        } else {
            next(); // Proceed to the requested route
        }
    } else {
        // If the user is already authenticated and tries to access the SignIn page
        if (to.name === 'SignIn' && isAuthenticated) {
            next({ name: 'Home' }); // Redirect to the home page
        }
        else {
            next(); // Proceed to the requested route
        }
    }
});


export default router

