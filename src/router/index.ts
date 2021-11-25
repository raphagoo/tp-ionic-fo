import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Query from "@/views/Query.vue";
import Home from "@/views/Home.vue";
import Detail from "@/views/Detail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
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
    path: "/logout",
    name: "logout",
    component: {
      beforeRouteEnter(to, from, next) {
        console.log({from});
        if (!from) {
          console.log("no from");
        }
        sessionStorage.removeItem('user');
        next('/');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
