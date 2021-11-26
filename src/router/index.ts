import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Query from "@/views/Query.vue";
import Home from "@/views/Home.vue";
import Detail from "@/views/Detail.vue";
import Liked from "@/views/Liked.vue";
import {store} from "@/store";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/home/login'
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/home/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/search',
    name: 'Search',
    component: Query
  },
  {
    path: '/detail/:songId',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/liked',
    name: 'Liked',
    component: Liked
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: "/logout",
    name: "logout",
    component: {
      beforeRouteEnter(to, from, next) {
        store.dispatch('account/logout').then(() => {
          next('/');
        })
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
