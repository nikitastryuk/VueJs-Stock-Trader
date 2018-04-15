import Home from './components/Home.vue'
import Portfolio from './components/portfolio/Portfolio.vue'
import StocksGrid from './components/stocks/StocksGrid.vue'
import LogIn from './components/auth/LogIn.vue'
import SignUp from './components/auth/SignUp.vue'
import store from './store/store'
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter);

function beforeEnter(to, from, next) {
    if (store.state.authModule.idToken) {
        next();
    } else {
        next('/login')
    }
}

const routes = [{
        path: '/',
        component: Home,
        beforeEnter
    },
    {
        path: '/portfolio',
        component: Portfolio,
        beforeEnter
    },
    {
        path: '/stocks',
        component: StocksGrid,
        beforeEnter
    },
    {
        path: '/login',
        component: LogIn
    },
    {
        path: '/signup',
        component: SignUp
    },
]

export default new VueRouter({
    mode: 'history',
    routes
  })