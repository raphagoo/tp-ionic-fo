declare module '*.vue' {

  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

import VueRouter, { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
  }
}
