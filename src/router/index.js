import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'
import Usuarios from '../views/Usuarios.vue'
import Registro from '../views/Registro.vue'
import Relatorio from '../views/Relatorio.vue'
Vue.use(VueRouter)

var router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                admin: true,
                super: true,
                usuario: true,
            },

        },
        {
            path: '/usuarios',
            name: 'Usuarios',
            component: Usuarios,
            meta: {
                admin: true,
                super: true,
                usuario: true,
            },

        },
        {
            path: '/relatorio',
            name: 'Relatorio',
            component: Relatorio,
            meta: {
                admin: true,
                super: true,
                usuario: true,
            },

        },
        {
            path: '/registro',
            name: 'Registro',
            component: Registro,
            meta: {
                libre: true,
            },

        },
        {
            path: '/login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
            meta: {
                libre: true,
            },

        }
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.libre)) {
        next()
    } else if (store.state.usuario) {
        if (to.matched.some((record) => record.meta.admin)) {
            next()
        }
    } else if (store.state.usuario) {
        if (to.matched.some((record) => record.meta.super)) {
            next()
        }
    } else if (store.state.usuario) {
        if (to.matched.some((record) => record.meta.usuario)) {
            next()
        }
    } else {
        next({ name: "Login" })
    }
})

export default router
